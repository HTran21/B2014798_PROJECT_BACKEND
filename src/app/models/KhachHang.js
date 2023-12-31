const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KhachHang = new Schema({
    HoTenKH: { type: String, maxLength: 255 },
    Password: { type: String, maxLength: 255 },
    DiaChi: { type: String, maxLength: 255 },
    SoDienThoai: { type: String, maxLength: 255 },
    AnhDaiDien: { type: String, maxLength: 255 },
})

module.exports = mongoose.model('KhachHang', KhachHang);