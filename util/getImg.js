const request = require("request")
const cheerio = require("cheerio")
const path = require("path")
let qs = require('qs')
    // async function requestPage() {
    //     request("https://mp.weixin.qq.com/s?__biz=MzAxMzMxNDIyOA%3D%3D&mid=2655544196&idx=1&sn=0169f8be8142ffa2b12cf86fcd1f1848&chksm=8018b25fb76f3b49d69a99b3e8c69f6f42a07c2ae25cbf72997dcb391f56e90d27736c4f3ec3&mpshare=1&scene=1&srcid=1018kPbAk22kiJ3EqAq3xAEn&key=c3acc508db720376632ac79373d4665ed44a3831dce1f4bf599f5a99850ebfc7895f1fab40002a668141f5cf4f21cb6d&ascene=0&uin=MzM1ODYzMDU1&devicetype=iMac+MacBookAir7%2C1+OSX+OSX+10.11.1+build%2815B42%29&version=11020201&pass_ticket=o2l9%2Bpzw0K3doarg878ocLBVISFOSQ4TrKuUVNmJZPPoKa", async(err, res, body) => {
    //         let $ = cheerio.load(body);
    //         // console.log($);
    //         let title = $("#js_article .rich_media_inner .rich_media_content>p").text()
    //         console.log(title);
    //     });
    // }
    // requestPage()
async function requestPage() {
    request("https://cd.jd.com/promotion/v2?callback=jQuery9913530&skuId=100010343850&area=12_904_3379_0&shopId=1000300901&venderId=1000300901&cat=670%2C12800%2C12801&isCanUseDQ=1&isCanUseJQ=1&platform=0&orgType=2&jdPrice=2099.00&appid=1&_=1595433156713", async(err, res, body) => {
        // console.log(qs.parse(body), 1111);
        console.log(body);
    });
}
requestPage()