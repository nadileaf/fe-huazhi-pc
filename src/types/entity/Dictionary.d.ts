declare namespace DictionaryModel {
  type Dictionary = SchemaEntity.SchemaEntity<StandardFields>;

  type DictionaryId = 'industry' | 'category';

  type DictionaryDataType = 'trees' | 'stringArray';
  type DictionaryData = Tree[] | string[];

  type Tree = {
    label: string;
    value: string;
    children: Tree[];
  };

  type StandardFields = {
    type: DictionaryDataType;
    data: {
      stringArray: string[] | null;
      trees: Tree[] | null;
    };
  };
}
