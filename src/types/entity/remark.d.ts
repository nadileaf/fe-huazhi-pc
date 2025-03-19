declare namespace EntityRemarkModel {
  type Remark = {
    id: string;
    createdAt: Common.DateType;
    updatedAt: Common.DateType;
    content: string;
    createdBy: string;
  };
}
