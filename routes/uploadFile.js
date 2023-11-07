/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 16:01:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 18:19:01
 * @FilePath: \node-blog\routes\uploadFile.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

let opt = require('../config/qiniu.js');
let qiniu = require('qiniu');

// 鉴权
let mac = new qiniu.auth.digest.Mac(opt.accessKey, opt.secretKey);

// 上传凭证
let putPolicy = new qiniu.rs.PutPolicy(opt.options);
// 设置token有效时间
const tokenExpireTime = 86400;
qiniu.conf.ACCESS_TOKEN_EXPIRE_TIME = tokenExpireTime;
let uploadToken = putPolicy.uploadToken(mac);

router.get('/upload', async (req, res, next) => {
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    if (uploadToken) {
        res.json({
            code: 200,
            token: uploadToken
        })
    }
})

router.get('/getImgUrl', async (req, res, next) => {
    let key = req.query.key || 'logo.png';
    var config = new qiniu.conf.Config();
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var privateBucketDomain = 'http://s34k4xd0u.hn-bkt.clouddn.com';
    var deadline = parseInt(Date.now() / 1000) + 3600; // 1小时过期
    var privateDownloadUrl = bucketManager.privateDownloadUrl(privateBucketDomain, key, deadline);
    res.json({
        code: 200,
        msg: '获取成功',
        data: privateDownloadUrl
    })
})

router.delete('/deleteImg', async (req, res) => {
    let keyList = req.body || []
    // console.log(keyList,req.body,"this is delete key");
    let deleteOperations = keyList.map(key => {
        return qiniu.rs.deleteOp(opt.options.scope, key)
    })
    let flag = false
    var config = new qiniu.conf.Config();
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    bucketManager.batch(deleteOperations, (err, respBody, respInfo) => {
        if (err) {
            console.log(err);
            flag = false
        } else {
            if (parseInt(respInfo.statusCode / 100) == 2) {
                respBody.forEach(function (item) {
                    if (item.code === 200) {
                        console.log(item.code + '\tsuccess');
                        flag = true
                    } else {
                        console.log(item.code + '\t' + item.data.error);
                        flag = false
                    }
                });
            } else {
                console.log(respInfo.deleteusCode);
                console.log(respBody);
            }
        }
        if (flag) {
            res.json({
                code: 200,
                msg: '删除成功',
                data: respBody
            })
        } else {
            res.json({
                code: 400,
                msg: '删除失败',
                data: respBody
            })
        }
    })
})

module.exports = router;