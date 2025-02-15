/**-----------------------------------------------
 @description: 
    怪物战斗胜利后随机事件    
    data：{
       uid {number} 玩家id 
       monster {Monster} 战胜怪物对象
    } 
 -----------------------------------------------*/

import RandomEvent from "./base.js";
import XiuxianMsg from "../common/msg.js";
import { rand } from '../util';
import {
    AddPowerByEvent,
    AddExp, AddBodyExp,
    AddItemToBackpack, AddSpiritStoneToBackpack,
    GetRandItem
} from '../Cache';

/** 增加大量修为 */
export const addLargeExp = new RandomEvent({
    name: '战斗后增加大量修为',
    odds: 0.10,
    fnc: async (data) => {
        const { uid, monster } = data;
        const exp = rand(700, 1000) * monster.level;
        const msg = [`击杀${monster.name}后，你发现了一颗完整的内丹，服下后你的修为提升了${exp}！！`];
        AddExp(uid, exp);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 增加中量修为 */
export const addMediumExp = new RandomEvent({
    name: '战斗后增加中量修为',
    odds: 0.20,
    fnc: async (data) => {
        const { uid, monster } = data;
        const exp = rand(200, 500) * monster.level;
        const msg = [`击杀${monster.name}后，你发现了怪物的内丹被拍碎了，只剩下一颗残破的内丹，服下后你的修为提升了${exp}！`];
        AddExp(uid, exp);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 增加大量气血 */
export const addLargeBodyExp = new RandomEvent({
    name: '战斗后增加大量气血',
    odds: 0.10,
    fnc: async (data) => {
        const { uid, monster } = data;
        const bodyExp = rand(700, 1000) * monster.level;
        const msg = [`击杀${monster.name}后，你提炼出一瓶高品质精血，服下后你的气血提升了${bodyExp}！！！`];
        AddBodyExp(uid, bodyExp);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 增加中量气血 */
export const addMediumExpHP = new RandomEvent({
    name: '战斗后增加中量修为',
    odds: 0.20,
    fnc: async (data) => {
        const { uid, monster } = data;
        const bodyExp = rand(200, 500) * monster.level;
        const msg = [`击杀${monster.name}后，你提炼出一瓶带有瑕疵的精血，服下后你的气血提升了${bodyExp}！`];
        AddBodyExp(uid, bodyExp);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得大量灵石 */
export const getLargeMoney = new RandomEvent({
    name: '战斗后获得大量灵石',
    odds: 0.10,
    fnc: async (data) => {
        const { uid, monster } = data;
        const money = rand(700, 1000) * monster.level;
        const msg = [`跟随濒死的${monster.name}，你发现了一条灵石矿脉，你获得了${money}灵石！！`];
        AddSpiritStoneToBackpack(uid, money);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得中量灵石 */
export const getMediumMoney = new RandomEvent({
    name: '战斗后获得中量灵石',
    odds: 0.20,
    fnc: async (data) => {
        const { uid, monster } = data;
        const money = rand(200, 500) * monster.level;
        const msg = [`击杀${monster.name}，你在旁边发现一个储物袋，你获得了${money}灵石！！`];
        AddSpiritStoneToBackpack(uid, money);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得远超等级的一件装备 */
export const getAheadEquipment = new RandomEvent({
    name: '战斗后获得远超等级的一件装备',
    odds: 0.10,
    fnc: async (data) => {
        const { uid, monster } = data;
        const equipment = (await GetRandItem('装备', 1, monster.level + 5))[0];
        const msg = [`跟随濒死的${monster.name}，你发现了一个隐蔽的山洞，在里面你找到了${equipment.name}！！`];
        AddItemToBackpack(uid, equipment, 1);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得不高于等级的一件装备 */
export const getRelateEquipment = new RandomEvent({
    name: '战斗后获得不高于等级的一件装备',
    odds: 0.30,
    fnc: async (data) => {
        const { uid, monster } = data;
        const equipment = (await GetRandItem('装备', 1, monster.level))[0];
        const msg = [`在${monster.name}旁边，你发现一件东西掉在地上，你获得了${equipment.name}！`];
        AddItemToBackpack(uid, equipment, 1);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得远超等级的一本功法 */
export const getAheadManual = new RandomEvent({
    name: '战斗后获得远超等级的一本功法',
    odds: 0.10,
    fnc: async (data) => {
        const { uid, monster } = data;
        const manual = (await GetRandItem('功法', 1, monster.level + 5))[0];
        const msg = [`跟随濒死的${monster.name}，你发现了一个隐蔽的山洞，在里面你找到了《${manual.name}》！！`];
        AddItemToBackpack(uid, manual, 1);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得不高于等级的一本功法 */
export const getRelateManual = new RandomEvent({
    name: '战斗后获得不高于等级的一件功法',
    odds: 0.30,
    fnc: async (data) => {
        const { uid, monster } = data;
        const manual = (await GetRandItem('功法', 1, monster.level))[0];
        const msg = [`在${monster.name}旁边，你发现一件东西掉在地上，你获得了《${manual.name}》！！`];
        AddItemToBackpack(uid, manual, 1);
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得攻击力永久提升 */
export const addMaxAttack = new RandomEvent({
    name: '战斗后获得攻击力永久提升',
    odds: 0.15,
    fnc: async (data) => {
        const { uid, monster } = data;
        const amount = rand(10, 100) * monster.level;
        const msg = [`在和${monster.name}战斗后，你灵光一闪，攻击力提升了${amount}！！`];
        AddPowerByEvent(uid, { attack: amount });
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得生命值永久提升const */
export const addMaxBlood = new RandomEvent({
    name: '战斗后获得生命值永久提升',
    odds: 0.15,
    fnc: async (data) => {
        const { uid, monster } = data;
        const amount = rand(50, 500) * monster.level;
        const msg = [`在和${monster.name}战斗后，你浑身气血涌动，你生命值提升了${amount}！！`];
        AddPowerByEvent(uid, { blood: amount });
        return new XiuxianMsg({ msg: msg });
    }
});

/** 获得防御力永久提升 */
export const addMaxDefense = new RandomEvent({
    name: '战斗后获得防御力永久提升',
    odds: 0.15,
    fnc: async (data) => {
        const { uid, monster } = data;
        const amount = rand(10, 100) * monster.level;
        const msg = [`在和${monster.name}战斗后，你灵光一闪，防御力提升了${amount}！！`];
        AddPowerByEvent(uid, { defense: amount });
        return new XiuxianMsg({ msg: msg });
    }
});

/** 无事发生 */
export const blank = new RandomEvent({
    name: '无事发生',
    odds: 1,
    fnc: async (data) => { return new XiuxianMsg({}); }
});