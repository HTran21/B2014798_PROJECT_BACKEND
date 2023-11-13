const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonHang = new Schema({
    MSKH: [{ type: mongoose.Types.ObjectId, ref: "KhachHang" }],
    MSNV: [{ type: mongoose.Types.ObjectId, ref: "NhanVien" }],
    NgayDH: { type: Date, default: Date.now },
    NgayGH: { type: Date },
    TrangthaiDH: { type: String, maxLength: 255 },
}, {
    timestamps: true,
})

module.exports = mongoose.model('DonHang', DonHang);