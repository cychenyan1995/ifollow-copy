import Mock from 'mockjs'

const numInfo = Mock.mock({
  totalNum: Mock.Random.integer(200,300),
  onlineNum: Mock.Random.integer(100,200)
})

let deviceLineData = Mock.mock({
  'yDataList|7': [{
    'yData|100-300': Mock.Random.integer()
  }
  ],
})
deviceLineData.xDataList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export { numInfo, deviceLineData }