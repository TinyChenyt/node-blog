/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 13:52:04
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 16:19:35
 * @FilePath: \node-blog\config\mongodb.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 连接数据库
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/blog_db')
exports.mongoose = mongoose
exports.connectDB = async() => {
    await mongoose.connect('mongodb://localhost:27017/blog_db').then(() => {
        console.log('数据库连接成功')
    })

    return mongoose
}
