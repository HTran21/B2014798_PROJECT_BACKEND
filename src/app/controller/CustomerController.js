const KhachHang = require('../models/KhachHang');
const NhanVien = require("../models/NhanVien");
const DonHang = require("../models/DonHang");
class CustomerController {
    async listUser(req, res, next) {
        try {
            const user = await KhachHang.find();
            return res.send(user);
        }
        catch (error) {
            console.log('Lỗi khi thêm lấy danh sách user', error);
            res.status(500).json({ message: 'Lỗi khi thêm lấy danh sách user' })
        }
    }
    async listStaff(req, res, next) {
        try {
            const staff = await NhanVien.find();
            return res.send(staff);
        }
        catch (error) {
            console.log('Lỗi khi thêm lấy danh sách staff', error);
            res.status(500).json({ message: 'Lỗi khi thêm lấy danh sách staff' })
        }
    }

    async dashBoard(req, res, next) {
        try {
            const user = await KhachHang.countDocuments();
            const staff = await NhanVien.countDocuments();
            const order = await DonHang.find({ TrangthaiDH: { $ne: 'D' } });
            const orderPending = await DonHang.find({ TrangthaiDH: 'W' });
            return res.json({ user, staff, order, orderPending });
        }
        catch (error) {
            console.log('Lỗi khi thêm lấy dữ liệu', error);
            res.status(500).json({ message: 'Lỗi khi thêm lấy dữ liệu' })
        }
    }
}

module.exports = new CustomerController;