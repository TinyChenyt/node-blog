/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-30 17:27:15
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-30 17:29:46
 * @FilePath: \node-blog\models\Draft.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 草稿
const { mongoose } = require('../config/mongodb.js');

const DraftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
    img_url: {
        type: String,
    },
    createTime: {
        type: Date,
        default: Date.now
    },
})

const Draft = mongoose.model('Draft', DraftSchema)
module.exports = { Draft }