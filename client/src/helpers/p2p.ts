/**
 * Created by FangJian on 2018/1/23.
 */

/**
 * 把parse的then/fail风格promise转为then/catche风格的promise
 * @param  {ParsePromise} p
 * @return {Promise}
 * 代码来自https://github.com/ParsePlatform/Parse-SDK-JS/issues/183
 */
export function p2p<T>(p:Parse.IPromise<T>):Promise<T>{
    return new Promise((resolve, reject) => {
        return p.then(resolve, reject);
    });
}