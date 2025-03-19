declare namespace UserModel {
  type UserType = 'share' | 'business';

  /** 简单用户信息, 用于获取系统全量用户 */
  export type BasicUserInfo = SchemaEntity.SchemaEntity<{
    humanInfo: Pick<ResumeModel.HumanInfo, 'name' | 'nickname' | 'avatar'>;
  }>;

  /**
   * @description 用户
   */
  type User = {
    /**
     * @description 用户 Id
     */
    userId: string;
    /** @description tenantMember实体Id */
    tenantMemberId: string;
    /**
     * @description 用户姓名
     */
    username: string;
    /**
     * @description 用户是否激活
     */
    active: boolean;
    /**
     * @description 是否为超管
     */
    isSuperAdmin?: boolean;

    /**
     * @description 头像
     */
    avatar?: string;
    avatarBg?: string;
    /**
     * @description 手机号
     */
    phone?: string;

    /**
     * @description 企业微信名
     */
    wxName?: string;

    /**
     * @description 企业微信账号
     */
    wxAcc?: string;

    /**
     * @description GitHub账号
     */
    githubAcc?: string;

    /**
     * @description 企业微信和GitHub账号是否关联
     */
    accSyncStatus?: string;

    /**
     * @description 邮箱地址
     */
    email?: string;

    /**
     * @description 公司名
     */
    company?: string;

    /**
     * @description 所在部门
     */
    department?: string;

    /**
     * @description 职位
     */
    position?: string;

    /**
     * @description 创建时间
     */
    addedAt: Common.DateType;

    /**
     * @description 用户状态
     */
    enabled: boolean;

    /**
     * @description 关联角色
     */
    userRoles?: AuthModel.UserRole[];

    /**
     * @description 关联角色ids
     */
    userRoleIds?: AuthModel.UserRole['roleId'][];

    /**
     * @description 用户所有权限
     */
    userAuths: AuthModel.UserAuth[];

    /**
     * @description 操作人 没有的话就是系统生成
     */
    operator?: AuthModel.Operator;

    /**
     * @description 本系统签发的鉴权码，拿到后设置到 request 的 header 中，
     * 即 { header: { authorization: `Bearer ${token}` } }
     */
    token?: string;
    /**
     * @description 添加成员处用，如果用户已经是该角色成员则为true
     */
    isRoleMember?: boolean;
    /**
     * @description 当前租户
     */
    currentTenant?: Tenant;
    /**
     * @description 在当前租户下是否禁用
     */
    tenantMemberActive: boolean;
    /** 用户注册状态，如果是chat注册的用户则不能直接使用tip */
    tenantMemberStatus: 'normal' | 'chat';
    /**
     * @description 当前用户的第三方关联账号
     */
    platformUsernames?: {
      platform: string;
      platformId: string;
      platformUsername: string;
    }[];
  };

  type SimpleUser = {
    openId: string;
    [k: string]: any;
  };

  /**
   * @description 租户，tenantAlias即接口所需的tenantId
   */
  type Tenant = {
    tenantId: string; // 租户 Id
    tenantName: string; // 租户名称
    scale: string; // 公司规模
    industry: string; // 公司行业
    tenantAlias: string;
    tenantMode: string;
    limitMode: boolean; // 套餐流量是否限制
    status: string;
    tenantLogoUrl: string;
  };

  /**
   * @description 第三方系统用户信息
   */
  type Account = {
    id: number;
    syncTime: Common.DateType;
    accountUsername: string;
    thirdParty: string;
    thirdPartyId: string;
    userId?: string;
  };
}
