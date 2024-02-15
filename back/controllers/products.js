// 引入產品的 models
import products from '../models/products.js'
// 引入狀態碼
import { StatusCodes } from 'http-status-codes'

export const create = async (req, res) => {
  try {
    // req.file.path 為圖片路徑
    req.body.image = req.file.path
    const result = await products.create(req.body)
    res.status(StatusCodes.OK).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    // 驗證錯誤
    // 與 controllers 資料夾內的 users.js 的驗證錯誤一樣
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message
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
