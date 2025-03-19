export const predefineColors = [
  '#6f59f7',
  '#DBAA2C',
  '#40A6E6',
  '#28AAB4',
  '#CE61B1',
  '#EE5E99',
  '#FF68BA',
  '#ED927D',
  '#78B960',
  '#6A88F2',
  '#F9795F',
  '#1abc9c',
  '#27ae60',
  '#ec555c',
  '#fc575e',
  '#fcb410',
  // 'rgb(177, 126, 34)'
  // 'rgb(242, 77, 22)',
  // 'rgb(255, 134, 0)',
  // 'rgb(236, 102, 37)',
  // 'rgb(41, 128, 185)',
  // 'rgb(52, 152, 219)',
  // 'rgb(82, 140, 203)',
  // 'rgb(9, 24, 236)',
  // 'rgb(25, 158, 199)',
  // 'rgb(3, 162, 253)',
  // 'rgb(123, 104, 238)',
  // 'rgb(191, 74, 204)',
  // 'rgb(7, 67, 84)',
  // 'rgb(52, 73, 94)',
  // 'rgb(24, 29, 33)'
] as const;

/** @description like scss mix() function */
export const mixColor = (color1: string, color2: string, weight: number) => {
  if (color1.startsWith('rgb')) color1 = rgbToHex(color1);
  if (color2.startsWith('rgb')) color2 = rgbToHex(color2);
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 * (1 - weight) + r2 * weight)
    .toString(16)
    .padStart(2, '0');
  const g = Math.round(g1 * (1 - weight) + g2 * weight)
    .toString(16)
    .padStart(2, '0');
  const b = Math.round(b1 * (1 - weight) + b2 * weight)
    .toString(16)
    .padStart(2, '0');
  return '#' + r + g + b;
};

export const rgbToHex = (rgb: string) => {
  const sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  const _rgb = rgb.substring(4).split(')')[0].split(sep);
  const r = (+_rgb[0]).toString(16).padStart(2, '0'),
    g = (+_rgb[1]).toString(16).padStart(2, '0'),
    b = (+_rgb[2]).toString(16).padStart(2, '0');
  return '#' + r + g + b;
};

export function generateTagColorStyle(color?: (typeof predefineColors)[number]) {
  const _color = color ?? predefineColors[Math.floor(Math.random() * predefineColors.length)];
  return { color: _color, 'background-color': mixColor('#ffffff', _color, 0.1) };
}

export function generateColorShades(baseColor: string, steps: number): string[] {
  // 将 HEX 颜色转换为 RGB
  function hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  // 将 RGB 颜色转换为 HSL
  function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number, s: number;
    const l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0; // 无色
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          h = 0;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  // 将 HSL 颜色转换为 RGB
  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // 无色
    } else {
      const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  // 将 RGB 转换为 HEX
  function rgbToHex(r: number, g: number, b: number): string {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  const [r, g, b] = hexToRgb(baseColor);
  const [h, s, l] = rgbToHsl(r, g, b);

  const shades: string[] = [];
  for (let i = 0; i < steps; i++) {
    const lightness = l + ((1 - l) / steps) * i;
    const [newR, newG, newB] = hslToRgb(h, s, lightness);
    shades.push(rgbToHex(newR, newG, newB));
  }

  return shades;
}

export function getColorShadeByPercent(percent: number, colors: string[]) {
  if (percent <= 0) return colors[0];
  if (percent >= 100) return colors[colors.length - 1];

  const interval = 100 / (colors.length - 1);
  const index = Math.floor(percent / interval);

  return colors[index];
}
