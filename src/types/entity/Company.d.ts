declare namespace CompanyModel {
  type Company = SchemaEntity.SchemaEntity<StandardFields>;
  type StandardFields = Partial<{
    /** logo */
    logo: Common.NormalizedField.File;
    /** 公司名称 */
    name: string;
    /** 别名 */
    alias: string;
    /** 简称 */
    short_names: string[];
    /** 历史名称 */
    history_names: string[];
    /** 简介 */
    profile: string;
    /** 地址 */
    address: Common.NormalizedField.Location;
    /** 标签 */
    tags: Common.NormalizedField.EntityTag[];
    /** 简称列表 */
    short_names: string[];
    /** 经营范围 */
    businessScope: string;
    /** 历史名称 */
    history_names: string[];
    /** 法人 */
    juristicPerson: string;
    /** 营业执照 */
    businessLicense: BusinessLicense;
    /** 行业 */
    industry: string[];
    /** 租户 */
    tenant: {
      openId: string;
      entityType: 'Tenant';
    };
  }>;

  interface BusinessLicense {
    /** 营业执照文件 */
    file?: Common.NormalizedField.File;
    /** 企业名称 */
    name?: string;
    /** 企业类型 */
    type?: string;
    /** 统一社会信用代码 */
    uscc?: string;
    /** 营业期限 */
    period?: string;
    /** 法人 */
    person?: string;
    /** 地址 */
    address?: string;
    /** 经营范围 */
    business?: string;
  }
}
