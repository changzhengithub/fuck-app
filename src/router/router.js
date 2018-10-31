import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const AboutPayPasswordSettingsComponent = () => import(/* webpackChunkName: 'about-pay-password-settings' */ '../components/about-pay-password-settings/about-pay-password-settings.vue')
const AccountBalanceComponent = () => import(/* webpackChunkName: 'account-balance' */ '../components/account-balance/account-balance.vue')
const AccountDetailComponent = () => import(/* webpackChunkName: 'account-detail' */ '../components/account-detail/account-detail.vue')
const AccountStatisticComponent = () => import(/* webpackChunkName: 'account-statistic' */ '../components/account-statistic/account-statistic.vue')
const ActiveLenderComponent = () => import(/* webpackChunkName: 'active-lender' */ '../components/active-lender/active-lender.vue')
const AddContactComponent = () => import(/* webpackChunkName: 'add-contact' */ '../components/add-contact/add-contact.vue')
const AddFriendComponent = () => import(/* webpackChunkName: 'add-friend' */ '../components/add-friend/add-friend.vue')
const BindBankCardComponent = () => import(/* webpackChunkName: 'bind-bank-card' */ '../components/bind-bank-card/bind-bank-card.vue')
const BlackListComponent = () => import(/* webpackChunkName: 'black-list' */ '../components/black-list/black-list.vue')
const BorrowListComponent = () => import(/* webpackChunkName: 'borrow-list' */ '../components/borrow-list/borrow-list.vue')
const CancelAccountComponent = () => import(/* webpackChunkName: 'cancel-account' */ '../components/cancel-account/cancel-account.vue')
const ChatComponent = () => import(/* webpackChunkName: 'chat' */ '../components/chat/chat.vue')
const CollectionDetailComponent = () => import(/* webpackChunkName: 'collection-detail' */ '../components/collection-detail/collection-detail.vue')
const CollectionScheduleComponent = () => import(/* webpackChunkName: 'collection-schedule' */ '../components/collection-schedule/collection-schedule.vue')
const ComplainComponent = () => import(/* webpackChunkName: 'complain' */ '../components/complain/complain.vue')
const ComplainObjectComponent = () => import(/* webpackChunkName: 'complain-object' */ '../components/complain-object/complain-object.vue')
const ConfirmCancelAccountComponent = () => import(/* webpackChunkName: 'confirm-cancel-account' */ '../components/confirm-cancel-account/confirm-cancel-account.vue')
const CreditComponent = () => import(/* webpackChunkName: 'credit' */ '../components/credit/credit.vue')
const CreditIdentityComponent = () => import(/* webpackChunkName: 'credit-identity' */ '../components/credit-identity/credit-identity.vue')
const CreditQueryComponent = () => import(/* webpackChunkName: 'credit-query' */ '../components/credit-query/credit-query.vue')
const CreditQueryResultComponent = () => import(/* webpackChunkName: 'credit-query-result' */ '../components/credit-query-result/credit-query-result.vue')
const CreditReportComponent = () => import(/* webpackChunkName: 'credit-report' */ '../components/credit-report/credit-report.vue')
const EmpowerComponent = () => import(/* webpackChunkName: 'empower' */ '../components/empower/empower.vue')
const ExhibitionStatusComponent = () => import(/* webpackChunkName: 'exhibition-status' */ '../components/exhibition-status/exhibition-status.vue')
const ExhibitonPeriodComponent = () => import(/* webpackChunkName: 'exhibiton-period' */ '../components/exhibiton-period/exhibiton-period.vue')
const FamilarQuestionComponent = () => import(/* webpackChunkName: 'familar-question' */ '../components/familar-question/familar-question.vue')
const FeedbackComponent = () => import(/* webpackChunkName: 'feedback' */ '../components/feedback/feedback.vue')
const FindLenderComponent = () => import(/* webpackChunkName: 'find-lender' */ '../components/find-lender/find-lender.vue')
const ForgetPasswordComponent = () => import(/* webpackChunkName: 'forget-password' */ '../components/forget-password/forget-password.vue')
const FriendTransferComponent = () => import(/* webpackChunkName: 'friend-transfer' */ '../components/friend-transfer/friend-transfer.vue')
const HistoryLenderComponent = () => import(/* webpackChunkName: 'history-lender' */ '../components/history-lender/history-lender.vue')
const HomeComponent = () => import(/* webpackChunkName: 'home' */ '../components/home/home.vue')
const FindComponent = () => import(/* webpackChunkName: 'find' */ '../components/home/find/find.vue')
const FriendsComponent = () => import(/* webpackChunkName: 'friends' */ '../components/home/friends/friends.vue')
const IndexComponent = () => import(/* webpackChunkName: 'index' */ '../components/home/index/index.vue')
const MessagesComponent = () => import(/* webpackChunkName: 'messages' */ '../components/home/messages/messages.vue')
const MineComponent = () => import(/* webpackChunkName: 'mine' */ '../components/home/mine/mine.vue')
const IdentityVerificationComponent = () => import(/* webpackChunkName: 'identity-verification' */ '../components/identity-verification/identity-verification.vue')
const ImmediateRepaymentComponent = () => import(/* webpackChunkName: 'immediate-repayment' */ '../components/immediate-repayment/immediate-repayment.vue')
const IouCenterComponent = () => import(/* webpackChunkName: 'iou-center' */ '../components/iou-center/iou-center.vue')
const IouDetailComponent = () => import(/* webpackChunkName: 'iou-detail' */ '../components/iou-detail/iou-detail.vue')
const IouTemplateComponent = () => import(/* webpackChunkName: 'iou-template' */ '../components/iou-template/iou-template.vue')
const LendListComponent = () => import(/* webpackChunkName: 'lend-list' */ '../components/lend-list/lend-list.vue')
const LendingInformationComponent = () => import(/* webpackChunkName: 'lending-information' */ '../components/lending-information/lending-information.vue')
const ModefyPayPasswordComponent = () => import(/* webpackChunkName: 'modefy-pay-password' */ '../components/modefy-pay-password/modefy-pay-password.vue')
const ModifyWithdrawPasswordComponent = () => import(/* webpackChunkName: 'modify-withdraw-password' */ '../components/modify-withdraw-password/modify-withdraw-password.vue')
const MyBankCardComponent = () => import(/* webpackChunkName: 'my-bank-card' */ '../components/my-bank-card/my-bank-card.vue')
const NewFriendComponent = () => import(/* webpackChunkName: 'new-friend' */ '../components/new-friend/new-friend.vue')
const NewsComponent = () => import(/* webpackChunkName: 'news' */ '../components/news/news.vue')
const OperatorCreditComponent = () => import(/* webpackChunkName: 'operator-credit' */ '../components/operator-credit/operator-credit.vue')
const PersonalInfoComponent = () => import(/* webpackChunkName: 'personal-info' */ '../components/personal-info/personal-info.vue')
const PublishObjectComponent = () => import(/* webpackChunkName: 'publish-object' */ '../components/publish-object/publish-object.vue')
const PurposeComponent = () => import(/* webpackChunkName: 'purpose' */ '../components/purpose/purpose.vue')
const RechargeComponent = () => import(/* webpackChunkName: 'recharge' */ '../components/recharge/recharge.vue')
const SearchFriendComponent = () => import(/* webpackChunkName: 'search-friend' */ '../components/search-friend/search-friend.vue')
const SelectBankCardComponent = () => import(/* webpackChunkName: 'select-bank-card' */ '../components/select-bank-card/select-bank-card.vue')
const SelectFriendComponent = () => import(/* webpackChunkName: 'select-friend' */ '../components/select-friend/select-friend.vue')
const SetPayPasswordComponent = () => import(/* webpackChunkName: 'set-pay-password' */ '../components/set-pay-password/set-pay-password.vue')
const SettingsComponent = () => import(/* webpackChunkName: 'settings' */ '../components/settings/settings.vue')
const TransactionsComponent = () => import(/* webpackChunkName: 'transactions' */ '../components/transactions/transactions.vue')
const TransferDetailComponent = () => import(/* webpackChunkName: 'transfer-detail' */ '../components/transfer-detail/transfer-detail.vue')
const TransferRecordComponent = () => import(/* webpackChunkName: 'transfer-record' */ '../components/transfer-record/transfer-record.vue')
const WannaBorrowComponent = () => import(/* webpackChunkName: 'wanna-borrow' */ '../components/wanna-borrow/wanna-borrow.vue')
const WithdrawComponent = () => import(/* webpackChunkName: 'withdraw' */ '../components/withdraw/withdraw.vue')
const WithdrawSuccessComponent = () => import(/* webpackChunkName: 'withdraw-success' */ '../components/withdraw-success/withdraw-success.vue')
const ZhimaCreditComponent = () => import(/* webpackChunkName: 'zhima-credit' */ '../components/zhima-credit/zhima-credit.vue')
export default new Router({
  routes: [
    {
      path: '/about-pay-password-settings',
      name: 'about-pay-password-settings',
      component: AboutPayPasswordSettingsComponent
    },
    {
      path: '/account-balance',
      name: 'account-balance',
      component: AccountBalanceComponent
    },
    {
      path: '/account-detail',
      name: 'account-detail',
      component: AccountDetailComponent
    },
    {
      path: '/account-statistic',
      name: 'account-statistic',
      component: AccountStatisticComponent
    },
    {
      path: '/active-lender',
      name: 'active-lender',
      component: ActiveLenderComponent
    },
    {
      path: '/add-contact',
      name: 'add-contact',
      component: AddContactComponent
    },
    {
      path: '/add-friend',
      name: 'add-friend',
      component: AddFriendComponent
    },
    {
      path: '/bind-bank-card',
      name: 'bind-bank-card',
      component: BindBankCardComponent
    },
    {
      path: '/black-list',
      name: 'black-list',
      component: BlackListComponent
    },
    {
      path: '/borrow-list',
      name: 'borrow-list',
      component: BorrowListComponent
    },
    {
      path: '/cancel-account',
      name: 'cancel-account',
      component: CancelAccountComponent
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatComponent
    },
    {
      path: '/collection-detail',
      name: 'collection-detail',
      component: CollectionDetailComponent
    },
    {
      path: '/collection-schedule',
      name: 'collection-schedule',
      component: CollectionScheduleComponent
    },
    {
      path: '/complain',
      name: 'complain',
      component: ComplainComponent
    },
    {
      path: '/complain-object',
      name: 'complain-object',
      component: ComplainObjectComponent
    },
    {
      path: '/confirm-cancel-account',
      name: 'confirm-cancel-account',
      component: ConfirmCancelAccountComponent
    },
    {
      path: '/credit',
      name: 'credit',
      component: CreditComponent
    },
    {
      path: '/credit-identity',
      name: 'credit-identity',
      component: CreditIdentityComponent
    },
    {
      path: '/credit-query',
      name: 'credit-query',
      component: CreditQueryComponent
    },
    {
      path: '/credit-query-result',
      name: 'credit-query-result',
      component: CreditQueryResultComponent
    },
    {
      path: '/credit-report',
      name: 'credit-report',
      component: CreditReportComponent
    },
    {
      path: '/',
      name: 'empower',
      component: EmpowerComponent
    },
    {
      path: '/exhibition-status',
      name: 'exhibition-status',
      component: ExhibitionStatusComponent
    },
    {
      path: '/exhibiton-period',
      name: 'exhibiton-period',
      component: ExhibitonPeriodComponent
    },
    {
      path: '/familar-question',
      name: 'familar-question',
      component: FamilarQuestionComponent
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedbackComponent
    },
    {
      path: '/find-lender',
      name: 'find-lender',
      component: FindLenderComponent
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: ForgetPasswordComponent
    },
    {
      path: '/friend-transfer',
      name: 'friend-transfer',
      component: FriendTransferComponent
    },
    {
      path: '/history-lender',
      name: 'history-lender',
      component: HistoryLenderComponent
    },
    {
      path: '/home',
      name: 'home',
      component: HomeComponent,
      children: [
        {
          path: '/find',
          name: 'find',
          component: FindComponent
        },
        {
          path: '/friends',
          name: 'friends',
          component: FriendsComponent
        },
        {
          path: '/index',
          name: 'index',
          component: IndexComponent
        },
        {
          path: '/messages',
          name: 'messages',
          component: MessagesComponent
        },
        {
          path: '/mine',
          name: 'mine',
          component: MineComponent
        }
      ],
      redirect: 'index'
    },
    {
      path: '/identity-verification',
      name: 'identity-verification',
      component: IdentityVerificationComponent
    },
    {
      path: '/immediate-repayment',
      name: 'immediate-repayment',
      component: ImmediateRepaymentComponent
    },
    {
      path: '/iou-center',
      name: 'iou-center',
      component: IouCenterComponent
    },
    {
      path: '/iou-detail',
      name: 'iou-detail',
      component: IouDetailComponent
    },
    {
      path: '/iou-template',
      name: 'iou-template',
      component: IouTemplateComponent
    },
    {
      path: '/lend-list',
      name: 'lend-list',
      component: LendListComponent
    },
    {
      path: '/lending-information',
      name: 'lending-information',
      component: LendingInformationComponent
    },
    {
      path: '/modefy-pay-password',
      name: 'modefy-pay-password',
      component: ModefyPayPasswordComponent
    },
    {
      path: '/modify-withdraw-password',
      name: 'modify-withdraw-password',
      component: ModifyWithdrawPasswordComponent
    },
    {
      path: '/my-bank-card',
      name: 'my-bank-card',
      component: MyBankCardComponent
    },
    {
      path: '/new-friend',
      name: 'new-friend',
      component: NewFriendComponent
    },
    {
      path: '/news',
      name: 'news',
      component: NewsComponent
    },
    {
      path: '/operator-credit',
      name: 'operator-credit',
      component: OperatorCreditComponent
    },
    {
      path: '/personal-info',
      name: 'personal-info',
      component: PersonalInfoComponent
    },
    {
      path: '/publish-object',
      name: 'publish-object',
      component: PublishObjectComponent
    },
    {
      path: '/purpose',
      name: 'purpose',
      component: PurposeComponent
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: RechargeComponent
    },
    {
      path: '/search-friend',
      name: 'search-friend',
      component: SearchFriendComponent
    },
    {
      path: '/select-bank-card',
      name: 'select-bank-card',
      component: SelectBankCardComponent
    },
    {
      path: '/select-friend',
      name: 'select-friend',
      component: SelectFriendComponent
    },
    {
      path: '/set-pay-password',
      name: 'set-pay-password',
      component: SetPayPasswordComponent
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsComponent
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsComponent
    },
    {
      path: '/transfer-detail',
      name: 'transfer-detail',
      component: TransferDetailComponent
    },
    {
      path: '/transfer-record',
      name: 'transfer-record',
      component: TransferRecordComponent
    },
    {
      path: '/wanna-borrow',
      name: 'wanna-borrow',
      component: WannaBorrowComponent
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: WithdrawComponent
    },
    {
      path: '/withdraw-success',
      name: 'withdraw-success',
      component: WithdrawSuccessComponent
    },
    {
      path: '/zhima-credit',
      name: 'zhima-credit',
      component: ZhimaCreditComponent
    }
  ]
})
