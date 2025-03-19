declare namespace Common {
  type DateType = string | number | Date;

  type Priority = 'low' | 'medium' | 'high' | 'urgent' | '';

  type AnyFields = Record<string, any>;

  type ComponentType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';

  type FileType =
    | 'image'
    | 'video'
    | 'audio'
    | 'word'
    | 'excel'
    | 'powerpoint'
    | 'pdf'
    | 'zip'
    | 'text';

  declare namespace NormalizedField {
    type GeoPoint = {
      latitude: number;
      longitude: number;
      distance?: string;
    };

    type Rating = {
      max: number;
      value: number;
    };

    type Date = {
      year: number; // 年
      month: number; // 月
      day: number; // 日
      iso?: string; // iso8601 日期
    } | null;

    type DateRange =
      | {
          start?: Date; // 开始日期
          end?: Date; // 结束日期
          untilNow: boolean; // 是否持续至今
        }
      | undefined;

    type StringRange = {
      gte: { name: string }; // 下限
      lte: { name: string }; // 上限
    } | null;

    type Location = {
      country?: string;
      province?: string;
      city?: string;
      district?: string;
      code?: string;
      /** 区域 */
      region?: string;
      /** 地址 */
      address?: string;
      /** 邮编 */
      postalCode?: string;
    };

    type Contact = Partial<{
      name: string;
      wechat: string;
      remarks: string;
      position: string;
      phoneNumber: string;
    }>;

    type File = {
      fileName: string;
      key: string;
      isLink?: boolean;
      mimeType?: string;
      size?: number;
      extension?: string;
      createdBy?: EntityReference<'TenantMember'>;
      createdAt?: DateType;
      tags?: string[];
      base64?: string;
    };

    type EntityTag = {
      name: string;
      style: {
        color: string;
        'background-color': string;
      };
      tagId: string;
      creator: EntityReference;
    };

    /** 实体引用  */
    type EntityReference<
      T extends EntityModel.EntityType = EntityModel.EntityType,
      S = AnyFields,
      C = AnyFields,
    > = {
      openId?: string;
      entityType: T;
      tenantId?: string;
      payload?: EntityModel.Entity<T>;
    };

    type Salary = {
      amount: {
        /** 货币单位  */
        unit: 'CNY' | 'USD' | 'EUR' | 'GBP' | 'JPY';
        number?: number;
      };
      /** 十几薪  */
      months: number;
      /**  薪资单位（时｜日｜月｜年）  */
      period: 'hour' | 'day' | 'week' | 'month' | 'year' | undefined;
    };

    // 薪资范围
    type SalaryRange = {
      gt: Salary;
      lt: Salary;
      openClose: OpenClose;
    };

    // 学历
    type Degree = {
      name:
        | '小学'
        | '初中'
        | '高中'
        | '中专'
        | '大专'
        | '专科'
        | '专升本'
        | '本科'
        | '在职研究生'
        | '硕士'
        | '专业学位硕士'
        | '学术型硕士'
        | '在职博士生'
        | '博士'
        | '专业学位博士'
        | '学术型博士'
        | '博士后'
        | 'MBA'
        | 'EMBA';
      rank: number;
    };

    type Gender = '男' | '女';

    type IntRange = Partial<{
      gt: number; // 下限（不包含）
      lt: number; // 上限（不包含）
      openClose: OpenClose;
    }>;

    type Currency = {
      /** 货币单位 */
      unit?: 'CNY' | 'USD' | 'EUR' | 'GBP' | 'JPY';
      value?: string;
      /** 数量 */
      number?: number;
    };

    type Identification = {
      code?: string;
      name: '身份证' | '护照' | '军官证';
    };

    type Percent = {
      /** 允许的最小值 */
      readonly gt?: number;
      /** 允许的最大值 */
      readonly lt?: number;
      value: number;
    };

    type Quantity<Unit = string> = {
      unit: Unit;
      value: {
        gt?: number;
        lt?: number;
      };
    };
  }
}
