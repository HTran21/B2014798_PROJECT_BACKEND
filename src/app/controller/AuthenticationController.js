const KhachHang = require('../models/KhachHang');
const { multipleMongoseToObject } = require('../utils/mongose');

class Authentication {
    createUser(req, res, next) {
        return res.send("Tạo người dùng")
    }

    login(req, res, next) {
        return res.send("Đăng nhập")
    }

    editProfile(req, res, next) {
        return res.send("Chinh sua thong tin nguoi dung")
    }

    logout(req, res, next) {
        return res.send("Dang xuat")
    }


    inforUser(req, res, next) {
        // const id = req.params.id;
        KhachHang.find()
            // .then(khachhang => res.send({ khachhang: multipleMongoseToObject(khachhang) })
            // )
            .then(khachhang => res.send(khachhang)
            )

            .catch((err) => {
                console.error('Lỗi khi tìm kiếm khách hàng:', err);
            });
    }
}

module.exports = new Authentication;