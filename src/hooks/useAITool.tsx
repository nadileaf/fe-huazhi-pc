import { useMessageBoxContext } from '@/providers/MessageBoxProvider';

export default function useAITool() {
  const { openModal } = useMessageBoxContext();

  function open(link?: string) {
    if (!link) return;
    openModal({
      body: <iframe src={link} className="w-full h-[80vh]" />,
      size: '5xl',
    });
  }

  return { open };
}
