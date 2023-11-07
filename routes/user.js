/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-26 14:03:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-01 15:42:57
 * @FilePath: \node-blog\routes\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var express = require('express');
var router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const { createToken } = require('../utils/jwt.js')

// 用户注册
router.post('/register', async (req, res, next) => {
  const users = await User.find()
  let flag = false;
  users.forEach(user => {
    if (user.username === req.body.username) {
      flag = true;
      return;
    }
  })
  if (flag) {
    res.send({
      code: 400,
      msg: '用户名已存在'
    })
  } else {
    const user = await User.create({
      username: req.body.username,
      password: req.body.password
    })
    res.send({
      code: 200,
      msg: '注册成功',
      data: user
    })
  }
});

// 用户登录
router.post('/login', async (req, res, next) => {
  let response = {
    "username": req.body.username,
    "password": req.body.password
  };
  res.cookie('userInfo', response);
  const users = await User.find()
  let resUser = new User()
  let flag = false;
  users.forEach(user => {
    if (user.username === req.body.username && bcrypt.compareSync(req.body.password, user.password)) {
      flag = true;
      resUser = user;
    }
  })
  if (flag) {
    const tokenStr = createToken({ ...resUser[0] })
    res.send({
      code: 200,
      msg: '登录成功',
      token: 'Bearer ' + tokenStr,
      data: {
        id: resUser._id
      }
    })
  } else {
    res.send({
      code: 400,
      msg: '用户名或密码错误'
    })
  }
})

// 获取用户信息
router.get('/info', async (req, res, next) => {
  const user = await User.findOne({
    _id: req.query.user_id
  })
  res.send({
    code: 200,
    data: user
  })
})

// 获取用户列表
router.get('/list', async (req, res, next) => {
  const user = await User.find()
  res.send({
    code: 200,
    msg: '获取成功',
    data: user
  })
})

// 修改用户信息
router.put('/update', async (req, res, next) => {
  const user = await User.findOne({
    _id: req.body._id
  })
  user.username = req.body.username
  user.sex = req.body.sex
  user.imgUrl = req.body.imgUrl
  user.imgKey = req.body.imgKey
  const result = await user.save()
  res.send({
    code: 200,
    msg: '修改成功',
    data: result
  })
})

module.exports = router;