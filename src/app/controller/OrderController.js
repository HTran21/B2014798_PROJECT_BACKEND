const DonHang = require('../models/DonHang');
const ChiTietDonHang = require('../models/ChiTietDatHang');
const GioHang = require('../models/GioHang');
const HangHoa = require('../models/HangHoa');
const ChiTietDatHang = require('../models/ChiTietDatHang');
class OrderController {
    async addOrder(req, res, next) {
        try {
            const { MSKH, TongTien, ChiTietGioHang } = req.body;
            const TrangthaiDH = "W";

            // console.log("Chi tiet don hang", ChiTietGioHang);
            // console.log("Tong tien", TongTien._value);
            // Tao don hang
            const donHang = await DonHang.create({ MSKH, TrangthaiDH });

            // Tao chi tiet don hang
            for (const chiTiet of ChiTietGioHang) {
                const hangHoa = await HangHoa.findById(chiTiet.MSHH);

                if (!hangHoa) {
                    return res.json({ error: 'Không tìm thấy sản phẩm' });
                }
                else {
                    hangHoa.SoLuongHang -= chiTiet.SoLuong;
                    await hangHoa.save();
                    await ChiTietDonHang.create({
                        MSHH: chiTiet.MSHH,
                        SoLuong: chiTiet.SoLuong,
                        Size: chiTiet.Size,
                        GiaDatHang: TongTien._value,
                        SoDonDH: donHang._id,
                    });
                }
            }
            await GioHang.deleteMany({ MSKH });

            res.json({ message: 'Đặt hàng thành công' });
        }
        catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            res.status(500).json({ error: 'Lỗi khi đặt hàng' });
        }
    }

    // async listOrder(req, res, next) {
    //     const MSKH = req.params.id;

    //     const existingOrder = await DonHang.find({ MSKH: MSKH })
    //     if (existingOrder) {
    //         console.log("Don Hang", existingOrder);
    //         const SoDonDH = existingOrder._id;
    //         console.log("SoDonDH", SoDonDH)
    //         const existingDetailOrder = await ChiTietDonHang.find({ SoDonDH: SoDonDH }).populate('MSHH').populate('SoDonDH');
    //         if (existingDetailOrder) {
    //             res.send(existingDetailOrder);
    //             // console.log("Chi tiet don hang", existingDetailOrder);
    //         }
    //         else {
    //             console.log("Loi khong tim thay don hang");
    //         }
    //     }
    // }
    async listOrder(req, res, next) {
        try {
            const MSKH = req.params.id;
            const CustomerOrder = await DonHang.find({ MSKH: MSKH, TrangthaiDH: { $ne: 'D' } });

            const result = CustomerOrder.map(async (item) => {
                let detail = await ChiTietDatHang.find({ SoDonDH: item._id }).populate("MSHH")
                return {
                    ...item,
                    ChiTietDatHang: detail,
                }
            })
            const data = await Promise.all(result);
            return res.send(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const idOrder = req.params.id;
            console.log("ID Don hang", idOrder);
            const order = await DonHang.findById(idOrder);

            if (!order) {
                return res.json({ error: 'Không tìm thấy đơn hàng' });
            }

            // Cập nhật trạng thái của đơn hàng thành 'D'
            order.TrangthaiDH = 'D';
            await order.save();

            res.json({ message: 'Đã xóa đơn hàng thành công' });
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            res.json({ error: 'Lỗi khi xóa đơn hàng' });
        }
    }
}

module.exports = new OrderController;