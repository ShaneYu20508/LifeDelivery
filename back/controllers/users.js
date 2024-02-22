// 註冊，登入，登出
import users from '../models/users.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import missions from '../models/missions.js'
import validator from 'validator'

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

// 加入購物車
export const editCart = async (req, res) => {
  try {
    // 檢查商品 id 格式對不對
    if (!validator.isMongoId(req.body.mission)) throw new Error('ID')

    // 尋找購物車內有沒有傳入的商品 ID
    // (item.的商品 => 轉為文字型態())
    // 檢查商品 ID 是否等於所傳入的商品 ID
    const idx = req.user.cart.findIndex(item => item.mission.toString() === req.body.mission)
    if (idx > -1) {
      // 修改購物車內已有的商品數量
      const quantity = req.user.cart[idx].quantity + parseInt(req.body.quantity)
      // 根據修改後的結果進行檢查數量
      // 小於 0，移除
      if (quantity <= 0) {
        req.user.cart.splice(idx, 1)
        // 大於 0，修改
      } else {
        req.user.cart[idx].quantity = quantity
      }
      // 如果商品不在購物車內
    } else {
      // 檢查商品是否存在或已下架
      const mission = await missions.findById(req.body.mission).orFail(new Error('NOT FOUND'))
      // 如果商品下架
      if (!mission.sell) {
        // 回覆 NOT FOUND
        throw new Error('NOT FOUND')
      } else {
        req.user.cart.push({
          mission: mission._id,
          quantity: req.body.quantity
        })
      }
    }
    await req.user.save()
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: req.user.cartQuantity
    })
  } catch (error) {
    console.log(error)
    if (error.name === 'CastError' || error.message === 'ID') {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'ID 格式錯誤'
      })
    } else if (error.message === 'NOT FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: '查無商品'
      })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
      })
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: '未知錯誤'
      })
    }
  }
}
// 取購物車內所有東西的 controller
export const getCart = async (req, res) => {
  try {
    // .populate 將有關連的資料帶出來
    const result = await users.findById(req.user._id, 'cart').populate('cart.mission')
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result: result.cart
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '未知錯誤'
    })
  }
}
