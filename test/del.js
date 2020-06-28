const User = require("../model/user.js");
User.remove({userName: "admin"}, (err) => {  //删除所有匹配
    if (!err) {
        console.log("删除成功！！")
    } else {
        throw err
    }
})