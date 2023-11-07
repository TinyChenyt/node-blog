/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-31 11:35:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 09:13:51
 * @FilePath: \node-blog\routes\articleImg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();

const { ArticleImg } = require('../models/ArticleImg')
// const ArticleImg = new ArticleImg()
// 添加对应文章的url
router.post('/addImg', async (req, res, next) => {
    // const articleImg = new ArticleImg()
    const articleImg = new ArticleImg({
        article_id: req.body.article_id,
        img_key: req.body.img_key,
    })
    const result = await articleImg.save()
    res.send({
        code: 200,
        msg: '添加成功',
        data: result
    })
})

// 删除对应文章的url
router.delete('/deleteImg', async (req, res, next) => {
    const deleteArticle = await ArticleImg.findOne({
        article_id: req.body.article_id
    })
    const result = await ArticleImg.deleteOne({
        article_id: req.body.article_id
    })
    res.send({
        code: 200,
        msg: '删除成功',
        data: deleteArticle
    })
})

// 获取对应文章的url
router.get('/getImg', async (req, res, next) => {
    const getArticle = await ArticleImg.findOne({
        article_id: req.query.article_id
    })
    res.send({
        code: 200,
        msg: '获取成功',
        data: getArticle
    })
})

// 修改对应文章的url
router.put('/updateImg', async (req, res, next) => {
    const updateArticle = await ArticleImg.findOne({
        article_id: req.body.article_id
    })
    const result = await ArticleImg.updateOne({
        article_id: req.body.article_id
    }, {
        img_key: req.body.img_key
    })
    res.send({
        code: 200,
        msg: '修改成功',
        data: result
    })
})

module.exports = router;