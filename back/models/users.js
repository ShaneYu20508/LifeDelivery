import { Schema, model, ObjectId, Error } from 'mongoose'
// 信箱
import validator from 'validator'
// 加密
import bcrypt from 'bcrypt'
// 將使用者權限引入
import UserRole from '../enums/UserRole.js'

// 定義欄位

// 購物車欄位
const cartSchema = new Schema({
  // 商品 ID
  product: {
    // 型態: mongodb 資料的 ID
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品欄位']
  },
  // 商品數量
  quantity: {
    type: Number,
    required: [true, '缺少商品數量']
  }
})

// 帳號欄位
const schema = new Schema({
  account: {
    // 型態:文字
    type: String,
    // 必填
    required: [true, '缺少使用者帳號'],
    // 帳號長度
    minlength: [4, '使用者帳號長度不符'],
    maxlength: [20, '使用者帳號長度不符'],
    // 獨特性(不能重複)
    unique: true,
    // 信箱和驗證
    validate: {
      validator (value) {
        return validator.isAlphanumeric(value)
      },
      message: '使用者帳號格式錯誤'
    }
  },

  // 信箱
  email: {
    type: String,
    required: [true, '缺少使用者信箱'],
    unique: true,
    validate: {
      validator (value) {
        return validator.isEmail(value)
      },
      message: '使用者信箱格式錯誤'
    }
  },

  // 密碼
  password: {
    type: String,
    required: [true, '缺少使用者密碼']
  },
  tokens: {
    // 文字陣列
    type: [String]
  },
  // 購物車
  cart: {
    // cart 型態的陣列
    type: [cartSchema]
  },
  // 使用者權限
  role: {
    type: Number,
    default: UserRole.USER
  }
}, {
// 補充欄位設定
  // 資料建立日期以及更新日期
  timestamp: true,
  // 紀錄資料被更改幾次 (false 不紀錄)
  versionKey: false
})

// 建立一個虛擬的欄位叫 cartQuantity
// 連接到 controllers 的 users.js 當中的 getProfile 內
schema.virtual('cartQuantity')
// 這個欄位的生產方式
  .get(function () {
    // 這筆資料的購物車去做加總
    return this.cart.reduce((total, current) => {
      return total + current.quantity
    }, 0)
  })

// 密碼加密
// 存進資料庫前執行一個 function
schema.pre('save', function (next) {
  const user = this
  // 如果 user 有修改到密碼欄位
  if (user.isModified('password')) {
    // user 密碼長度 小於 4 或大於 20
    if (user.password.length < 4 || user.password.length > 20) {
      // 如果密碼長度不符合，回傳錯誤訊息
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼長度不符' }))
      next(error)
      return
    } else {
      // 如果密碼長度符合，對密碼進行 hash(將密碼隱藏起來，增加安全性) 加密處理，並且儲存密碼
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  // 可以的話就跑下一個動作
  next()
})

export default model('users', schema)
