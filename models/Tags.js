/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 17:49:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-02 11:24:18
 * @FilePath: \node-blog\models\Tags.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 标签类
const { mongoose } = require('../config/mongodb.js');

const TagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
    }
})

const Tags = mongoose.model('Tags',TagsSchema)
module.exports = { Tags }