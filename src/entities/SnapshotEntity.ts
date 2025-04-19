import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { FormatEntity } from "./FormatEntity.js";
import { RestrictionEntity } from "./RestrictionEntity.js";
import { PoolEntity } from "./PoolEntity.js";

/** 数据库实体「环境」 */
@Entity({ name: "snapshots" })
export class SnapshotEntity extends BaseEntity {
    /** 环境唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 环境开始日期 */
    @Column()
    start_date: string = "";

    /** 环境所属赛制ID */
    @Column()
    format_codename: string = "";

    /** 环境所属赛制 */
    @ManyToOne(() => FormatEntity)
    @JoinColumn({ name: "format_id" })
    format!: Relation<FormatEntity>;

    /** 环境使用禁限表ID */
    @Column()
    restriction_codename: string = "";

    /** 环境使用禁限表 */
    @ManyToOne(() => RestrictionEntity)
    @JoinColumn({ name: "restriction_id" })
    restriction!: Relation<RestrictionEntity>;

    /** 环境使用卡池ID */
    @Column()
    pool_codename: string = "";

    /** 环境使用卡池 */
    @ManyToOne(() => PoolEntity)
    @JoinColumn({ name: "pool_id" })
    pool!: Relation<PoolEntity>;

    /** 环境是否当前使用 */
    @Column()
    active: boolean = false;
}
