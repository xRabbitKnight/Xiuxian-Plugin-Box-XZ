import { __PATH } from '../../apps/Xiuxian/Xiuxian.js';
import { GetInfo, SetInfo } from './InfoCache.js';

const redisKey = "xiuxian:ActionInfo";
const PATH = __PATH.action;

/******* 
 * @description: 从cache里获取玩家的行为信息
 * @param {string} _uid 玩家id, plugin参数e.user_id
 * @return {Promise<JSON>} 返回的ActionInfo JSON对象
 */
export async function GetActionInfo(_uid) {
    return GetInfo(_uid, redisKey, `${PATH}/${_uid}.json`);
}

/******* 
 * @description: 更新玩家行为信息, 并写入数据
 * @param {string} _uid 玩家id, plugin参数e.user_id
 * @param {JSON} _actionInfo 玩家面板信息, 注意是JSON对象
 * @return 无返回值
 */
export async function SetActionInfo(_uid, _actionInfo) {
    SetInfo(_uid, _actionInfo, redisKey, `${PATH}/${_uid}.json`);
}

export async function GetPlayerRegion(_uid){
    const actionInfo = await GetActionInfo(_uid);
    return actionInfo?.region;
}