const koa = require('koa')
const router = require('koa-router')()
    // const db = require("./db/index")
const bodyParser = require('koa-bodyparser')
const Koa_Logger = require("koa-logger");
const logger = Koa_Logger();
const multer = require('koa-multer')
var cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const app = new koa()
app.use(bodyParser())
app.use(logger);
const defined = require("./util/secret")
app.use(cors())
const login = require("./router/login")
const user = require("./router/user")
const register = require("./router/register")
const captcha = require("./router/captcha")
const upload = require("./router/upload")
const verToken = require("./util/token_verify")
const session = require('koa-session');
const session_config = require('./config/session');
app.keys = ['some secret hurr'];
app.use(session(session_config, app));
//文件上传
//配置
var storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/')
        },
        //修改文件名称
        filename: function(req, file, cb) {
            var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
var uploads = multer({ storage: storage });
app.use(require('koa-static')(__dirname + '/public'))
app.use(async(ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
        const data = ctx.header.authorization.split(" ");
        if (data.length != 2) {
            await next();
        } else {
            const token = data[1]
            verToken.verToken(token).then(res => {
                ctx.state = {
                    res
                };
            })
            await next();
            //token过期 生成新的token 将新token放入Authorization中返回给前端
        }
    } else {
        await next();
    }
})

app.use(async(ctx, next) => {
    return next().catch((err) => {
        if (401 == err.status) {
            /**
             * TokenExpiredError 致错原因：token过期 
             * JsonWebTokenError 致错原因：token格式错误、token未携带签名、token签名无效、token携带无效aud、token携带无效iss、token携带无效jti、token携带无效sub
             * NotBeforeError 致错原因：token仍未生效
             * ctx.res.setHeader('Authorization', newToken);
             */
            if (err.originalError.name) {
                switch (err.originalError.name) {
                    case "TokenExpiredError":
                        ctx.status = 401;
                        ctx.body = {
                            status: 401,
                            msg: 'token过期，请重新登录'
                        }
                        break;
                    case "JsonWebTokenError":
                        ctx.status = 401;
                        ctx.body = {
                            status: 401,
                            msg: 'token格式无效，请重新登录'
                        }
                        break;
                    case "NotBeforeError":
                        ctx.status = 401;
                        ctx.body = {
                            status: 401,
                            msg: 'token未生效，请重新登录'
                        }
                        break;
                }
            } else {
                ctx.status = 401;
                ctx.body = {
                    status: 401,
                    msg: '登录过期，请重新登录'
                }
            }
        } else {
            throw err;
        }
    });
});
app.use(jwtKoa({
    secret: defined.secret
}).unless({
    path: [/^\/login/, /^\/register/, /^\/captcha/]
}));
// router.prefix('/api')
router.use("/login", login)
router.use("/user", user)
router.use("/captcha", captcha)
router.use("/register", register)
router.use("/upload", uploads.single('file'), upload)
app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods());
/* 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配
router.routes()之后,目的在于：根据ctx.status 设置response 响应头
*/
// app.use(router.routes()).use(router.allowedMethods())
//监听3000
app.listen(4000, () => {
    console.log('starting at port 4000');
})