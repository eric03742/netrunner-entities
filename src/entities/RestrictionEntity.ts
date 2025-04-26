import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { FormatEntity } from "./FormatEntity.js";
import {CardEntity} from "./CardEntity.js";
import { SubtypeEntity } from "./SubtypeEntity.js";

/** 数据库实体「禁限表」 */
@Entity({ name: "restrictions" })
export class RestrictionEntity extends BaseEntity {
    /** 禁限表唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 禁限表英文名称 */
    @Column()
    oracle_name: string = "";

    /** 禁限表所属赛制ID */
    @Column()
    format_codename: string = "";

    /** 禁限表所属赛制 */
    @ManyToOne(() => FormatEntity)
    @JoinColumn({ name: "format_id" })
    format!: Relation<FormatEntity>;

    /** 禁限表开始日期 */
    @Column()
    start_date: string = "";

    /** 禁限表禁止卡牌ID */
    @Column({ type: "varchar", length: 5000 })
    banned_card_codenames: string = "";

    @ManyToMany(() => CardEntity)
    @JoinTable()
    banned_cards!: Relation<CardEntity>[];

    /** 禁限表禁止子类型ID */
    @Column({ type: "varchar", length: 5000 })
    banned_subtype_codenames: string = "";

    @ManyToMany(() => SubtypeEntity)
    @JoinTable()
    banned_subtypes!: Relation<SubtypeEntity>[];
}
