declare namespace Util {
  type Join<K, P> = K extends string | number
    ? P extends string | number
      ? `${K}${'' extends P ? '' : '.'}${P}`
      : never
    : never;
  type Prev = [
    never,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    ...0[],
  ];

  /** @description 生成object path */
  type Paths<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
      ? {
          [K in keyof T]-?: K extends string | number
            ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
            : never;
        }[keyof T]
      : '';

  /** @description 真值类型 */
  type Truthy<T> = T extends null | undefined | false | '' | 0 ? never : T;

  type Arrayable<T> = T | T[];
}
