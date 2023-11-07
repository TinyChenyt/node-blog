/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:22:00
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 09:20:46
 * @FilePath: \node-blog\models\Article.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 文章类
const { mongoose } = require('../config/mongodb.js');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
        default: '无标题'
    },
    author_id: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    title_img_url: {
        type: String,
        // required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
})

const Article = mongoose.model('Article', ArticleSchema)
module.exports = { Article }