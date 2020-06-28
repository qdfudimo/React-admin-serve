const User = require("../model/user.js");
//也可以查找指定内容，例如{"age":"15"}
User.find({}, function (err, doc) {
    if (err) {
        console.log(err)
        return
    }
    console.log(doc)
})