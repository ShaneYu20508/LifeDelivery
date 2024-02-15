import { Router } from 'express'
import * as auth from '../middlewares/auth.js'
import { create } from '../controllers/products.js'
import upload from '../middlewares/upload.js'
import admin from '../middlewares/admin.js'

const router = Router()
// 由第一個驗證到最後一個 (驗證登入與否, 管理員驗證, 上傳檔案, 建立)
router.post('/', auth.jwt, admin, upload, create)

export default router
// 要回 index.js 內補上 import
