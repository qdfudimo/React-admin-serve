const router = require('koa-router')()
const multer = require('koa-multer')
    //文件上传 配置
var storage = multer.diskStorage({
        //文件保存路径
        destination: function(req, file, cb) {
            cb(null, 'public/uploads/')
        },
        //修改文件名称
        filename: function(req, file, cb) {
            console.log('====================================');
            console.log(file, 6666);
            console.log('====================================');
            var fileFormat = (file.originalname).split("."); //以点分割成数组，数组的最后一项就是后缀名
            cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        }
    })
    //加载配置
var uploads = multer({ storage: storage });
// router.prefix('/comic_admin_users') 生成路由前缀
router.post('/', uploads.single('file'), async ctx => {
    console.log(ctx.req.file, 999);
    let { filename } = ctx.req.file
    ctx.body = {
        status: 200,
        data: {
            path: `/uploads/${filename}`,
            filename
        }
    }
})
module.exports = router.routes();