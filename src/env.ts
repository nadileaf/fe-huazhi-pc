// /** 是否为测试的生产环境 */
// export const IS_TEST_ENV = __IS_PROD__ && __RUNTIME_ENV__ !== 'production';
// /** 是否为正式的生产环境 */
// export const IS_PROD_ENV = __IS_PROD__ && __RUNTIME_ENV__ === 'production';

// /** 是否为标准产品线上环境 */
// export const IS_STANDARD_ENV =
//   __IS_PROD__ && import.meta.env.VITE_STANDARD_PRODUCT_HOSTS.includes(window.location.host);

// /** 是否是私有化部署环境 */
// export const IS_CUSTOMIZATION_ENV =
//   import.meta.env.VITE_IS_CUSTOMIZATION_ENV ||
//   (__IS_PROD__ && !import.meta.env.VITE_STANDARD_PRODUCT_HOSTS.includes(window.location.host));

// /** 内部attachment url prefix */
export const ATTACHMENT_INNER_URL_PREFIX = `/api/transmitter-attachment/v1/file`;
// export const ATTACHMENT_INNER_URL = location.origin + ATTACHMENT_INNER_URL_PREFIX;

// export const ATTACHMENT_CDN_URL = !IS_CUSTOMIZATION_ENV
//   ? IS_PROD_ENV
//     ? 'https://cdn-attachment.mesoor.com'
//     : 'https://cdn-attachment.nadileaf.com'
//   : undefined;

// export const FE_ASSETS_CDN_URL = 'https://cdn-fe.mesoor.com';

// /** 文件预览地址 */
// export const PREVIEW_FILE_URL =
//   (__IS_DEV__ ? import.meta.env.VITE_DEV_API_URL : location.origin) + '/preview/onlinePreview';

/** 上传文件200M限制 */
export const UPLOAD_FILE_LIMIT_SIZE = 200 * 1024 * 1024;
export const UPLOAD_FILE_LIMIT_SIZE_MSG = '文件大小不能超过200MB';
