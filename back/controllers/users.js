// 註冊，登入，登出
import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// 建立使用者(註冊)
export const create = async (req, res) => {
  try {
    // 建立成功
    await users.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
    // 錯誤訊息
  } catch (error) {
    // 驗證錯誤
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    // 重複錯誤
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: '帳號已註冊'
      })
    } else {
    // 若非以上錯誤，則未知
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}

// 登入
export const login = async (req, res) => {
  try {
    // 抓取使用者的 id, 密鑰保存 7 天
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 將新抓到的 token 並且 push 到使用者當中並保存
    req.user.tokens.push(token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      // 當成功登入時，需要回傳的資料
      result: {
        // 這次登入的 token
        token,
        // 帳號
        account: req.user.account,
        // 信箱
        email: req.user.email,
        // 使用者權限
        role: req.user.role,
        // 購物車當中的商品 id 以及數量
        cart: req.user.cartQuantity
      }
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// 登出
export const logout = async (req, res) => {
  try {
    // tokens 為 mongoDb 當中帳號的 token
    // 如果有此次登入狀態的 token，將他移除
    req.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: ''
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// 舊換新
// 將這次登入的舊的 token 換成新的
export const extend = async (req, res) => {
  try {
    // 先去找到這次請求的 token 是這次陣列中的第幾個 findIndex( token 為這次請求的東西)
    const idx = req.user.tokens.findIndex(token => token === req.token)
    // 找出來後牽一組新的 jwt
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    // 替換
    req.user.tokens[idx] = token
    // 保存
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: token
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}

// 當使用者進到網頁之後取自己的個人資料
// 把自己的資訊回傳 (登入回什麼，這邊就回什麼)
export const getProfile = (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        email: req.user.email,
        role: req.user.role,
        // cartQuantity 來自 models 的 users.js 中的 schema.virtual('cartQuantity')
        cart: req.user.cartQuantity
      }
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
