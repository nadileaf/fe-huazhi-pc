export function safeJSONParse<T>(str: string): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.error('safeJSONParse', e);
    return undefined;
  }
}

export function safeJSONStringify(obj: any): string | undefined {
  try {
    return JSON.stringify(obj);
  } catch (e) {
    console.error('safeJSONStringify', e);
    return undefined;
  }
}

export function storageStore(namespace?: string, options?: { storage?: Storage }) {
  if (typeof window === 'undefined') return;
  const _namespace = namespace || 'default';
  const storage = options?.storage || window?.localStorage;
  const namespaceKey = (key: string) => {
    return _namespace + ':' + key;
  };
  return {
    set(key: string, value: any) {
      const _value = safeJSONStringify(value);
      _value ? storage.setItem(namespaceKey(key), _value) : storage.removeItem(namespaceKey(key));
    },
    get<T>(key: string) {
      const _value = storage.getItem(namespaceKey(key));
      return _value ? safeJSONParse<T>(_value) : undefined;
    },
    remove(key: string) {
      storage.removeItem(namespaceKey(key));
    },
    clearAll: function clearAll() {
      for (const key in storage) {
        if (key.startsWith(namespace + ':')) {
          storage.removeItem(key);
        }
      }
    },
  };
}

export function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms ?? 0));
}

export function generateUrl(
  url = '',
  query: Record<string, any>,
  hashes: Record<string, any> = {},
) {
  const queryStringParts = [];
  for (const key in query) {
    const value = query[key];
    if ([undefined, null, ''].includes(value)) continue;
    if (Array.isArray(value)) {
      value.forEach((_value) => {
        queryStringParts.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value));
      });
    } else {
      queryStringParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  const queryString = queryStringParts.join('&');
  if (queryString) {
    url += url.includes('?') ? '&' : '?';
    url += queryString;
  }

  const hashStringParts = [];
  for (const key in hashes) {
    const value = hashes[key];
    if ([undefined, null, ''].includes(value)) continue;
    hashStringParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }
  const hashString = hashStringParts.join('&');
  if (hashString) {
    url += '#' + hashString;
  }

  return url;
}

export const downloadByUrl = (url: string, name?: string) => {
  const element = document.createElement('a');
  element.href = url;
  element.download = name || '';
  element.target = '_blank';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const getUrlQuery = (url?: string) => {
  if (typeof window === 'undefined') return {};
  try {
    const search = url
      ? url.split('?')[1]?.split('#')[0]
      : window.location.search.substring(1).split('#')[0];
    const urlSearchParams = new URLSearchParams(search);
    const entries = urlSearchParams.entries();
    const query = {} as Record<string, any>;
    for (const [key, value] of entries) {
      if (query[key]) {
        query[key] = Array.isArray(query[key])
          ? [...(query[key] as string[]), value]
          : [query[key], value];
      } else {
        query[key] = value;
      }
    }
    return query;
  } catch (error) {
    return {};
  }
};

export const getUrlHash = (
  url: string = window.location.href,
): Record<string, string | string[]> => {
  const { hash } = new URL(url.endsWith('&') ? url.slice(0, -1) : url);

  if (!hash) return {};

  const hashParams = new URLSearchParams(hash.slice(1));
  const hashes: Record<string, string | string[]> = {};

  hashParams.forEach((value, key) => {
    hashes[key] = key in hashes ? [...hashes[key], value] : value;
  });

  return hashes;
};

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  // @ts-expect-error fix window type
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos/i.test(
      userAgent,
    ) || window.innerWidth < 640
  );
}

export function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export const isTruncated = (el: HTMLElement) => {
  if (!el) return false;
  if (el.scrollHeight > el.clientHeight) return true;

  const textContent = el;
  const targetW = textContent.getBoundingClientRect().width ?? 0;
  const range = document.createRange();
  range.setStart(textContent, 0);
  range.setEnd(textContent, textContent.childNodes.length);
  const rangeWidth = range.getBoundingClientRect().width;
  return rangeWidth > targetW;
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.location.hash = `#${id}`;
    element.blur();
  }
};

export const loadAsyncScript = (src: string, type?: 'script' | 'link') => {
  return new Promise((resolve, reject) => {
    let script: HTMLLinkElement | HTMLScriptElement;
    if (type === 'link') {
      script = document.createElement('link');
      script.setAttribute('rel', 'stylesheet');
      script.setAttribute('type', 'text/css');
      script.setAttribute('href', src);
    } else {
      script = document.createElement('script');
      script.setAttribute('src', src);
    }
    document.head.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
  });
};

export const loadAsyncScripts = async (paths: string[], delay?: number) => {
  try {
    const promises = paths.map((path) =>
      loadAsyncScript(path, path.includes('.css') ? 'link' : 'script'),
    );
    await Promise.all(promises);
    delay && (await sleep(delay));
  } catch (error) {
    console.error(error);
  }
};
