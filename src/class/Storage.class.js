export default class Storage {
  static set origin (origin) {
    this.save('origin', origin)
  }

  static get origin () {
    return this.getOut('origin')
  }

  static set id (id) {
    this.save('id', id)
  }

  static get id () {
    return this.getOut('id')
  }

  static set oid (oid) {
    this.save('oid', oid)
  }

  static get oid () {
    return this.getOut('oid')
  }

  static set token (token) {
    this.save('token', token)
  }

  static get token () {
    return this.getOut('token')
  }

  static set phone (phone) {
    this.save('phone', phone)
  }

  static get phone () {
    return this.getOut('phone')
  }

  static set name (name) {
    this.save('name', name)
  }

  static get name () {
    return this.getOut('name')
  }

  static set paySet (paySet) {
    this.save('paySet', paySet)
  }

  static get paySet () {
    return this.getOut('paySet')
  }

  static set publishObject (publishObject) {
    this.save('publishObject', publishObject)
  }

  static get publishObject () {
    return this.getOut('publishObject')
  }

  static set purpose (purpose) {
    this.save('purpose', purpose)
  }

  static get purpose () {
    return this.getOut('purpose')
  }

  static set opinion (opinion) {
    this.save('opinion', opinion)
  }

  static get opinion () {
    return this.getOut('opinion')
  }

  static set payedMoney (payedMoney) {
    this.save('payedMoney', payedMoney)
  }

  static get payedMoney () {
    return this.getOut('payedMoney')
  }

  static set gapMoney (gapMoney) {
    this.save('gapMoney', gapMoney)
  }

  static get gapMoney () {
    return this.getOut('gapMoney')
  }

  static set borrowId (borrowId) {
    this.save('borrowId', borrowId)
  }

  static get borrowId () {
    return this.getOut('borrowId')
  }

  static set borrowType (borrowType) {
    this.save('borrowType', borrowType)
  }

  static get borrowType () {
    return this.getOut('borrowType')
  }
  // 可用余额
  static set usableMoney (usableMoney) {
    this.save('usableMoney', usableMoney)
  }

  static get usableMoney () {
    return this.getOut('usableMoney')
  }
  // 失信查询结果
  static set credtiQuery (credtiQuery) {
    this.save('credtiQuery', credtiQuery)
  }

  static get credtiQuery () {
    return this.getOut('credtiQuery')
  }

  static set account (account) {
    this.save('account', account)
  }

  static get account () {
    return this.getOut('account')
  }
  // 投诉对象 complianPhone
  static set complianPhone (complianPhone) {
    this.save('complianPhone', complianPhone)
  }

  static get complianPhone () {
    return this.getOut('complianPhone')
  }

  static set error (error) {
    this.save('error', error)
  }

  static set bank (bank) {
    this.save('bank', bank)
  }

  static get bank () {
    return this.getOut('bank')
  }

  static set forget (forget) {
    this.save('forget', forget)
  }

  static get forget () {
    return this.getOut('forget')
  }

  static set wannaInfo (wannaInfo) {
    this.save('wannaInfo', wannaInfo)
  }

  static get wannaInfo () {
    return this.getOut('wannaInfo')
  }

  static set chat (chat) {
    this.save('chat', chat)
  }

  static get chat () {
    return this.getOut('chat')
  }

  static set userInfo (userInfo) {
    this.save('userInfo', userInfo)
  }

  static get userInfo () {
    return this.getOut('userInfo')
  }

  // 消息列表
  static set sessions (sessions) {
    this.save('sessions', sessions)
  }

  static get sessions () {
    return this.getOut('sessions')
  }
  // 更新当前会话
  static set updatesession (updatesession) {
    this.save('updatesession', updatesession)
  }

  static get updatesession () {
    return this.getOut('updatesession')
  }

  // 保存个人名片消息
  static set businessCard (businessCard) {
    this.save('businessCard', businessCard)
  }

  static get businessCard () {
    return this.getOut('businessCard')
  }

  // 当前聊天对象消息列表
  static set messages (messages) {
    this.save('messages', messages)
  }

  static get messages () {
    return this.getOut('messages')
  }

  // 当前聊天对象会话id
  static set sessionId (sessionId) {
    this.save('sessionId', sessionId)
  }

  static get sessionId () {
    return this.getOut('sessionId')
  }

  // 出借模板
  static set loanTemplate (loanTemplate) {
    this.save('loanTemplate', loanTemplate)
  }

  static get loanTemplate () {
    return this.getOut('loanTemplate')
  }

  // 保存黑名单
  static set blackList (blackList) {
    this.save('blackList', blackList)
  }

  static get blackList () {
    return this.getOut('blackList')
  }

  // 保存系统消息
  static set verifyMessage (verifyMessage) {
    this.save('verifyMessage', verifyMessage)
  }

  static get verifyMessage () {
    return this.getOut('verifyMessage')
  }

  static clear () {
    for (const item in window.app.$store.mutations) window.app.$store.commit(item, null)
    try {
      for (const item in localStorage) localStorage[item] = ''
    } catch (error) {}
  }

  static getsaveInLocalStorage (name) {
    try {
      localStorage.getItem(name)
    } catch (error) {}
  }

  static save (name, content) {
    window.app.$store.commit('save' + name.substring(0, 1).toUpperCase() + name.substring(1), content)
    try {
      let result = content
      if (typeof content === 'object') result = JSON.stringify(content)
      localStorage.setItem(name, result)
    } catch (error) {}
  }

  static getOut (name) {
    let result = null
    try {
      result = localStorage.getItem(name)
      if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    } catch (error) {}
    if (window.app.$store.state[name] !== null) {
      result = window.app.$store.state[name]
    } else if (result !== null) {
      this.save(name, result)
    }
    return result
  }
}
