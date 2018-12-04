import Account from './Account.class.js'
import Call from './Call.class.js'
export default class Chat {
  static nim = null
  static successCallback = null
  static blacklistAccounts = null

  static set key (key) {
    window.app.$store.commit('saveChat', {
      id: key.Nim_Accid,
      token: key.Nim_Token,
      target: null
    })
  }

  static set target (target) {
    let key = {...window.app.$store.state.chat}
    key.target = target
    window.app.$store.commit('saveChat', key)
  }

  static get target () {
    let target = window.app.$store.state.chat.target
    return target
  }

  static init () {
    let key = window.app.$store.state.chat
    let config = {
      appKey: 'bd632f1fc00a5c0a1af35ebf05c7f9e7',
      account: key.id,
      token: key.token,
      onmyinfo: info => {
        Account.portrait = info.avatar
      },
      onmsg: message => {
        // if (window.app.$store.state.chat.target.id === message.from) {
        //   window.app.$store.commit('saveMessage', message)
        // } else {}
        console.log(message)
        window.app.$store.commit('saveMessage', message)
      },
      onsessions: sessions => {
        console.log(sessions)
        window.app.$store.commit('saveSessions', sessions)
      },
      onupdatesession: onupdatesession => {
        console.log(onupdatesession)
        let sessions = []
        let sessionId = []
        if (window.app.$store.state.sessions) {
          sessions = window.app.$store.state.sessions
          sessions.forEach(item => {
            sessionId.push(item.id)
          })
        }
        if (sessionId.indexOf(onupdatesession.id) === -1) {
          sessions.push(onupdatesession)
          window.app.$store.commit('saveSessions', sessions)
        }
        window.app.$store.commit('saveUpdatesession', onupdatesession)
      },
      onsysmsg: sysmsg => {
        console.log(sysmsg)
        window.app.$store.commit('saveVerifyMessage', sysmsg)
      },
      onupdatesysmsgunread: onupdatesysmsgunread => {
        window.app.$store.commit('saveSysMsgUnread', onupdatesysmsgunread.friend)
      },
      onfriends: friends => {
        console.log(friends)
        window.app.$store.commit('saveFriends', friends)
      },
      debug: false
    }
    if (window.NIM) {
      window.app.$store.commit('saveNim', window.NIM.getInstance(config))
      Call.init(window.app.$store.state.nim)
    }
  }

  static refresh () {
    this.nim = window.app.$store.state.nim
  }

  static getUserInfo (account) {
    let operation = new Operation()
    this.refresh()
    if (account instanceof Array) {
      this.nim.getUsers({
        accounts: account,
        sync: true,
        done: (error, user) => {
          if (error) return operation
          if (operation.successCallback) operation.successCallback(user)
          return operation
        }
      })
    } else {
      this.nim.getUser({
        account: account,
        sync: true,
        done: (error, users) => {
          if (error) return operation
          if (operation.successCallback) operation.successCallback(users)
          return operation
        }
      })
    }
    return operation
  }

  static getFriends () {
    let operation = new Operation()
    this.refresh()
    this.nim.getFriends({
      done: (error, friends) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(friends)
        return operation
      }
    })
    return operation
  }

  static getBlacklist () {
    let operation = new Operation()
    this.refresh()
    this.nim.getRelations({
      done: (error, relation) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(relation.blacklist)
        return operation
      }
    })
    return operation
  }

  static set addBlack (account) {
    this.refresh()
    this.nim.addToBlacklist({
      account: account,
      done: (error, relation) => {
        if (error) {
          return false
        } else {
          return true
        }
      }
    })
  }

  static set removeBlack (account) {
    this.refresh()
    this.nim.removeFromBlacklist({
      account: account,
      done: error => {
        if (error) {
          return false
        } else {
          return true
        }
      }
    })
  }

  /**
   * 加入黑名单/从黑名单移除
   * @param {*} account
   * @param {*} isAdd
   * account: 账号
   * isAdd: `true`表示加入黑名单, `false`表示从黑名单移除
   */
  static balckToggle (account, isAdd) {
    let operation = new Operation()
    this.refresh()
    this.nim.markInBlacklist({
      account: account,
      isAdd: isAdd,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 申请加为好友
   * @param {*} account
   * account: 对方账号
   */
  static set applyFriend (account) {
    this.refresh()
    this.nim.applyFriend({
      account: account,
      done: error => {
        if (error) {
          return false
        } else {
          return true
        }
      }
    })
  }

  /**
   * 通过好友申请
   * @param {*} msg
   * @param {*} account
   * msg: 回调收到的消息
   * account: 对方账号
   */
  static passFriendApply (msg, account) {
    let operation = new Operation()
    this.refresh()
    this.nim.passFriendApply({
      idServer: msg.idServer,
      account: account,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 拒绝好友申请
   * @param {*} msg
   * @param {*} account
   * msg: 回调收到的消息
   * account: 对方账号
   */
  static rejectFriendApply (msg, account) {
    let operation = new Operation()
    this.refresh()
    this.nim.rejectFriendApply({
      idServer: msg.idServer,
      account: account,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 删除好友
   * @param {*} account
   * account: 删除账号
   */
  static deleteFriend (account) {
    let operation = new Operation()
    this.refresh()
    this.nim.deleteFriend({
      account: account,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 获取本地系统通知
   */
  static localSysMsgs () {
    let operation = new Operation()
    this.refresh()
    this.nim.getLocalSysMsgs({
      limit: 100,
      reverse: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 更改系统通知
   *  @param {*} sysMsgs
   * sysMsgs: 接收到的系统通知或者系统通知数组
   */
  static markSysMsgRead (sysMsgs) {
    let operation = new Operation()
    this.refresh()
    this.nim.markSysMsgRead({
      sysMsgs: sysMsgs,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 删除系统消息
   * @param {*} idServer
   * idServer: 删除系统消息账号
   */
  static deleteLocalSysMsg (idServer) {
    let operation = new Operation()
    this.refresh()
    this.nim.deleteLocalSysMsg({
      idServer: idServer,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 删除所有系统消息
   */
  static deleteLocalSysMsgs () {
    let operation = new Operation()
    this.refresh()
    this.nim.deleteAllLocalSysMsgs({
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 更改系统通知
   *  @param {*} msg
   *  @param {*} status
   * msg: 系统消息
   * status: 自定义名字
   */
  static updateLocalSysMsg (msg, status) {
    let operation = new Operation()
    this.refresh()
    this.nim.updateLocalSysMsg({
      idServer: msg.idServer,
      status: status,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 发送文本消息
   * @param {*} account
   * @param {*} content
   * account: 对方账号
   * content: 内容
   */
  static sendText (account, content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendText({
      scene: 'p2p',
      to: account,
      text: content,
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 发送文件消息
   * @param {*} account
   * @param {*} type
   * @param {*} fileInput
   */
  static sendFile (account, type, fileInput) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendFile({
      scene: 'p2p',
      to: account,
      type: type,
      fileInput: fileInput,
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  // 预览文件
  static previewFile (fileInput) {
    let operation = new Operation()
    this.refresh()
    this.nim.previewFile({
      type: 'image',
      fileInput: fileInput,
      uploadprogress: (obj) => {
        console.log('文件总大小: ' + obj.total + 'bytes')
        console.log('已经上传的大小: ' + obj.loaded + 'bytes')
        console.log('上传进度: ' + obj.percentage)
        console.log('上传进度文本: ' + obj.percentageText)
      },
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 发送图片消息
   * @param {*} account
   * @param {*} fileInput
   * account: 对方账号
   * fileInput: input表单
   */
  static sendImage (account, fileInput) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendFile({
      scene: 'p2p',
      to: account,
      type: 'image',
      fileInput: fileInput,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }
  // 自定义消息
  // {"type":8,"data":{"money":"500.00","title":"向你打个借条","id":"201803031402008552","type":"jt"}}
  // {"type":8,"data":{"money":"10.00","title":"向你打个欠条","id":"201803061627558086","type":"qt"}}
  // {"type":8,"data":{"money":"常彬彬的信用报告","title":"常彬彬的信用报告","id":"13955131374","type":"xybg"}}
  // {"type":8,"data":{"money":"https:\/\/nim.nosdn.127.net\/NTE3Mjg2NQ==\/bmltYV8xNTQ4NjA2ODA3XzE1MjYyNzY3ODU4NDdfYzNjZjhhY2ItZWFlYS00MDE5LThkZDUtNzE3NzU4ZWY5Yjdl","title":"陈庆105","id":"100100105","type":"mp"}}
  // {"data":{"money":"10","type":"zz"},"type":7}
  // {"data":{"catalog":"ajmd","chartlet":"ajmd001"},"type":3}

  /**
   * 贴图消息
   * @param {json} content exemple
   * {
   *  target: '对方账号'
   *  catalog: '贴图类型 lt xxy ajmd'
   *  chartlet: '贴图名字'
   * }
  */
  static chartletMsg (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      content: JSON.stringify({
        type: 3,
        data: {
          catalog: content.catalog,
          chartlet: content.chartlet
        }
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 信用报告
   * @param {json} content exemple
   * {
   *  target: '对方账号'
   *  id: '信用报告账号'
   *  title: '信用报告提示'
   *  money: '信用报告内容'
   * }
  */
  static creditReport (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      content: JSON.stringify({
        type: 8,
        data: {
          money: content.money,
          id: content.id,
          title: content.title,
          type: 'xybg'
        }
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 转账
   * @param {json} content exemple
   * {
   *  target: '对方账号'
   *  title: '转账提示'
   *  money: '转账金额'
   * }
  */
  static transferAccount (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      content: JSON.stringify({
        type: 7,
        data: {
          money: content.money,
          title: content.title,
          type: 'zz'
        }
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 打借条
   * @param {json} content exemple
   * {
   *  target: '对方账号'
   *  title: '借条提示'
   *  money: '借条金额'
   * }
  */
  static createMainIOU (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      content: JSON.stringify({
        type: 8,
        data: {
          money: content.money,
          title: content.title,
          type: 'jt'
        }
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
  * 打欠条
  * @param {json} content exemple
  * {
  *  target: '对方账号'
  *  title: '欠条提示'
  *  money'欠条金额'
  * }
  */
  static createAttachmentIOU (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      text: JSON.stringify({
        money: content.money,
        title: content.title,
        type: 'qt'
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 发送名片
   * @param { json } content example
   * {
   *  target: '对方账号'
   *  id: '名片账号'
   *  title: '名片姓名'
   *  money'名片头像'
   * }
   */
  static sendBusinessCard (content) {
    let operation = new Operation()
    this.refresh()
    this.nim.sendCustomMsg({
      scene: 'p2p',
      to: content.target,
      content: JSON.stringify({
        type: 8,
        data: {
          id: content.id,
          title: content.title,
          money: content.money,
          type: 'mp'
        }
      }),
      isHistoryable: true,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 获取云端历史记录
   * @param {*} account
   * account: 聊天对象, 账号
   */
  static historyMsgs (account) {
    let operation = new Operation()
    this.refresh()
    this.nim.getHistoryMsgs({
      scene: 'p2p',
      to: account,
      limit: 20,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 删除会话
   * @param {*} sessionId
   * sessionId: 会话id或者会话id数组
   */
  static deleteSessions (sessionId) {
    let operation = new Operation()
    this.refresh()
    this.nim.deleteLocalSession({
      id: sessionId,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 获取本地会话
   * @param {*} sessionId
   * sessionId: 会话id或者会话id数组
   */
  static getLocalSession () {
    let operation = new Operation()
    this.refresh()
    this.nim.getLocalSessions({
      limit: 100,
      done: (error, msg) => {
        if (error) return operation
        if (operation.successCallback) operation.successCallback(msg)
        return operation
      }
    })
    return operation
  }

  /**
   * 消息未读数
   * @param {string} sessionId
   * 会话id
   */
  static sessionUnread (sessionId) {
    this.refresh()
    this.nim.resetSessionUnread(sessionId)
  }
}
class Operation {
  successCallback = null
  failCallback = null
  success (callback) {
    this.successCallback = callback
    return this
  }

  fail (callback) {
    this.failCallback = callback
    return this
  }
}
