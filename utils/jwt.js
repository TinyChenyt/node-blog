/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 09:48:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:23:59
 * @FilePath: \node-blog\utils\jwt.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// token验证
const jwt = require("jsonwebtoken");
// const expressJwt = require("express-jwt");
const expressJwt = require("express-jwt");
const { secretKey } = require("./salt")

// 创建token
const createToken = payload =>
    jwt.sign(payload, secretKey, {
        expiresIn: 60 * 60 * 240
    });
// 拦截请求验证token
const ExpressJwt = expressJwt({
    secret: secretKey,
    algorithms: ["HS256"],
    credentialsRequired: true
}).unless({
    path: [/^\/user\//]
});

module.exports = {
    createToken,
    ExpressJwt
}