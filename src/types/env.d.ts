declare global {
  interface Window {
    html2pdf: any;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_MAIN_TENANT: string;
    NEXT_PUBLIC_STATIC_ASSETS_PREFIX: string;
    /** attachment cdn前缀  */
    NEXT_PUBLIC_ATTACHMENT_CDN_PREFIX: string;
    /** attachment inner前缀 */
    NEXT_PUBLIC_ATTACHMENT_INNER_PREFIX: string;
    NEXT_PUBLIC_RUNTIME_ENV: string;
    NEXT_PUBLIC_AUTH_URL: string;
    NEXT_PUBLIC_FILE_PREVIEW_URL: string;
  }
}
