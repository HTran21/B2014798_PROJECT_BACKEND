const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HangHoa = new Schema({
    TenHH: { type: String, maxLength: 255 },
    MoTaHH: { type: String, maxLength: 255 },
    Gia: { type: Number, maxLength: 255 },
    SoLuongHang: { type: Number, maxLength: 255 },
    GhiChu: { type: String, maxLength: 255 },
    HinhHH: { type: String, maxLength: 255 }
})

module.exports = mongoose.model('HangHoa', HangHoa);