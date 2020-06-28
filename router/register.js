const router = require('koa-router')();
// router.prefix('/comic_admin_users') 生成路由前缀
const usersModel = require('../model/user.js');
router.get('/', async ctx => {
    ctx.body = "21313"
    //findOne 查找的是一个对象 查不到是null
    //find查找的是一个数组集合 查不到是[]
})
// StuSchema.create(doc,function(){})
module.exports = router.routes();