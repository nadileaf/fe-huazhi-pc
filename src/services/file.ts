import request from '@/utils/request';
import { getFileBinary, getFileExtension } from '@/utils/file';
import md5 from 'js-md5';
import {
  ATTACHMENT_INNER_URL_PREFIX,
  UPLOAD_FILE_LIMIT_SIZE,
  UPLOAD_FILE_LIMIT_SIZE_MSG,
} from '@/env';
import { toast } from 'react-toastify';
import { isValidFileType } from '@/utils/validate';
import dayjs from 'dayjs';
import { useAuthStore } from '@/stores/auth';

function fileService() {
  // 内部验证方法
  const validate = async (file: File) => {
    if (!isValidFileType(file.name)) {
      toast.error('不支持的文件类型');
      return Promise.reject('不支持的文件类型');
    } else if (file.size >= UPLOAD_FILE_LIMIT_SIZE) {
      toast.error(UPLOAD_FILE_LIMIT_SIZE_MSG);
      return Promise.reject(UPLOAD_FILE_LIMIT_SIZE_MSG);
    }
  };

  // 上传文件方法
  const putObject = async (data: File, dir?: string) => {
    await validate(data);
    const { tenant, token, selfTenantMemberId } = useAuthStore.getState();
    const fileBinary = await getFileBinary(data);
    const fileSuffix = data.name.split('.').pop();
    const dirPath = `/private/${tenant ?? 'unknown'}/${dir ?? 'default'}${
      dir?.endsWith('/') ? '' : '/'
    }`;
    const fileKey = md5(fileBinary) + '.' + fileSuffix;
    console.log('fileKey', dirPath, fileKey, data);

    const { ok, statusText } = await fetch(ATTACHMENT_INNER_URL_PREFIX + dirPath + fileKey, {
      method: 'PUT',
      body: fileBinary,
      headers: {
        'Content-Type': data.type,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!ok) return Promise.reject(statusText);
    return {
      key: dirPath + fileKey,
      fileName: data.name,
      isLink: false,
      mimeType: data.type,
      size: data.size,
      extension: getFileExtension(data.name),
      createdAt: dayjs().format(),

      createdBy: { openId: selfTenantMemberId, entityType: 'TenantMember' },
    } as Common.NormalizedField.File;
  };

  // 删除文件方法
  const deleteObject = async (path: string) => {
    try {
      const api = `/transmitter-attachment/v1/file/`;
      const fileKey = path.split(api).pop();
      await request.delete(api + fileKey, undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    validate,
    putObject,
    deleteObject,
  };
}

export default fileService();
