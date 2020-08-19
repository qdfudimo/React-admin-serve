const mongoose = require("mongoose")
    // 定义数据库名
const DB_NAME = 'adminJs'
    // 定义数据库地址
const DB_URL = '47.103.218.151:27017'
module.exports = new Promise((resolve, reject) => {
    /** 连接数据库
     * root是adminJs
     * root:root 是账户密码
     */
    mongoose.connect(`mongodb://root:root@${DB_URL}/${DB_NAME}`, {
            useNewUrlParser: true
        })
        // 监听连接状态
    mongoose.connection.on('open', err => {
        if (!err) {
            resolve()
            console.log('数据库连接成功')
        } else {
            console.log(err)
            reject(err)
        }
    })
})
module.exports = mongoose;
// db.createUser({user: "root",pwd: "root",roles: [ { role: "readWrite", db: "adminJs" }] })