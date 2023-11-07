/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:29:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 17:31:17
 * @FilePath: \node-blog\routes\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:29:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-31 11:35:39
 * @FilePath: \node-blog\routes\article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
// const { ArticleImg } = require('../models/ArticleImg')
const { Article } = require('../models/Article');
// const ArticleImg = new ArticleImg()
// 获取文章列表
router.get('/list', async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const article = await Article.find().skip((page - 1) * pageSize).limit(pageSize)
    res.send({
        code: 200,
        msg: '获取成功',
        data: article
    })
})

// 文章分类
router.get('/query', async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const keyword = req.query.keyword;
    let skipCount = (page - 1) * pageSize;
    const article = await Article.find({
        keyword: {
            $regex: keyword,
            $options: 'i'
        }
    }).sort({ $natural: 1 }).skip(skipCount).limit(pageSize).exec().then((data) => {
        return data
    }).catch((err) => {
        console.log(err)
    })
    // res.send({
    //     code: 200,
    //     msg: '获取成功',
    //     data: article
    // })
    let hasArticles = article.filter((item) => {
        let keywordArr = item.keyword.split(',');
        let flag = false;
        keywordArr.forEach(item => {
            if (item.toLocaleLowerCase() === req.query.keyword.toLocaleLowerCase()) {
                flag = true
            }
        })
        return flag;
    })
    res.send({
        code: 200,
        msg: `获取成功${req.query.keyword}`,
        data: hasArticles
    })
})
// 添加文章
router.post('/add', async (req, res, next) => {
    if(req.body.title === '') {
        req.body.title = '无标题'
    }
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        html: req.body.html,
        keyword: req.body.keyword,
        author_id: req.body.author_id,
        author_name: req.body.author_name,
        abstract: req.body.abstract,
        title_img_url: req.body.title_img_url || '',
    })
    const result = await article.save()
    res.send({
        code: 200,
        msg: '添加成功',
        data: result
    })
})

// 获取文章详情
router.get('/detail', async (req, res, next) => {
    const article = await Article.findOne({
        _id: req.query.article_id
    })
    res.send({
        code: 200,
        msg: '获取成功',
        data: article
    })
})

// 获取当前用户的文章
router.get('/myArticle', async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const article = await Article.find({
        author_id: req.query.user_id
    }).skip((page - 1) * pageSize).limit(pageSize)
    // const article = await Article.find({
    //     author_id: req.query.user_id
    // })
    res.send({
        code: 200,
        msg: '获取成功',
        data: article
    })
})

// 删除文章
router.delete('/delete', async (req, res, next) => {
    const deleteArticle = await Article.findOne({
        _id: req.body.article_id
    })
    if (deleteArticle.author_id !== req.body.author_id) {
        res.send({
            code: 400,
            msg: '删除失败,没有删除该文章的权限',
            data: deleteArticle
        })
    } else {
        const result = await Article.deleteOne({
            _id: req.body.article_id
        })
        res.send({
            code: 200,
            msg: '删除成功',
            data: result
        })
    }
})

// 修改文章
router.put('/update', async (req, res, next) => {
    const updateArticle = await Article.findOne({
        _id: req.body._id
    })
    if (updateArticle.author_id !== req.body.author_id) {
        res.send({
            code: 400,
            msg: '修改失败,没有修改该文章的权限',
            data: updateArticle
        })
    } else {
        const result = await Article.updateOne({
            _id: req.body._id
        }, {
            title: req.body.title,
            content: req.body.content,
            html: req.body.html,
            keyword: req.body.keyword,
            author_id: req.body.author_id,
            author_name: req.body.author_name,
            abstract: req.body.abstract,
            title_img_url: req.body.title_img_url || ''
        })
        res.send({
            code: 200,
            msg: '修改成功',
            data: result
        })
    }
})

// 文章查询
router.get('/search', async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
    const keyword = req.query.keyword;
    // { $or[{ '查询的字段名': { $regex: 前端传递的参数, $option: 'i' } }] } $regex：正则匹配 $option: 'i'：不区分大小写
    const query = { $or: [{ title: { $regex: keyword, $options: 'i' } }, { abstract: { $regex: keyword, $options: 'i' } }, { keyword: { $regex: keyword } }] };
    const articles = await Article.find(query).skip((page - 1) * pageSize).limit(pageSize)
    res.send({
        code: 200,
        msg: '获取成功',
        data: articles
    })
})

module.exports = router;