import { Column, Entity, Index, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { SetEntity } from "./SetEntity.js";

/** 数据库实体「循环」 */
@Entity({ name: "cycles" })
export class CycleEntity extends BaseEntity {
    /** 循环唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 循环英文名称 */
    @Column()
    oracle_name: string = "";

    /** 循环本地化名称 */
    @Column()
    locale_name: string = "";

    /** 循环序号 */
    @Column()
    position: number = 0;

    /** 循环发行组 */
    @Column()
    released_by: string = "";

    /** 属于本循环的卡包 */
    @OneToMany(() => SetEntity, (set) => set.cycle)
    sets!: Relation<SetEntity>[];
}
