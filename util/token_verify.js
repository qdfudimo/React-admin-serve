const jwt = require('jsonwebtoken')
const define = require("./secret")
exports.setToken = function(data) {
    return new Promise((resolve, reject) => {
        let token = jwt.sign({ userName: data.userName, passWord: data.passWord }, define.secret, { expiresIn: "1h" })
        resolve(token)
    }).catch(err => {
        console.log("setToken err", err);
    })
}
exports.verToken = function(token) {
    return new Promise((resolve, reject) => {
        let data = jwt.verify(token, define.secret, {
            complete: true
        });
        resolve(data)
    }).catch(err => {
        console.log("verToken err", err);
    })
}