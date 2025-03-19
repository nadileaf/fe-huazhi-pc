/** @description 标签 */
declare namespace TagModel {
  /** @description 系统标签 */
  type TagLibrary = Pick<Common.NormalizedField.EntityTag, 'name' | 'style'> & {
    meta: SchemaEntity.Meta;
    editable: boolean;
    /** 标签所属类型 */
    type: EntityModel.EntityType;
    /** 创建人 */
    createdBy: string;
  };

  /** @description 实体标签 */
  type EntityTag = Pick<Common.NormalizedField.EntityTag, 'name' | 'style' | 'tagId'> & {
    /** 创建人 */
    creator: { openId: string };
  };
}
