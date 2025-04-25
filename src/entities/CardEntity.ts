import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity, SEPARATOR } from "./BaseEntity.js";
import { TypeEntity } from "./TypeEntity.js";
import { SideEntity } from "./SideEntity.js";
import { FactionEntity } from "./FactionEntity.js";

/** 数据库实体「卡牌」 */
@Entity({ name: "cards" })
export class CardEntity extends BaseEntity {
    /** 卡牌唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 卡牌英文名称 */
    @Column()
    oracle_title: string = "";

    /** 卡牌本地化名称 */
    @Column()
    locale_title: string = "";

    /** 卡牌英文名称（ASCII） */
    @Column()
    stripped_title: string = "";

    /** 卡牌英文文本 */
    @Column({ type: "varchar", length: 1000 })
    oracle_text: string = "";

    /** 卡牌本地化文本 */
    @Column({ type: "varchar", length: 1000 })
    locale_text: string = "";

    /** 卡牌英文文本（ASCII） */
    @Column({ type: "varchar", length: 1000 })
    stripped_text: string = "";

    /** 卡牌类型ID */
    @Column()
    type_codename: string = "";

    /** 卡牌类型 */
    @ManyToOne(() => TypeEntity)
    @JoinColumn({ name: "type_id" })
    type!: Relation<TypeEntity>;

    /** 卡牌子类型ID */
    @Column()
    subtype_codename_list: string = "";

    public get subtype_codenames(): string[] {
        return this.subtype_codename_list.length > 0 ? this.subtype_codename_list.split(SEPARATOR) : [];
    }

    /** 卡牌阵营ID */
    @Column()
    side_codename: string = "";

    /** 卡牌阵营 */
    @ManyToOne(() => SideEntity)
    @JoinColumn({ name: "side_id" })
    side!: Relation<SideEntity>;

    /** 卡牌派系ID */
    @Column()
    faction_codename: string = "";

    /** 卡牌派系 */
    @ManyToOne(() => FactionEntity)
    @JoinColumn({ name: "faction_id" })
    faction!: Relation<FactionEntity>;

    /** 卡牌是否独有 */
    @Column()
    is_unique: boolean = false;

    /** 卡牌牌组限制 */
    @Column({ type: "int", nullable: true })
    deck_limit: number | undefined = undefined;

    /** 卡牌推进需求 */
    @Column({ type: "int", nullable: true })
    advancement_requirement: number | undefined = undefined;

    /** 卡牌议案分数 */
    @Column({ type: "int", nullable: true })
    agenda_point: number | undefined = undefined;

    /** 卡牌基础中转 */
    @Column({ type: "int", nullable: true })
    base_link: number | undefined = undefined;

    /** 卡牌牌组最小张数 */
    @Column({ type: "int", nullable: true })
    minimum_deck_size: number | undefined = undefined;

    /** 卡牌牌组影响力上限 */
    @Column({ type: "int", nullable: true })
    influence_limit: number | undefined = undefined;

    /** 卡牌影响力费用 */
    @Column({ type: "int", nullable: true })
    influence_cost: number | undefined = undefined;

    /** 卡牌费用 */
    @Column({ type: "int", nullable: true })
    cost: number | undefined = undefined;

    /** 卡牌强度 */
    @Column({ type: "int", nullable: true })
    strength: number | undefined = undefined;

    /** 卡牌内存费用 */
    @Column({ type: "int", nullable: true })
    memory_cost: number | undefined = undefined;

    /** 卡牌销毁费用 */
    @Column({ type: "int", nullable: true })
    trash_cost: number | undefined = undefined;

    /** 卡牌冠名 */
    @Column()
    attribution: string = "";

    /** 卡牌设计组 */
    @Column()
    designed_by: string = "";

    /** 卡牌人称代词 */
    @Column()
    pronouns: string = "";

    /** 卡牌读音（国际音标） */
    @Column()
    pronunciation_ipa: string = "";

    /** 卡牌读音（英文音标） */
    @Column()
    pronunciation_approx: string = "";

    /** 卡牌额外牌面数 */
    @Column()
    extra_face: number = 0;
}
