const User = require("../model/user.js");

function update() {
    var wherestr = {
        'userName': 'Tom'
    };
    var updatestr = {
        'passWord': 'zzzz'
    };
    User.update(wherestr, updatestr, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    })
}
update();