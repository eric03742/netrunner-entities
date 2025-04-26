import { Column, Entity, Index, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { FactionEntity } from "./FactionEntity.js";

/** 数据库实体「阵营」 */
@Entity({ name: "sides" })
export class SideEntity extends BaseEntity {
    /** 阵营唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 阵营英文名称 */
    @Column()
    oracle_name: string = "";

    /** 阵营本地化名称 */
    @Column()
    locale_name: string = "";

    /** 属于本阵营的派系 */
    @OneToMany(() => FactionEntity, (faction) => faction.side)
    factions!: Relation<FactionEntity>[];
}
