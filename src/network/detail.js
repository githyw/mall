import {request} from "./request"
export function getdetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.price = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services

  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}


export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

export class UserEvaluate {
  constructor(rate) {
    this.content = rate.list[0].content;
    this.style = rate.list[0].style;
    this.avatar = rate.list[0].user.avatar;
    this.uname = rate.list[0].user.uname;
    this.explain = rate.list[0].explain;
  }
}
