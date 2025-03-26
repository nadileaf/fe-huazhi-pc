'use client';

import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { entityService } from '@/services/entity';
import { useAuthStore } from '@/stores/auth';

export default function ResumeUpload() {
  const [loading, setLoading] = useState(false);
  const { user, setResume } = useAuthStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!user?.userId) return;

      const file = acceptedFiles[0];
      if (!file) return;

      // 验证文件类型
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!validTypes.includes(file.type)) {
        toast.error('请上传 PDF 或 Word 格式的文件');
        return;
      }

      // 验证文件大小 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('文件大小不能超过 10MB');
        return;
      }

      setLoading(true);

      try {
        await entityService.upload({
          entityId: user.userId,
          entityType: 'Resume',
          file,
        });

        toast.success('简历上传成功');
        // 刷新简历数据
        await setResume();
      } catch (error) {
        console.error('上传失败:', error);
        toast.error('简历上传失败');
      } finally {
        setLoading(false);
      }
    },
    [user?.userId, setResume],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <section className="pt-[12vh]">
      <div className="wrapper py-10 px-14 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl text-[#333]">请上传简历</h2>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div
            {...getRootProps()}
            className={`
          w-full max-w-3xl p-8 rounded-xl border-2 border-dashed 
          transition-colors duration-200 cursor-pointer
          flex flex-col items-center justify-center gap-4
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
          >
            <input {...getInputProps()} />

            <Icon
              icon={loading ? 'eos-icons:loading' : 'solar:upload-minimalistic-line-duotone'}
              className={`text-6xl text-gray-400 ${loading ? 'animate-spin' : ''}`}
            />

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-700">
                {isDragActive ? '释放以上传文件' : '拖拽文件到此处或点击上传'}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                支持 PDF、DOC、DOCX 格式，文件大小不超过 10MB
              </p>
            </div>

            <Button
              className="mt-4"
              color="primary"
              variant="ghost"
              radius="full"
              isLoading={loading}
              startContent={!loading && <Icon icon="solar:upload-linear" />}
            >
              选择文件
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
