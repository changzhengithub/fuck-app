import {strChineseFirstPY, oMultiDiff} from './Initial.string'
export default class Sort {
  static navList = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  static getData (dataArr) {
    dataArr.forEach(item => {
      let preproccessName = item.nick ? item.nick : item.account
      item.upCase = this.getInitial(preproccessName)
    })
    return this.getSortList(dataArr)
  }

  static getInitial (str) {
    if (!str) return str
    if (typeof (str) !== 'string') str = str.toString()
    let resultStr = ''
    let firstChar = str.charAt(0)
    let uniCode = firstChar.charCodeAt(0)
    if (uniCode > 40869 || uniCode < 19968) return str
    for (let i = 0; i < str.length; i++) {
      let ch = str.charAt(i)
      resultStr += this.checkCh(ch)
    }
    return resultStr
  }

  static checkCh (ch) {
    let uni = ch.charCodeAt(0)
    if (uni > 40869 || uni < 19968) {
      return ch
    }
    return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)))
  }

  static getSortList (arr) {
    let sortArr = []
    let sortList = []
    for (let i = 0; i < this.navList.length; i++) {
      sortArr[i] = {}
      sortArr[i].arr = []
      sortArr[i].title = this.navList[i]
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].upCase.charAt(0) === this.navList[i]) {
          sortArr[i].arr.push(arr[j])
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      let reg = new RegExp('[A-Za-z]+')
      if (!reg.test(arr[i].upCase.charAt(0))) {
        sortArr[0].arr.push(arr[i])
      }
    }
    sortArr.forEach((item, i) => {
      if (item.arr.length !== 0) {
        sortList.push(item)
      }
    })
    return sortList
  }
}
