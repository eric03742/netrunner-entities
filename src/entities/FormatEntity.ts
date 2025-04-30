import { Column, Entity, Index, OneToMany, Relation } from "typeorm";
import { BaseEntity } from "./BaseEntity.js";
import { SnapshotEntity } from "./SnapshotEntity.js";

/** 数据库实体「赛制」 */
@Entity({ name: "formats" })
export class FormatEntity extends BaseEntity {
    /** 赛制唯一标识 */
    @Column()
    @Index({ unique: true })
    codename: string = "";

    /** 赛制英文名称 */
    @Column()
    oracle_name: string = "";

    /** 赛制本地化名称 */
    @Column()
    locale_name: string = "";

    /** 属于本赛制的环境 */
    @OneToMany(() => SnapshotEntity, (snapshot) => snapshot.format)
    snapshots!: Relation<SnapshotEntity>[];
}
