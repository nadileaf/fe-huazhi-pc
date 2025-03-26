'use client';
import ResumeForm from './components/ResumeForm';
import ResumeUpload from './components/ResumeUpload';
import { useAuthStore } from '@/stores/auth';

export default function ResumeEditPage() {
  const { resume } = useAuthStore();

  if (!resume) {
    return <ResumeUpload />;
  }

  return (
    <section className="min-h-screen bg-background-2">
      <ResumeForm />
    </section>
  );
}
