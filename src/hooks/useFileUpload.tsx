import { toast } from 'react-toastify';
import { useState } from 'react';
import fileService from '@/services/file';

type UseFileUploadProps = {
  files: Common.NormalizedField.File[];
  onFilesChange?: (files: Common.NormalizedField.File[]) => void;
  accept?: string;
};

export default function useFileUpload({ files, onFilesChange, accept }: UseFileUploadProps) {
  const [loading, setLoading] = useState(false);

  function handleUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept || '*';

    input.onchange = async (e: any) => {
      const _files = e.target.files;
      if (!_files?.length) return;

      setLoading(true);
      try {
        const file = _files[0];
        const uploadedFile = await fileService.putObject(file, 'attachments');
        onFilesChange?.([...files, uploadedFile]);
        toast.success('上传成功');
      } catch (error) {
        console.error('上传失败:', error);
        toast.error('上传失败');
      } finally {
        setLoading(false);
      }
    };

    input.click();
  }

  async function handleDelete(file: Common.NormalizedField.File, index: number) {
    try {
      await fileService.deleteObject(file.key);
      const newFiles = [...files];
      newFiles.splice(index, 1);
      onFilesChange?.(newFiles);
      toast.success('删除成功');
    } catch (error: any) {
      if (error.statusCode !== 308) {
        console.error('删除失败:', error);
        toast.error('删除失败');
      }
    }
  }

  return { loading, handleUpload, handleDelete };
}
