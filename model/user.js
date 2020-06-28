const mongoose = require("mongoose")
let Schema = mongoose.Schema;
let userSchema = new Schema({
    // 账号
    userName: {
        type: String,
        required: true, //限制学号必填信息
        unique: true //限制学号唯一性
    },
    // 密码
    passWord: {
        type: String,
        required: true,
    },
    // 日期
    date: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: Number,
        required: true
    }
})

// 创建模型对象
// 第一个参数与集合对应，第二个对象指定约束对象实例
let usersModel = mongoose.model('users', userSchema)
module.exports = usersModel