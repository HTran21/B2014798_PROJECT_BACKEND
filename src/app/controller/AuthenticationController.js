const KhachHang = require('../models/KhachHang');
const NhanVien = require('../models/NhanVien')
const { multipleMongoseToObject } = require('../utils/mongose');
const userServices = require('../../services/userService');
const multer = require('multer');
const storage = require('../../services/uploadImage');

class Authentication {
    async createUser(req, res, next) {

        const upload = multer({ storage: storage }).single("avatar");

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Lỗi tải lên tệp' });
            }
            else if (err) {
                return res.status(500).json({ error: 'Lỗi tải lên tệp' });
            }
            else {
                try {
                    const HoTenKH = req.body.username;
                    const Password = req.body.password;
                    const SoDienThoai = req.body.phone;
                    const DiaChi = req.body.address;
                    const hashedPassword = await userServices.hashPassword(Password);

                    const AnhDaiDien = req.file.originalname;

                    const existingUser = await NhanVien.findOne({ SoDienThoai });

                    if (existingUser) {
                        // return res.status(400).json({ error: "Người dùng đã tồn tại" })
                        return res.json({ error: "Người dùng đã tồn tại" })
                    }
                    else {

                        const newKhachHang = new NhanVien({
                            HoTenKH,
                            Password: hashedPassword,
                            DiaChi,
                            SoDienThoai,
                            AnhDaiDien,
                        })

                        await newKhachHang.save();

                        return res.json({ message: 'Đăng ký người dùng thành công', data: req.body });
                    }

                }
                catch (error) {
                    console.log('Lỗi khi đăng ký người dùng', error);
                    res.status(500).json({ message: 'Lôi khi đăng ký người dùng' })
                }


            }
        })



    }

    async createStaff(req, res, next) {

        const upload = multer({ storage: storage }).single("avatar");

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Lỗi tải lên tệp' });
            }
            else if (err) {
                return res.status(500).json({ error: 'Lỗi tải lên tệp' });
            }
            else {
                try {
                    const HoTenKH = req.body.username;
                    const Password = req.body.password;
                    const SoDienThoai = req.body.phone;
                    const ChucVu = req.body.position;
                    const DiaChi = req.body.address;
                    const hashedPassword = await userServices.hashPassword(Password);

                    const AnhDaiDien = req.file.originalname;




                    const existingUser = await KhachHang.findOne({ SoDienThoai });

                    if (existingUser) {
                        // return res.status(400).json({ error: "Người dùng đã tồn tại" })
                        return res.json({ error: "Người dùng đã tồn tại" })
                    }
                    else {

                        const newNhanVien = new NhanVien({
                            HoTenKH,
                            Password: hashedPassword,
                            DiaChi,
                            SoDienThoai,
                            ChucVu,
                            AnhDaiDien,
                        })

                        await newNhanVien.save();

                        return res.json({ message: 'Đăng ký người dùng thành công', data: req.body });
                    }

                }
                catch (error) {
                    console.log('Lỗi khi đăng ký người dùng', error);
                    res.status(500).json({ message: 'Lôi khi đăng ký người dùng' })
                }


            }
        })



    }

    async login(req, res, next) {
        const SoDienThoai = req.body.phone;
        const Password = req.body.password;
        try {
            const existingUser = await KhachHang.findOne({ SoDienThoai });
            if (!existingUser) {
                return res.send({ error: "Tài khoản không tồn tại" })
            }
            else {
                const checkPassword = await userServices.checkPassword(Password, existingUser.Password);
                if (!checkPassword) {
                    return res.send({ error: "Sai mật khẩu" })
                }
                else {
                    return res.send({ message: "Đăng nhập thành công", data: existingUser })
                }
            }
        } catch (error) {
            console.log('Lỗi khi đăng nhập', error);
            res.status(500).json({ message: 'Lôi khi đăng nhập' })
        }
    }

    async loginStaff(req, res, next) {
        const SoDienThoai = req.body.phone;
        const Password = req.body.password;
        try {
            const existingUser = await NhanVien.findOne({ SoDienThoai });
            if (!existingUser) {
                return res.send({ error: "Tài khoản không tồn tại" })
            }
            else {
                const checkPassword = await userServices.checkPassword(Password, existingUser.Password);
                if (!checkPassword) {
                    return res.send({ error: "Sai mật khẩu" })
                }
                else {
                    return res.send({ message: "Đăng nhập thành công", data: existingUser })
                }
            }
        } catch (error) {
            console.log('Lỗi khi đăng nhập', error);
            res.status(500).json({ message: 'Lôi khi đăng nhập' })
        }
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