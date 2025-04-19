import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { SideEntity } from "./SideEntity.js";

/** 数据库实体「类型」 */
@Entity({ name: "types" })
export class TypeEntity extends BaseEntity {
    /** 类型唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 类型英文名称 */
    @Column()
    oracle_name: string = "";

    /** 类型本地化名称 */
    @Column()
    locale_name: string = "";

    /** 类型所属阵营ID */
    @Column()
    side_codename: string = "";

    /** 类型所属阵营 */
    @ManyToOne(() => SideEntity)
    @JoinColumn({ name: "side_id" })
    side!: Relation<SideEntity>;
}
