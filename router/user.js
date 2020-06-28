const router = require('koa-router')()
const jwt = require('jsonwebtoken')
let qs = require('qs')
    // router.prefix('/comic_admin_users') 生成路由前缀
router.get('/', async ctx => {
    ctx.body = "111111"
        // try {
        //     //jwt.verify方法验证token是否有效
        //     jwt.verify(token, "admin", {
        //         complete: true
        //     });
        //     console.log(11);
        // } catch (err) {
        //     console.log(err, "err");
        //     //token过期 生成新的token
        //     // const newToken = getToken(user);
        //     // //将新token放入Authorization中返回给前端
        //     // ctx.res.setHeader('Authorization', newToken);
        // }
        // verToken.verToken(token).then(res => {
        //     console.log(res);

    // })
})
module.exports = router.routes();