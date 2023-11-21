const HangHoa = require('../models/HangHoa');
const multer = require('multer');
const storage = require('../../services/uploadImage');

class ProductController {

    async listProduct(req, res, next) {
        const searchQuery = req.query.search;

        if (searchQuery) {

            const drinks = await HangHoa.find({ TenHH: { $regex: searchQuery, $options: 'i' } });
            if (drinks.length > 0) {
                res.json(drinks);
            } else {
                res.json({ message: 'Không tìm thấy đồ uống' });
            }
        }
        else {
            HangHoa.find()
                .then(hanghoas => {
                    return res.send(hanghoas);
                })
                .catch((err) => console.log(err))
        }


    }

    async addProduct(req, res, next) {
        const upload = multer({ storage: storage }).single("image");

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Lỗi tải lên tệp' });
            }
            else if (err) {
                return res.status(500).json({ error: 'Lỗi tải lên tệp' });
            }
            else {
                try {

                    const TenHH = req.body.nameDrink;
                    const MoTaHH = req.body.desDrink;
                    const Gia = parseInt(req.body.priceDrink, 10);
                    // const SoLuongHang = req.body.quantityDrink;
                    const SoLuongHang = parseInt(req.body.quantityDrink, 10);
                    const GhiChu = req.body.noteDrink;
                    const HinhHH = req.file.originalname;

                    const existingProduct = await HangHoa.findOne({ TenHH });

                    if (existingProduct) {
                        existingProduct.SoLuongHang += SoLuongHang;
                        await existingProduct.save();
                        return res.json({ update: "Thức uống đã được cập nhật" })
                    }
                    else {
                        const newHangHoa = new HangHoa({
                            TenHH,
                            MoTaHH,
                            Gia,
                            SoLuongHang,
                            GhiChu,
                            HinhHH
                        })
                        await newHangHoa.save();
                        return res.json({ message: "Thức uống đã được thêm" })

                    }

                }
                catch (error) {
                    console.log('Lỗi khi thêm thức uống', error);
                    res.status(500).json({ message: 'Lỗi khi thêm thức uống' })
                }


            }
        })


    }

    updateProduct(req, res, next) {
        const upload = multer({ storage: storage }).single("image");

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Lỗi tải lên tệp' });
            }
            else if (err) {
                return res.status(500).json({ error: 'Lỗi tải lên tệp' });
            }
            else {
                try {

                    const id = req.params.id;
                    const existingProduct = await HangHoa.findById(id);
                    if (existingProduct) {
                        const TenHH = req.body.nameDrink;
                        const MoTaHH = req.body.desDrink;
                        const Gia = parseInt(req.body.priceDrink, 10);
                        const SoLuongHang = parseInt(req.body.quantityDrink, 10);
                        const GhiChu = req.body.noteDrink;
                        if (req.file) {
                            const HinhHH = req.file.originalname;
                            existingProduct.TenHH = TenHH;
                            existingProduct.MoTaHH = MoTaHH;
                            existingProduct.Gia = Gia;
                            existingProduct.GhiChu = GhiChu;
                            existingProduct.SoLuongHang = SoLuongHang;
                            existingProduct.HinhHH = HinhHH;
                            await existingProduct.save();
                            return res.json({ message: "Thức uống đã được cập nhật" })
                        }
                        else {
                            existingProduct.TenHH = TenHH;
                            existingProduct.MoTaHH = MoTaHH;
                            existingProduct.Gia = Gia;
                            existingProduct.GhiChu = GhiChu;
                            existingProduct.SoLuongHang = SoLuongHang;
                            await existingProduct.save();
                            return res.json({ message: "Thức uống đã được cập nhật" })
                        }
                    }
                    else {
                        return res.send({ error: "Cập nhật thất bại" })

                    }




                }
                catch (error) {
                    console.log('Lỗi khi cập nhật thức uống', error);
                    res.status(500).json({ message: 'Lỗi khi cập nhật thức uống' })
                }


            }
        })

    }

    async deleteProduct(req, res, next) {
        try {
            const id = req.params.id;
            const existingProduct = await HangHoa.findById(id);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
            }
            else {
                await HangHoa.findByIdAndDelete(id);
                return res.send({ message: "Xóa thức uống thành công" });

            }
        } catch (error) {
            console.log('Lỗi khi xóa thức uống', error);
            res.status(500).json({ message: 'Lỗi khi xóa thức uống' })
        }


    }

}

module.exports = new ProductController;