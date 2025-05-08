# netrunner-entities

![](https://img.shields.io/npm/l/netrunner-entities) |
![](https://img.shields.io/npm/v/netrunner-entities) |
![](https://img.shields.io/npm/types/netrunner-entities)

*《矩阵潜袭》中文卡牌数据库实体定义*

## 简介

`netrunner-entities` 使用 [TypeORM](https://typeorm.io/) 定义了《矩阵潜袭》中文卡牌数据库中所使用的表结构。

`netrunner-entities` 可以作为需要访问《矩阵潜袭》中文数据库的项目的DAO实现，也可以用于快速创建访问中文卡牌数据库的TypeORM数据源。

## 安装

使用 `npm` 安装：

```shell
npm install netrunner-entities --save
```

## 使用

### 使用数据库实体定义

你可以直接使用 `netrunner-entities` 中定义的数据库实体定义类。只需在项目中导入：

```typescript
import { CardEntity, PrintingEntity } from "netrunner-entities";
```

之后即可作为 `typeorm` 的实体使用：

```typescript
import { CardEntity, PrintingEntity } from "netrunner-entities";
import { AppDataSource } from "./data-source";

const repository = AppDataSource.getRepository(PrintingEntity);
const printings = await repository.find({
    select: ["codename"],
    relations: ["card"],
});

for(const printing of printings) {
    // ...
}
```

### 使用TypeORM数据源

`netrunner-entities` 提供了一个简单数据源工厂类 `NetrunnerDataSource`，你可以通过 `NetrunnerDataSource.create()` 方法创建一个用于访问矩阵潜袭中文卡牌数据库的SQLite数据源。

`NetrunnerDataSource` 已预先加载了 `netrunner-entities` 中所定义的所有实体，在构造时只需提供数据库名称即可如一般的 `DataSource` 数据源类使用。

```typescript
import { NetrunnerDataSource, CardEntity } from "netrunner-entities";

const AppDataSource = NetrunnerDataSource.create("netrunner.sqlite");
await AppDataSource.initialize();
const database = AppDataSource.getRepository(CardEntity);
const cards = await database.find();
for(const card of cards) {
    // ...
}
```

## 数据结构

### 阵营/Side

定义《矩阵潜袭》中的双方阵营，即“公司”与“潜袭者”。阵营实体包含如下字段：

* **codename**：阵营唯一标识
* **oracle_name**：阵营英文名称
* **locale_name**：阵营中文名称
* **factions**：属于本阵营的派系实体

### 派系/Faction

《矩阵潜袭》中每个阵营下有若干派系，如公司阵营下的“威兰财团”、“人间会社”与潜袭者阵营下的“反叛者”、“塑造者”等。派系实体包含如下字段：

* **codename**：派系唯一标识
* **oracle_name**：派系英文名称
* **locale_name**：派系英文名称
* **oracle_desc**：派系英文描述
* **locale_desc**：派系中文描述
* **color**：派系颜色
* **is_mini**：派系是否为迷你派系
* **side_codename**：派系所属阵营标识
* **side**：派系所属阵营实体

### 卡牌类型/Type

《矩阵潜袭》中的每张卡牌都具有一个卡牌类型，如“议案”、“程序”、“事件”等。卡牌类型实体包含如下字段：

* **codename**：卡牌类型唯一标识
* **oracle_name**：卡牌类型英文名称
* **locale_name**：卡牌类型中文名称
* **side_codename**：卡牌类型所属阵营标识
* **side**：卡牌类型所属阵营实体

### 卡牌子类型/Subtype

《矩阵潜袭》中的卡牌在卡牌类型以外还可能具有若干子类型，如“破解器”、“潜袭”、“交易”等。卡牌子类型实体包含如下字段：

* **codename**：卡牌子类型唯一标识
* **oracle_name**：卡牌子类型英文名称
* **locale_name**：卡牌子类型中文名称

### 卡包类型/Settype

《矩阵潜袭》中的卡包根据其定位分为不同的类型，如“核心包”、“数据包”等。卡包类型实体包含如下字段：

* **codename**：卡包类型唯一标识
* **oracle_name**：卡包类型英文名称
* **locale_name**：卡包类型中文名称
* **oracle_desc**：卡包类型英文描述
* **locale_desc**：卡包类型中文描述

### 循环/Cycle

《矩阵潜袭》的卡包以循环为周期组织，如NSG发布的三个循环“余烬”、“北极光”和“解放”。循环实体包含如下字段：

* **codename**：循环唯一标识
* **oracle_name**：循环英文名称
* **locale_name**：循环中文名称
* **position**：循环序号
* **released_by**：发行组
* **sets**：属于本循环的卡包实体

### 卡包/Set

《矩阵潜袭》中的卡牌以卡包为单位发布，如“解放”循环的“自动机倡议”与“即兴叛乱”。卡包实体包含如下字段：

* **codename**：卡包唯一标识
* **oracle_name**：卡包英文名称
* **locale_name**：卡包中文名称
* **cycle_codename**：卡包所属循环标识
* **cycle**：卡包所属循环实体
* **settype_codename**：卡包所属卡包类型标识
* **settype**：卡包所属卡包类型实体
* **release_date**：卡包发行日期
* **position**：卡包在循环中序号
* **size**：卡包中卡牌数量
* **released_by**：发行组
* **printings**：属于本卡包的卡图

### 赛制/Format

《矩阵潜袭》根据所使用卡池范围的不同分为若干赛制，如“标准”、“新启”、“永恒”等。赛制实体包含如下字段：

* **codename**：赛制唯一标识
* **oracle_name**：赛制英文名称
* **locale_name**：赛制本地化名称
* **snapshots**：属于本赛制的环境实体

### 卡池/Pool

卡池定义了《矩阵潜袭》中一个环境内允许使用的卡包列表。卡池实体包含如下字段：

* **codename**：卡池唯一标识
* **oracle_name**：卡池英文名称
* **format_codename**：卡池所属赛制标识
* **format**：卡池所属赛制实体
* **set_codenames**：属于本卡池的卡包的标识列表（序列化为字符串形式，以逗号分隔）
* **sets**：属于本卡池的卡包实体
* **cycle_codenames**：属于本卡池的循环的标识列表（序列化为字符串形式，以逗号分隔）
* **cycles**：属于本卡池的循环实体

### 禁限表/Restriction

禁限表定义了《矩阵潜袭》中一个环境内不允许使用的卡牌列表。禁限表实体包含如下字段：

* **codename**：禁限表唯一标识
* **oracle_name**：禁限表英文名称
* **formate_codename**：禁限表所属赛制标识
* **format**：禁限表所属赛制实体
* **start_date**：禁限表开始生效日期
* **banned_card_codenames**：属于本禁限表的卡牌的标识列表（序列化为字符串形式，以逗号分隔）
* **banned_cards**：属于本禁限表的卡牌
* **banned_subtype_codenames**：属于本禁限表的卡牌子类型的卡牌子类型标识列表（序列化为字符串形式，以逗号分隔）
* **banned_subtypes**：属于本禁限表的卡牌子类型

### 环境/Snapshot

环境指的是一个赛制在给定的时间内所使用的卡池和禁限表，它定义了这个赛制在这段时间内能够使用的卡牌范围。环境包含如下字段：

* **codename**：环境唯一标识
* **start_date**：环境开始生效日期
* **formate_codename**：环境所属赛制标识
* **format**：环境所属赛制实体
* **restriction_codename**：环境使用禁限表标识
* **restriction**：环境使用禁限表实体
* **pool_codename**：环境使用卡池标识
* **pool**：环境使用卡池实体
* **active**：环境是否正在使用

### 卡牌/Card

定义《矩阵潜袭》中一张卡牌上包含的各种信息，如卡名、费用、卡牌文本等。卡牌实体包含如下字段：

* **codename**：卡牌唯一标识
* **oracle_title**：卡牌英文名称
* **locale_title**：卡牌中文名称
* **stripped_title**：卡牌无符号英文名称
* **oracle_text**：卡牌英文文本
* **locale_text**：卡牌中文文本
* **stripped_text**：卡牌无符号英文文本
* **type_codename**：卡牌类型标识
* **type**：卡牌类型实体
* **subtype_codenames**：卡牌子类型标识列表（序列化为字符串形式，以逗号分隔）
* **subtypes**：卡牌子类型实体列表
* **side_codename**：卡牌阵营标识
* **side**：卡牌阵营实体
* **faction_codename**：卡牌派系标识
* **faction**：卡牌派系实体
* **is_unique**：卡牌是否独有
* **deck_limit**：卡牌在牌组中张数限制
* **advance_requirement**：卡牌推进需求
* **agenda_point**：卡牌议案分数
* **base_link**：卡牌基础中转
* **minimum_deck_size**：卡牌所用牌组最小张数
* **influence_limit**：卡牌所用牌组影响力上限
* **influence_cost**：卡牌影响力费用
* **cost**：卡牌费用
* **strength**：卡牌强度
* **memory_cost**：卡牌内存费用
* **trash_cost**：卡牌销毁费用
* **attribution**：卡牌冠名信息
* **designed_by**：卡牌设计组
* **pronouns**：卡牌人称代词
* **pronunciation_ipa**：卡牌读音（国际音标）
* **pronunciation_approx**：卡牌读音（英文音标）
* **extra_face**：卡牌额外牌面数
* **printings**：属于本卡牌的卡图实体
* **rulings**：属于本卡牌的FAQ实体

### 卡图/Printing

卡图是一张卡牌的若干不同版本。卡图实体包含如下字段：

* **codename**：卡图唯一标识
* **card_codename**：卡图对应的卡牌标识
* **card**：卡图对应的卡牌实体
* **set_codename**：卡图所属卡包标识
* **set**：卡图所属卡包实体
* **position**：卡图序号
* **oracle_flavor**：卡图英文风味文字
* **locale_flavor**：卡图中文风味文字
* **quantity**：卡图数量
* **extra_face**：卡图额外牌面数
* **illustrator**：卡图插画作者
* **released_by**：卡图发行组

> 注：NRDB的新版API将“卡牌/card”和“卡图/printing”做了拆分，多个卡图不同但文本内容相同的卡牌现在会被视作同一张卡牌的不同卡图（或称之为异画）。
> 举例：「伊索的典当铺」这张牌共有四个版本，分别来自 [核心系列](https://netrunnerdb.com/en/card/01047)、[核心系列修订版](https://netrunnerdb.com/en/card/20052)、[系统核心 2019](https://netrunnerdb.com/en/card/25056) 和 [系统革新 2021](https://netrunnerdb.com/en/card/31035)。 在NRDB旧版的数据格式中，这四个版本的「伊索的典当铺」会被视作四张不同的卡牌，它们（至少在理论上）可以拥有不同的卡牌文本、甚至是不同的数值。而新版的数据结构会将这四个版本视作同一个卡牌「伊索的典当铺」的四个不同卡图。

### FAQ/Ruling

FAQ是有关卡牌规则的详解。FAQ实体包含如下字段：

* **question**：FAQ题目
* **answer**：FAQ答案
* **text**：FAQ规则文本
* **card_codename**：FAQ所属卡牌标识
* **card**：FAQ所属卡牌实体
* **update_date**：FAQ日期
* **nsg_verified**：FAQ是否经NSG确认

## 已知问题

《矩阵潜袭》的早期环境包含MWL等特殊的禁限表，永恒环境包含“Eternal Point”这一特殊的禁限手段。这两种特殊的禁限表目前中文卡牌数据库中尚未收录。

## 许可证

[MIT](./LICENSE)

## 作者

[Eric03742](https://github.com/eric03742)
