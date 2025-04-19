import { Column, Entity, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { CardEntity } from "./CardEntity.js";

/** 数据库实体「FAQ」 */
@Entity({ name: "rulings" })
export class RulingEntity extends BaseEntity {
    /** FAQ问题 */
    @Column({ type: "varchar", length: 2000 })
    question: string = "";

    /** FAQ答案 */
    @Column({ type: "varchar", length: 2000 })
    answer: string = "";

    /** FAQ文本 */
    @Column({ type: "varchar", length: 2000 })
    text: string = "";

    /** FAQ所属卡牌ID */
    @Column()
    card_codename: string = "";

    /** FAQ所属卡牌 */
    @ManyToOne(() => CardEntity)
    @JoinColumn({ name: "card_id" })
    card!: Relation<CardEntity>;

    /** FAQ日期 */
    @Column()
    update_date: string = "";

    /** FAQ验证性 */
    @Column()
    nsg_verified: boolean = false;
}
