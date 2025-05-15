declare namespace ShortCodeModel {
  type ShortCode = SchemaEntity.SchemaEntity<StandardFields>;
  type StandardFields = Partial<{
    /** json string */
    content: string;
  }>;
}
