'use client';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import dynamic from 'next/dynamic';
import HtmlToPDF from '@/utils/html-to-pdf';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';

const Resume = dynamic(() => import('@/components/system-employee/Resume'), {
  suspense: true,
});

export default function DownloadResumePage() {
  const { systemEmployee } = useAuthStore();
  const [loading, setLoading] = useState(false);

  async function handleDownloadPdf() {
    const element = document.querySelector('#resume');
    if (!element) {
      console.error('Resume element not found');
      return;
    }
    try {
      setLoading(true);
      await HtmlToPDF.save(element, {
        filename: `${systemEmployee?.data.standardFields.humanInfo?.name || '匿名'}-简历`,
        margin: [12, 0, 12, 0],
        html2canvas: {
          backgroundColor: '#FAFAFD',
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!systemEmployee) return null;

  return (
    <section>
      <div className="wrapper py-20">
        <div className="flex justify-between items-center mb-14">
          <h2 className="title text-4xl">下载简历</h2>
          <Button
            className="primary-gradient-button w-[140px]"
            startContent={<Icon className="text-lg" icon="solar:download-linear" />}
            radius="full"
            isLoading={loading}
            onClick={handleDownloadPdf}
          >
            PDF
          </Button>
        </div>

        <Resume data={systemEmployee} />
      </div>
    </section>
  );
}
