import { DataSource, DataSourceOptions } from "typeorm";

import { SideEntity } from "./entities/SideEntity.js";
import { FactionEntity } from "./entities/FactionEntity.js";
import { TypeEntity } from "./entities/TypeEntity.js";
import { SubtypeEntity } from "./entities/SubtypeEntity.js";
import { SettypeEntity } from "./entities/SettypeEntity.js";
import { CycleEntity } from "./entities/CycleEntity.js";
import { SetEntity } from "./entities/SetEntity.js";
import { FormatEntity } from "./entities/FormatEntity.js";
import { PoolEntity } from "./entities/PoolEntity.js";
import { RestrictionEntity } from "./entities/RestrictionEntity.js";
import { SnapshotEntity } from "./entities/SnapshotEntity.js";
import { CardEntity } from "./entities/CardEntity.js";
import { PrintingEntity } from "./entities/PrintingEntity.js";
import { RulingEntity } from "./entities/RulingEntity.js";

export interface NetrunnerDataSourceOptions {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

/**
 * 提供一个简单的连接《矩阵潜袭》数据库的数据源类
 */
export class NetrunnerDataSource extends DataSource {
    constructor(options: NetrunnerDataSourceOptions) {
        const builder: DataSourceOptions = {
            ...options,
            type: "mysql",
            logging: [
                "error", "warn", "info", "log"
            ],
            entities: [
                SideEntity, FactionEntity, TypeEntity, SubtypeEntity,
                SettypeEntity, CycleEntity, SetEntity,
                FormatEntity, PoolEntity, RestrictionEntity, SnapshotEntity,
                CardEntity, PrintingEntity, RulingEntity
            ],
        }
        super(builder);
    }
}
