import { Router } from 'express'
// 引入註冊，登入
import { create, login } from '../controllers/users.js'
import * as auth from '../middlewares/auth.js'

const router = Router()
router.post('/', create)
router.post('/login', auth.login, login)

export default router
