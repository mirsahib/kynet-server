import express from "express";
import authCtrl from "../controller/auth.controller"

const router = express.Router();

router.route('/auth/login').post(authCtrl.validateAuth,authCtrl.login)
// router.route('/auth/logout').get()

export default router