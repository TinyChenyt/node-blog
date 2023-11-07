/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 13:50:05
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-10-31 11:39:54
 * @FilePath: \node-blog\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express')
const app = express()
const mongodb = require('./config/mongodb')
// 解决跨域的库
const cors = require('cors')

let { ExpressJwt } = require('./utils/jwt')

let user = require('./routes/user');
let tags = require('./routes/tags');
let articles = require('./routes/article');
let uploadFile = require('./routes/uploadFile');
let articleImg = require('./routes/articleImg');

app.use(cors())
// json解析
app.use(express.json())
app.use(ExpressJwt);

// 路由
app.use('/user', user);
app.use('/tags', tags);
app.use('/articles', articles);
app.use('/uploadFile', uploadFile);
app.use('/articleImg', articleImg);

mongodb.connectDB();

// 配置一个get请求路径做测试
// http://localhost:5002/list


// 设置服务的监听端口
app.listen(5002)
