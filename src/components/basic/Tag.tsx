export default function Tag({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[#F8F8F8] text-white rounded px-2 py-1 text-xs ${className}`}
    >
      {text}
    </div>
  );
}
