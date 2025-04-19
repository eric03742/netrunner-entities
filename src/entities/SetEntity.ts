import { Column, Entity, Index, JoinColumn, ManyToOne, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { CycleEntity } from "./CycleEntity.js";
import { SettypeEntity } from "./SettypeEntity.js";


/** 数据库实体「卡包」 **/
@Entity({ name: "sets" })
export class SetEntity extends BaseEntity {
    /** 卡包唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 卡包英文名称 */
    @Column()
    oracle_name: string = "";

    /** 卡包本地化名称 */
    @Column()
    locale_name: string = "";

    /** 卡包所属循环ID */
    @Column()
    cycle_codename: string = "";

    /** 卡包所属循环 */
    @ManyToOne(() => CycleEntity)
    @JoinColumn({ name: "cycle_id" })
    cycle!: Relation<CycleEntity>;

    /** 卡包所属卡包类型ID */
    @Column()
    settype_codename: string = "";

    /** 卡包所属卡包类型 */
    @ManyToOne(() => SettypeEntity)
    @JoinColumn({ name: "settype_id" })
    settype!: Relation<SettypeEntity>;

    /** 卡包发行日期 */
    @Column()
    release_date: string = "";

    /** 卡包在循环中位置 */
    @Column()
    position: number = 0;

    /** 卡包卡牌数量 */
    @Column()
    size: number = 0;

    /** 卡包发行组 */
    @Column()
    released_by: string = "";
}
