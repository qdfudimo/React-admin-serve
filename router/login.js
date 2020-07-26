const router = require('koa-router')();
// router.prefix('/comic_admin_users') 生成路由前缀
const usersModel = require('../model/user.js');
const setToken = require("../util/token_verify")
let qs = require('qs')
router.post('/', async ctx => {
    const { userName, passWord, captcha } = ctx.request.body;
    if (!(ctx.session && ctx.session.captcha == captcha)) {
        ctx.body = {
            status: 0,
            msg: "验证码错误",
            data: []
        }
        return
    }
    // console.log(qs.stringify(ctx.request.body)); //userName=zs
    const res = await usersModel.findOne({ userName })
        //findOne 查找的是一个对象 查不到是null
        //find查找的是一个数组集合 查不到是[]
    if (res) {
        if (res.passWord == passWord) {
            const { userName, passWord } = ctx.request.body;
            setToken.setToken({ userName, passWord }).then(data => {
                if (data) {
                    ctx.body = {
                        status: 200,
                        msg: "登陆成功",
                        token: data
                    }
                } else {
                    ctx.body = {
                        status: 0,
                        msg: "token生成失败",
                        token: data
                    }
                }

            })
        } else {
            ctx.body = {
                status: 0,
                msg: "密码错误"
            }
        }

    } else {
        ctx.body = {
            status: 0,
            msg: "登陆失败,重新检查用户名",
            data: []
        }
    }
})
module.exports = router.routes();