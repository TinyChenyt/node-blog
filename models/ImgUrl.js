/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-27 09:34:31
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:20:44
 * @FilePath: \node-blog\models\Imgurl.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 文章图片地址
const { mongoose } = require('../config/mongodb.js');

const ImgUrlSchema = new mongoose.Schema({
    img_url: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    article_id: {
        type: String,
    },
    user_id: {
        type: String,
    }
})

const ImgUrl = mongoose.model('ImgUrl', ImgUrlSchema);

module.exports = { ImgUrl }