import Mock from 'mockjs'

const tableList = []

for (let i = 0; i < 87; i++) {
  tableList.push(Mock.mock({
    'id|+1': 1,
    // 'id|10-99': Mock.Random.integer(),
    tel: /^1[385][1-9]\d{8}/,
    deviceNo: Mock.Random.string(15),
    date: Mock.Random.date(),
    remindType: Mock.Random.ctitle(4),
    remindContent: Mock.Random.cparagraph(),
    'status|1': [0, 1],
    name: Mock.Random.cname(),
    cardNo: Mock.Random.integer(100000, 999999),
    'sex|1': ['男', '女'],
    deviceValidDate: Mock.Random.date(),
    registDate: Mock.Random.date(),
    belongingShop: Mock.Random.county(true),
    opinion: Mock.Random.cparagraph(1, 3)// 1到3句话
  }))
}

export { tableList }
