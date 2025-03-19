declare namespace DemandModel {
  type StandardFields = Partial<{
    description: string;
    name: string;
    budget: Common.NormalizedField.Quantity<'小时' | '天' | '项目' | '次'>;
    tags: Common.NormalizedField.EntityTag[];
    attachments: Common.NormalizedField.File[];
    geoPoint: Common.NormalizedField.GeoPoint;
    // 一周工作时长
    workDuration: Common.NormalizedField.Quantity<'week' | 'month' | 'day'>;
    // 工作时间：工作日白天、工作日晚上、周末
    workSchedulePreferences: string[];
    // 合作形式（多选）：线上、同城线下
    workModes: string[];
    // 线下同城接受的城市
    locations: Common.NormalizedField.Location[];
  }>;

  type Demand = SchemaEntity.SchemaEntity<StandardFields>;
}
