const router = require('koa-router')()
let qs = require('qs')
    // router.prefix('/comic_admin_users') 生成路由前缀
router.post('/', async ctx => {
    console.log(ctx.request.body, 999);
    ctx.body = "111111"
})
module.exports = router.routes();