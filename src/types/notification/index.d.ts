declare namespace NotificationModel {
  type NotificationType = 'OrdinaryGiftPack' | 'UpgradeGiftPack' | 'PositiveEvaluationGiftPack';

  type Notification = {
    id: number;
    title: string;
    content: string;
    icon: Common.NormalizedField.File;
    type: NotificationType;
    detail_type?: string;
    createdAt: Common.DateType;
  };
}
