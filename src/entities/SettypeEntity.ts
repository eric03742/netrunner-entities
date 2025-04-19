import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";

/** 数据库实体「卡包类型」 */
@Entity({ name: "settypes" })
export class SettypeEntity extends BaseEntity {
    /** 卡包类型唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 卡包类型英文名称 */
    @Column()
    oracle_name: string = "";

    /** 卡包类型本地化名称 */
    @Column()
    locale_name: string = "";

    /** 卡包类型英文描述 */
    @Column({ type: "varchar", length: 1000 })
    oracle_desc: string = "";

    /** 卡包类型本地化描述 */
    @Column({ type: "varchar", length: 1000 })
    locale_desc: string = "";
}
