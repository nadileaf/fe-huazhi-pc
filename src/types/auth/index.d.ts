declare namespace AuthModel {
  /**
   * @description 用户角色（后端返回）
   */
  type UserRole = {
    /**
     * @description 角色Id
     */
    roleId: string;

    /**
     * @description 角色名称
     */
    roleName: string;

    /**
     * @description 角色描述
     */
    roleDescription?: string;
    /**
     * @description 是否为超管
     */
    isSuperAdmin: boolean;
    /**
     *
     * @description 创建时间
     */
    createdAt?: Common.DateType;

    /**
     * @description 角色权限ids
     */
    roleAuthIds?: UserAuth['authId'][];

    /**
     * @description 角色创建者
     */
    roleCreator?: Operator;

    /**
     * @description 成员数量
     */
    memberCount: number;

    /**
     * @description 成员列表
     */
    members?: UserModel.User[];

    /**
     * @description 功能权限
     */
    funcAuths?: FuncAuth[];
  };

  /**
   * @description 操作者
   * @description 没有的话就是系统生成
   */
  type Operator = {
    /**
     * @description 用户id
     */
    id: UserModel.User['userId'];
    /**
     * @description 姓名
     */
    username: UserModel.User['username'];
    /**
     * @description 所有角色名
     */
    roleNames: UserRole['roleName'][];
  };

  /**
   * @description 用户权限
   */
  type UserAuth = {
    /**
     * @description 权限 Id
     */
    authId: import('@/models/auth').AuthMap;
    /**
     * @description 权限对应后端接口 URL
     */
    authUri: string;
    /**
     * @description 权限名称
     */
    authName: string;
    /**
     * @description  请求方法
     */
    method: string;

    /**
     * @description  checkbox label -> 权限名称
     */
    label?: UserAuth['authName'];

    /**
     * @description  checkbox value -> 权限ID
     */
    value?: UserAuth['authId'];
    /**
     * @description  checkbox value
     */
    disabled?: boolean;
  };

  type FuncAuthSubcategory = {
    subcategory: string;
    subcategoryName: string;
    auths: UserAuth[];
  };

  /**
   * @description 用户功能权限
   */
  type FuncAuth = {
    /**
     * @description   职位台 | 人才库 | 自动化任务 | 应用管理 | 权限管理
     */
    category: string;
    /**
     * @description 展示的权限名
     */
    categoryName: string;
    /**
     * @description   无具体分类的权限，和 subcategories 是【或】的关系
     */
    auths: UserAuth[] | null;
    /**
     * @description   两级分类的权限，和 auths 是【或】的关系
     */
    subcategories: FuncAuthSubcategory[] | null;

    /**
     * @description 该分类下 auths 的 ids
     */
    authIds: string[];
    /**
     * @description 角色权限ids
     */
    roleAuthIds?: UserAuth['authId'][];
  };

  type AuthMap = typeof import('@/models/auth').AuthMap;
  type AuthOf = Record<keyof AuthMap, boolean>;
}
