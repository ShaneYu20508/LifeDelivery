import { Schema, model } from 'mongoose'

// 定義欄位
const schema = new Schema({
  name: {
    type: String,
    required: [true, '缺少商品名稱']
  },
  price: {
    type: Number,
    required: [true, '缺少商品價格']
  },
  image: {
    type: String,
    required: [true, '缺少商品圖片']
  },
  description: {
    type: String,
    required: [true, '缺少商品說明']
  },
  category: {
    type: String,
    required: [true, '缺少商品分類'],
    enum: {
      values: ['衣服', '食品', '3C', '遊戲'],
      message: '商品分類錯誤'
    }
  },
  sell: {
    type: Boolean,
    required: [true, '缺少商品上架狀態']
  }
}, {
  // 出現最近商品建立以及更新的日期
  timestamps: true,
  versionKey: false
})

export default model('products', schema)
