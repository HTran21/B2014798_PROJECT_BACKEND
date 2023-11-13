const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GioHang = new Schema({
    MSKH: [{ type: mongoose.Types.ObjectId, ref: "KhachHang" }],
    MSHH: [{ type: mongoose.Types.ObjectId, ref: "HangHoa" }],
    SoLuong: { type: Number, default: 0 },
    Size: { type: String, maxLength: 255 },
})

module.exports = mongoose.model('GioHang', GioHang);