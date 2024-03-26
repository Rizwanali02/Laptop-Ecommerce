import { Lapy } from "../models/lapy.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/error.js";
import cloudinary from 'cloudinary';

const lapyPost = asyncHandler(async (req, res, next) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No files"
        })
    }

    const { mainImage } = req.files;


    const { laptopName, brand, processor, displaySize, stock, storage, graphicsCard, other, ram, price } = req.body;
    if (!laptopName || !brand || !processor || !displaySize || !stock || !graphicsCard || !other || !ram || !storage || !price) {
        return res.status(404).json({
            success: false,
            message: "Please fill all the fields"
        })
    }

    const createdBy = req.user._id;
    const adminName = req.user.name;


    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(mainImage.mimetype)) {
        return res.status(500).json({
            success: false,
            message: "Image must be png, jpeg or webp"
        });
    }

    const mainImageRes = await cloudinary.uploader.upload(mainImage.tempFilePath);




    const productData = {
        laptopName,
        brand,
        processor,
        displaySize,
        stock,
        storage,
        graphicsCard,
        other,
        ram,
        price,
        mainImage: {
            public_id: mainImageRes.public_id,
            url: mainImageRes.secure_url
        },
        createdBy,
        adminName,

    }

    const product = await Lapy.create(productData);
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product
    });


});


const deleteLapy = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const lapy = await Lapy.findById(id);
    if (!lapy) {
        return next(new ErrorHandler("Lapy not found", 404));
    }

    await lapy.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });

});


const getAllLapy = asyncHandler(async (req, res, next) => {

    const allLapy = await Lapy.find()
    res.status(200).json({
        success: true,
        allLapy
    });

});

const getSingleLapy = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const lapy = await Lapy.findById(id);
    if (!lapy) {
        return next(new ErrorHandler("Lapy not found", 404));
    }
    res.status(200).json({
        success: true,
        lapy
    })

});

const getMylapys = asyncHandler(async (req, res) => {
    const createdBy = req.user._id; // Corrected from createBy to createdBy
    const lapys = await Lapy.find({ createdBy }); // Corrected from createBy to createdBy
    res.status(200).json({
        success: true,
        lapys
    });
});



const updateLapy = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    let lapy = await Lapy.findById(id);
    if (!lapy) {
        return next(new ErrorHandler("Lapy not found", 404));
    }

    const newLapyData = {
        laptopName: req.body.laptopName,
        brand: req.body.brand,
        processor: req.body.processor,
        ram: req.body.ram,
        storage: req.body.storage,
        displaySize: req.body.displaySize,
        graphicsCard: req.body.graphicsCard,
        price: req.body.price,
        stock: req.body.stock,
        other: req.body.other,
        mainImage: req.body.mainImage,
    }

    if (req.files) {
        const { mainImage } = req.files;

        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(mainImage.mimetype)) {
            return next(new ErrorHandler("mainImage must be png, jpeg or webp", 400));
        }

        if (req.files && mainImage) {
            const lapyMainImageId = lapy.mainImage.public_id;
            await cloudinary.uploader.destroy(lapyMainImageId)


            const newLapyMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath)

            newLapyData.mainImage = {
                public_id: newLapyMainImage.public_id,
                url: newLapyMainImage.secure_url
            }

        }

    }

    lapy = await Lapy.findByIdAndUpdate(id, newLapyData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        lapy
    });

});

export {
    lapyPost,
    deleteLapy,
    getAllLapy,
    getSingleLapy,
    getMylapys,
    updateLapy,
};
