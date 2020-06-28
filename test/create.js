var User = require("../model/user.js");

/** * 插入 */
function insert() {
    var user = new User({
        userName: 'admin111', //用户账号 
        passWord: 'admin', //密码
        date: new Date(), //最近登录时间 });
    });
    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}
insert();