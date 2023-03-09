export interface Type1 {
  /** 城市名称 */
  cityName?: string;
  /**
   * 创建时间
   * @format date-time
   */
  createAt?: string;
  /**
   * 项目负责人
   * @format int32
   */
  employeeId: number;
  /** 员工名称 */
  employeeName?: string;
  /** @format int32 */
  id?: number;
  /**
   * 是否删除（1：删除，0：未删除）
   * @format int32
   */
  isDelete?: number;
  /** 项目所在城市编号 */
  projectCity: string;
  /** 项目描述 */
  projectDescription?: string;
  /** 项目名称 */
  projectName: string;
  /** 项目所在省份编号 */
  projectProvince: string;
  /** 项目所在区县编号 */
  projectTown?: string;
  /**
   * 项目类型（0：其他项目，1：城轨项目）
   * @format int32
   */
  projectType: number;
  /** 省份名称 */
  provinceName?: string;
  /** 区县名称 */
  townName?: string;
  /**
   * 修改时间
   * @format date-time
   */
  updateAt?: string;
}

class Api {
  todo: <T>(arg: T) => 0;
  do() {
    this.todo<Type1>(1 as any);
  }
}
