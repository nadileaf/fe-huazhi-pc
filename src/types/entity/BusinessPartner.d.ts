declare namespace BusinessPartnerModel {
  type StandardFields = Partial<{
    /** 简称 */
    abbreviation: string;
    /** 行业 */
    industries: string[];
    /** 公司规模 */
    companyScale: string;
    /** 联系人 */
    contactPerson: Common.NormalizedField.Contact;
    /** 公司地址 */
    companyAddress: Common.NormalizedField.Location;
    /** TenantMember 引用实体 */
    bd: Common.NormalizedField.EntityReference;
    /** 状态 */
    status: string;
    /** BD渠道 */
    bdChannels: string[];
    /** 附件 */
    attachments: Common.NormalizedField.File[];
  }>;

  type BusinessPartner = SchemaEntity.SchemaEntity<StandardFields>;
}
