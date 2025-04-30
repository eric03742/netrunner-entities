import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { FormatEntity } from "./FormatEntity.js";
import { SetEntity } from "./SetEntity.js";
import { CycleEntity } from "./CycleEntity.js";

/** 数据库实体「卡池」 */
@Entity({ name: "pools" })
export class PoolEntity extends BaseEntity {
    /** 卡池唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 卡池英文名称 */
    @Column()
    oracle_name: string = "";

    /** 卡池所属赛制ID */
    @Column()
    format_codename: string = "";

    /** 卡池所属赛制 */
    @ManyToOne(() => FormatEntity)
    @JoinColumn({ name: "format_id" })
    format!: Relation<FormatEntity>;

    /** 卡池包含卡包ID */
    @Column({ type: "varchar", length: 5000 })
    set_codenames: string = "";

    /** 属于本卡池的卡包 */
    @ManyToMany(() => SetEntity)
    @JoinTable()
    sets!: Relation<SetEntity>[];

    /** 卡池包含循环ID */
    @Column({ type: "varchar", length: 5000 })
    cycle_codenames: string = "";

    /** 属于本卡池的循环 */
    @ManyToMany(() => CycleEntity)
    @JoinTable()
    cycles!: Relation<CycleEntity>[];
}
