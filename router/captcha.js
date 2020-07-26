const router = require('koa-router')()
const svgCaptcha = require('svg-captcha');
router.get('/', async ctx => {
    //createMathExpr 算术
    const captcha = svgCaptcha.create({
        // 翻转颜色 
        inverse: false,
        // 字体大小 
        fontSize: 36,
        // 噪声线条数 
        noise: 2,
        // 宽度 
        width: 80,
        // 高度 
        height: 30,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
        size: 4, // 验证码长度
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966',
    });
    ctx.session.captcha = captcha.text.toLowerCase();
    ctx.response.type = "image/svg+xml";
    ctx.body = captcha.data;
})
module.exports = router.routes();