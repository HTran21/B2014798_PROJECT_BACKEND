const GioHang = require('../models/GioHang');
const HangHoa = require('../models/HangHoa');
class CartController {

    async addToCart(req, res, next) {
        try {
            const MSKH = req.params.id;
            const MSHH = req.body.idDrink._value;
            const SoLuong = req.body.numberCup._value;
            const Size = req.body.sizeCup._value;
            // console.log("Noi dung id item", req.body.idDrink._value)
            // console.log("Noi dung so luong", req.body.numberCup._value);
            // console.log("Noi dung Size", req.body.sizeCup._value);


            // const hangHoa = await HangHoa.findById(MSHH);

            // if (!hangHoa) {
            //     return res.json({ error: 'Không tìm thấy sản phẩm' });
            // }

            // if (SoLuong > hangHoa.SoLuongHang) {
            //     return res.json({ error: 'Số lượng hàng không đủ' });
            // }

            // hangHoa.SoLuongHang -= SoLuong;
            // await hangHoa.save();

            const existingCart = await GioHang.find({
                MSHH: MSHH,
                MSKH: MSKH,
            });
            if (existingCart.length > 0) {
                let itemToUpdate = existingCart.find(item => item.Size === Size);
                if (itemToUpdate) {
                    existingCart[0].SoLuong += SoLuong;
                    await existingCart[0].save();
                    return res.json({ message: "Thức uống đã thêm vào giỏ hàng" })

                }
                else {
                    const newGioHang = new GioHang({
                        MSKH,
                        MSHH,
                        SoLuong,
                        Size,
                    })
                    await newGioHang.save();
                    return res.json({ message: "Thức uống đã thêm vào giỏ hàng" })
                }


            }
            else {
                const newGioHang = new GioHang({
                    MSKH,
                    MSHH,
                    SoLuong,
                    Size,
                })
                await newGioHang.save();
                return res.json({ message: "Thức uống đã thêm vào giỏ hàng" })
            }
        } catch (error) {
            console.log('Lỗi khi thêm vào giỏ hàng', error);
            res.status(500).json({ message: 'Lỗi khi thêm giỏ hàng' })
        }

    }

    async listCart(req, res, next) {
        try {
            const MSKH = req.params.id;
            GioHang.find({ MSKH: MSKH, }).populate('MSHH')
                .then(giohangs => {
                    return res.send(giohangs);
                })
                .catch((err) => console.log(err))

        } catch (error) {
            console.log('Lỗi khi thêm uống', error);
            res.status(500).json({ message: 'Lỗi khi thêm thức uống' })
        }
    }

    // async updateCart(req, res, next) {
    //     try {
    //         const MSKH = req.params.id;
    //         const MSHH = req.body.idDrink._value;
    //         const existingCart = await GioHang.find({
    //             MSHH: MSHH,
    //             MSKH: MSKH,
    //         });

    //         if (existingCart) {
    //             if (req.body.sizeCup) {
    //                 const Size = req.body.sizeCup._value;
    //                 console.log("Size truyen vao", Size);
    //                 const existingCartSize = await GioHang.find({
    //                     MSHH: MSHH,
    //                     MSKH: MSKH,
    //                     Size: Size,
    //                 });
    //                 if (existingCartSize.length > 0) {
    //                     console.log("Size cua doi tuong trong cua hang", existingCartSize);
    //                     console.log("Ton tai cung san pham cung size", Size);
    //                     // Gộp các bản ghi lại với nhau và cập nhật SoLuong
    //                     const totalQuantity = existingCartSize.reduce(
    //                         (total, cartItem) => total + cartItem.SoLuong,
    //                         0
    //                     );

    //                     existingCartSize[0].SoLuong = totalQuantity;
    //                     await existingCartSize[0].save();
    //                 }
    //                 else {
    //                     console.log("Ton tai san pham khac size", Size);
    //                     existingCartSize[0].Size = Size;
    //                     await existingCartSize[0].save();
    //                     return res.send({ message: "Thức uống đã được cập nhật" })
    //                 }

    //             }
    //             else {
    //                 const SoLuong = req.body.numberCup._value;
    //                 existingCart[0].SoLuong = SoLuong;
    //                 await existingCart[0].save();
    //                 return res.send({ message: "Thức uống đã được cập nhật" })

    //             }
    //         } else {
    //             return res.json({ error: "Lỗi khi cập nhật thức uống" })
    //         }

    //     }
    //     catch (error) {
    //         console.log('Lỗi khi cập nhật uống', error);
    //         res.status(500).json({ message: 'Lỗi khi cập nhật thức uống' })
    //     }
    // }

    async updateCart(req, res, next) {
        try {

            if (req.body.sizeCup) {
                const MSKH = req.params.id;
                const MSHH = req.body.idDrink._value;
                const Size = req.body.sizeCup._value;
                const existingCart = await GioHang.find({
                    MSHH: MSHH,
                    MSKH: MSKH,
                });
                if (existingCart) {
                    existingCart[0].Size = Size;
                    await existingCart[0].save();
                    const existingCartSize = await GioHang.find({
                        MSHH: MSHH,
                        MSKH: MSKH,
                        Size: Size,
                    })
                    if (existingCartSize.length > 1) {
                        // Gộp các đối tượng lại và cập nhật tổng số lượng
                        const totalQuantity = existingCartSize.reduce(
                            (total, cartItem) => total + cartItem.SoLuong,
                            0
                        );

                        existingCartSize[0].SoLuong = totalQuantity;
                        await existingCartSize[0].save();

                        // Xóa các đối tượng còn lại
                        const remainingItems = existingCartSize.slice(1);
                        for (const item of remainingItems) {
                            await GioHang.findByIdAndDelete(item._id);
                        }
                        return res.send({ message: "Thức uống đã được cập nhật" })

                    } else {
                        existingCartSize[0].Size = Size;
                        await existingCartSize[0].save();
                        return res.send({ message: "Thức uống đã được cập nhật" })
                    }

                }
                else {
                    return res.json({ error: "Lỗi không tìm thấy thức uống" })
                }


            }
            else {
                const MSDH = req.params.id;
                const existingCart = await GioHang.findById(MSDH);

                if (existingCart) {
                    const SoLuong = req.body.numberCup._value;
                    // const MSHH = req.body.idDrink._value;
                    // const hangHoa = await HangHoa.findById(MSHH);

                    // hangHoa.SoLuongHang -= SoLuong;
                    // await hangHoa.save();

                    existingCart.SoLuong = SoLuong;
                    await existingCart.save();
                    return res.send({ message: "Thức uống đã được cập nhật", data: existingCart })
                } else {
                    return res.json({ error: "Lỗi không tìm thấy thức uống" })
                }
            }
        }
        catch (error) {
            console.log('Lỗi khi cập nhật uống', error);
            res.status(500).json({ message: 'Lỗi khi cập nhật thức uống' })
        }
    }

    async deleteCart(req, res, next) {
        try {
            const id = req.params.id;
            const existingProduct = await GioHang.findById(id);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
            }
            else {
                await GioHang.findByIdAndDelete(id);
                return res.send({ message: "Xóa đơn hàng thành công" });

            }
        } catch (error) {
            console.log('Lỗi khi xóa đơn hàng', error);
            res.status(500).json({ message: 'Lỗi khi xóa đơn hàng' })
        }
    }

}

module.exports = new CartController;