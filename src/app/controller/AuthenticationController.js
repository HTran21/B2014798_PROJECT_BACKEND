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
}

module.exports = new Authentication;