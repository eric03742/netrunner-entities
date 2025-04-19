import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";

/** 数据库实体「子类型」 */
@Entity({ name: "subtypes" })
export class SubtypeEntity extends BaseEntity {
    /** 子类型唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 子类型英文名称 */
    @Column()
    oracle_name: string = "";

    /** 子类型本地化名称 */
    @Column()
    locale_name: string = "";
}
