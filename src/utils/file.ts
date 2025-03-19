import { toast } from 'react-toastify';

/** 上传文件50M限制 */
export const UPLOAD_FILE_LIMIT_SIZE = 50 * 1024 * 1024;
export const UPLOAD_FILE_LIMIT_SIZE_MSG = '文件大小不能超过50MB';

export const COSImageStyleHandler = {
  s1x1: 'imageMogr2/thumbnail/!200x200r/interlace/0/lquality/80/crop/200x200/gravity/center',
  s4x3: 'imageMogr2/thumbnail/!200x150r/interlace/0/lquality/80/crop/200x150/gravity/center',
  m1x1: 'imageMogr2/thumbnail/!400x400r/interlace/0/lquality/80/crop/400x400/gravity/center',
  m4x3: 'imageMogr2/thumbnail/!400x300r/interlace/0/lquality/80/crop/400x300/gravity/center',
  m5x4: 'imageMogr2/thumbnail/!500x400r/interlace/0/lquality/80/crop/500x400/gravity/center',
  m16x9: 'imageMogr2/thumbnail/!400x225r/interlace/0/lquality/80/crop/400x225/gravity/center',
  l1x1: 'imageMogr2/thumbnail/!800x800r/interlace/0/lquality/80/crop/800x800/gravity/center',
  l4x3: 'imageMogr2/thumbnail/!800x600r/interlace/0/lquality/80/crop/800x600/gravity/center',
  l16x9: 'imageMogr2/thumbnail/!800x450r/interlace/0/lquality/80/crop/800x450/gravity/center',
  origin: 'imageMogr2/thumbnail/2000x2000>',
};

export const fileTypeRegExp: Record<Common.FileType, RegExp> = {
  image: /\.(gif|png|jpg|jpeg|webp|svg|bmp|tif)$/i,
  video: /\.(avi|flv|mov|wav|mkv|rmvb|mp4)$/i,
  audio: /\.(mp3|m4a|wav|wma|flac|ape)$/i,
  word: /\.(doc|docx)$/i,
  excel: /\.(xls|xlsx|csv)$/i,
  powerpoint: /\.(ppt|pptx)$/i,
  pdf: /\.(pdf)$/i,
  zip: /\.(zip|rar|7z)$/i,
  text: /\.(txt|md)$/i,
};

export const fileTypes = {
  image: ['gif', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'bmp', 'tif'],
  video: ['avi', 'flv', 'mov', 'wav', 'mkv', 'rmvb', 'mp4', 'webm', 'm3u8'],
  audio: ['mp3', 'm4a', 'wav', 'wma', 'flac', 'ape'],
  doc: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt', 'md', 'htm'],
};

/**
 * 加上 cdn 前缀 "https://cdn-fe.mesoor.com"
 */
export function withCdnPrefix(path: string) {
  return process.env.NEXT_PUBLIC_STATIC_ASSETS_PREFIX + path;
}

export type FileType = keyof typeof fileTypes;

/** @description 获取文件后缀名,不包含. */
export function getFileExtension(fileName = '') {
  return fileName.split('.').pop()?.toLowerCase();
}

/** @description 获取文件类型的所有文件后缀名,支持多个 */
export function getFileExtNamesByTypes(types: FileType[]) {
  const res: string[] = [];
  for (const type of types) {
    const extNames = fileTypes[type];
    res.push(...extNames);
  }
  return res;
}

export function getFileType(fileName: string) {
  const extName = getFileExtension(fileName);
  if (!extName) return;
  for (const key in fileTypes) {
    if (fileTypes[key as FileType].includes(extName)) {
      return key as FileType;
    }
  }
}

export function getFileIcon(fileName: string) {
  const ext = getFileExtension(fileName);
  switch (ext) {
    case 'doc':
    case 'docx':
      return withCdnPrefix('/tip-assets/img/icons/doc.png');
    case 'pdf':
      return withCdnPrefix('/custom/ciickd/icon/pdf.svg');
    // return withCdnPrefix('/tip-assets/img/icons/pdf.png');
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return withCdnPrefix('/tip-assets/img/icons/image.png');
    case 'html':
    case 'htm':
      return withCdnPrefix('/tip-assets/img/icons/html.png');
    case 'mp3':
    case 'm4a':
    case 'wav':
    case 'wma':
    case 'flac':
    case 'ape':
      return withCdnPrefix('/tip-assets/img/icons/audio.png');
    case 'mp4':
    case 'avi':
    case 'flv':
    case 'mov':
    case 'mkv':
    case 'rmvb':
      return withCdnPrefix('/tip-assets/img/icons/video.png');
    case 'xls':
    case 'xlsx':
    case 'csv':
      return withCdnPrefix('/tip-assets/img/icons/excel.png');
    case 'ppt':
    case 'pptx':
      return withCdnPrefix('/tip-assets/img/icons/ppt.png');
    case 'txt':
    case 'md':
      return withCdnPrefix('/tip-assets/img/icons/txt.png');
    default:
      return withCdnPrefix('/tip-assets/img/icons/other.png');
  }
}

/** @description 校验文件名 */
export function isValidFilename(filename: string): boolean {
  const regex = /^[.&'a-zA-Z0-9_-]+\.[a-zA-Z0-9]+(?:-\d+(?:\.\d*)?%-INC)?$/;
  return filename.match(regex) != null;
}

export function getFileBinary(file: Blob) {
  return new Promise<string | ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return reject();
      resolve(e.target.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
