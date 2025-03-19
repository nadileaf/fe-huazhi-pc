declare namespace UserLevelModel {
  type UserLevel = SchemaEntity.SchemaEntity<StandardFields>;

  type StandardFields = Partial<{
    icon: Common.NormalizedField.File;
    identifier: string;
  }>;
}
