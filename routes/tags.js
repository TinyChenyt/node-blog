/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 17:54:16
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 11:30:46
 * @FilePath: \node-blog\routes\tags.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

const { Tags } = require('../models/Tags')

// 获取标签列表
router.get('/list', async (req, res, next) => {
    const tags = await Tags.find()
    res.send({
        code: 200,
        msg: '获取成功',
        data: tags
    })
})
// 添加标签
router.post('/add', async (req, res, next) => {
    const { name, logo_url } = req.body
    const tagsFind = await Tags.find()
    let flag = false;
    tagsFind.forEach(tag => {
        if (tag.name === name) {
            flag = true;
            return;
        }
    })
    if (flag) {
        res.send({
            code: 400,
            msg: '标签已存在'
        })

    } else {
        const tags = new Tags({
            name,
            logo_url
        })
        const result = await tags.save()
        res.send({
            code: 200,
            msg: '添加成功',
            data: result
        })
    }
});

module.exports = router;