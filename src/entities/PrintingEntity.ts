import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { CardEntity } from "./CardEntity.js";
import { SetEntity } from "./SetEntity.js";

/** 数据库实体「卡图」 */
@Entity({ name: "printings" })
export class PrintingEntity extends BaseEntity {
    /** 卡图唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 卡图卡牌ID */
    @Column()
    card_codename: string = "";

    /** 卡图卡牌 */
    @ManyToOne(() => CardEntity, (card) => card.printings)
    @JoinColumn({ name: "card_id" })
    card!: Relation<CardEntity>;

    /** 卡图所属卡包ID */
    @Column()
    set_codename: string = "";

    /** 卡图所属卡包 */
    @ManyToOne(() => SetEntity)
    @JoinColumn({ name: "set_id" })
    set!: Relation<SetEntity>;

    /** 卡图序号 */
    @Column()
    position: number = 0;

    /** 卡图英文风味文字 */
    @Column({ type: "varchar", length: 1000 })
    oracle_flavor: string = "";

    /** 卡图本地化风味文字 */
    @Column({ type: "varchar", length: 1000 })
    locale_flavor: string = "";

    /** 卡图在卡包中数量 */
    @Column()
    quantity: number = 0;

    /** 卡牌额外牌面数 */
    @Column()
    extra_face: number = 0;

    /** 卡图插画作者 */
    @Column()
    illustrator: string = "";

    /** 卡图发行组 */
    @Column()
    released_by: string = "";
}
