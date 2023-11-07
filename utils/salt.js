/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 09:50:15
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 09:52:49
 * @FilePath: \node-blog\utils\salt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 密钥文件
const crypto = require('crypto');
module.exports = {
    MD5_SUFFIX: "tiny",
    md5: pwd => {
        let md5 = crypto.createHash("md5");
        return md5.update(pwd).digest("hex");
    },
    secretKey: "token"
}