import { loadAsyncScript } from './common';

const html2pdfUrl = 'https://cdn.staticfile.org/html2pdf.js/0.10.1/html2pdf.bundle.min.js';

export default class HtmlToPDF {
  static async save(
    el: Element | null,
    options?: {
      margin?: number | number[];
      filename?: string;
      html2canvas?: Record<string, any>;
    },
  ): Promise<() => void> {
    // @ts-expect-error fix window type
    if (!window.html2pdf) {
      await loadAsyncScript(html2pdfUrl);
    }
    const instance = window
      // @ts-expect-error fix window type
      .html2pdf()
      .set({
        ...options,
        pagebreak: { mode: 'avoid-all' },
        html2canvas: {
          useCORS: true,
          allowTaint: false,
          scale: 2,
          scrollX: 0,
          scrollY: 0,
          ...options?.html2canvas,
        },
      })
      .from(el);
    return instance.save();
  }
}
