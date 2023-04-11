import express from "express";
import adsCtrl from "../controller/ads.controller";
import multer from "multer";
import validation from "../util/validation";
import AdsSchema from "../database/schema/AdsSchema";
import authCtrl from "../controller/auth.controller";
const upload = multer();
const router = express.Router();

router
	.route("/api/ads")
	.get(authCtrl.requireSignin,adsCtrl.list)
	.post(
		authCtrl.requireSignin,
		upload.single("image"),
		validation(AdsSchema),
		adsCtrl.uploadImage,
		adsCtrl.create
	);
router.route("/api/ads/single/:adsId").get(adsCtrl.read);
router.route("/api/ads/catagory/:catagory").get(adsCtrl.read);

//@ts-ignore
router.param("adsId", adsCtrl.findAdsbyId);
router.param("catagory", adsCtrl.findAdsbyCatagory);

export default router;
