import { Router } from 'express'
// 引入 controllers 的功能
import { create, login, logout, extend, getProfile } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = Router()
// 註冊
router.post('/', create)
// 登入
router.post('/login', auth.login, login)
// 登出
router.delete('/logout', auth.jwt, logout)
// 舊換新
router.patch('/extend', auth.jwt, extend)
// 取資料
router.get('/me', auth.jwt, getProfile)

export default router
