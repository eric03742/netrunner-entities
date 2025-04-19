import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity, SEPARATOR } from "./BaseEntity.js";
import { FormatEntity } from "./FormatEntity.js";

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
    set_codename_list: string = "";

    public get set_codenames(): string[] {
        return this.set_codename_list.split(SEPARATOR);
    }

    /** 卡池包含循环ID */
    @Column({ type: "varchar", length: 5000 })
    cycle_codename_list: string = "";

    public get cycle_codenames(): string[] {
        return this.cycle_codename_list.split(SEPARATOR);
    }
}
