const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChiTietDatHang = new Schema({
    SoDonDH: [{ type: mongoose.Types.ObjectId, ref: "DonHang" }],
    MSHH: [{ type: mongoose.Types.ObjectId, ref: "HangHoa" }],
    SoLuong: { type: Number, default: 0 },
    Size: { type: String, maxLength: 255 },
    GiaDatHang: { type: Number, default: 0 },
    GiamGia: { type: Number, default: 0 },
})

module.exports = mongoose.model('ChiTietDatHang', ChiTietDatHang);