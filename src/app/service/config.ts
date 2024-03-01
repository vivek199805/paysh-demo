/**All the end urls are present here. */

export var config = {
  // Basic Configuration Of Api Start Here
  uploadimage:"user/Uploads/upload",
  login: "auth/login/login",
  changePass: "settings",
  verify: "auth/verify/index",
  getsingleuser:"user/Profile/index",
  ForgotPassword: "settings/forgotpassword",
  resendotp: "verify/resendotponcall",
  currenttxn: "dashboard/dashboard/index",
  mtd_lmtd: "dashboard/analytics/mtd_lmtd",
  walletbalance: "dashboard/dashboard/mainwallet",
  changepassword: "auth/login/changepassword",
  allservicelist: "setting/servicecontrol",
  updateService: "setting/servicecontrol/setcontrol",
  forgotpasswordSentOtp : "auth/login/forgotpasswordsentotp",
  forgotpasswordVerifyOtp : "auth/login/forgotpasswordverifyotp",
  sighnup: "user/selfsignup/create",
  sighnupList: "user/selfsignup/list",
  sighnupStatus: "user/selfsignup/change_status",
  adminFundadd: "funding/admin/add",
  getreferanceid: "unique/unique/index",
  product_wise_volume_share:'dashboard/analytics/product_wise_volume_share',
  business_trend:'dashboard/analytics/business_trend',
  signup: {
    verifyUser: "user/selfsignup/verification",
    verifyOtp: "user/selfsignup/verifyotp",
    input_check: "user/selfsignup/input_check",
    resendotp: "user/selfsignup/resendotp",
    signcreate: "user/selfsignup/create",
    resendsms: "user/selfsignup/resendsms",
   
  },
  opration: {
    debit: "funding/operation/debit",
    receiving: "funding/operation/receiving",
  },
  tree: {
    getSuperDistributorList: 'tree/treedistributor/superdistributor_list',
    getDistributorList: 'tree/treedistributor/distributor_list',
    getRetailerList: 'tree/treedistributor/retailer_list',
  },
  kyc: {
    uploaddoc: "user/retailer/kyc",
    list: "user/retailer/kyc/list",
    status: "user/retailer/kyc/change_status",
    getdocs: "user/retailer/kyc/getdocument",
  },
  merchant: {
    add: "onboard/onboard/getonboardurl",
    list: "onboard/onboard/list",
    details: "onboard/onboard/getdata",
  },
  dmt: {
    getRemmitance: "dmt/remitter/Remitter/getremitter",
    register: "dmt/remitter/Remitter/registerremitter",
    beneregistration: "dmt/remitter/Beneficiary/addreceiver",
    beneLisitng: "dmt/remitter/beneficiary/benelist",
    beneVerify: "dmt/remitter/beneverify/benenameverify",
    generateOTP: "dmt/remitter/Remitter/remitterotp",
    loginremitter: "dmt/remitter/Remitter/remitterlogin",
    bankListing: "dmt/remitter/beneficiary/banklist",
    changePin: "dmt/remitter/Remitter/changempin",
    resendPin: "dmt/remitter/Remitter/resendmpin",
    deleteBeniInit: "dmt/remitter/Updatebeneficiary/deleteinitiate",
    deleteBeniConfirm: "dmt/remitter/Updatebeneficiary/deleteconfirm",
    dmtTransactionInit: "dmt/remitter/transaction/traninitiate",
    dmtTransactionConfirm: "dmt/remitter/Transaction/dotransaction",
    txnstatus: "dmt/remitter/transaction/status",
    dmtTransaction: "dmt/remitter/transaction/list",
    txnStatus: "dmt/remitter/transaction/status",
    refundtxn: "dmt/remitter/refund/resendotp",
    refundOTP: "dmt/remitter/refund",
    pannyDrop: "dmt/remitter/Beneverify",
    gststate: "dmt/remitter/Remitter/getgststate",
  },
  statement: {
    dmt: "statement/dmt/list",
    recharge:"statement/recharge/list",
    rechargequery:"requery/recharge/query",
    rechargerefund:"requery/recharge/refund",
    billpayment:"statement/billpayment/list",
    billpaymentquery:"requery/billpayment/query",
    billpaymentrefund:"requery/billpayment/refund",

    wallet:"statement/wallet/list",
    walletquery:"requery/wallet/query",
    walletrefund:"requery/wallet/refund",
    
    matm:"statement/matmtxn/index",
    aeps:"statement/aepstxn",
    pg:"statement/pg/list",
    debitLedger:"statement/Transactioncashdeposit/list",
    creditLedger:"statement/transaction/list",
    adhaarpay:"statement/aadharpaytxn/list",
    getAadharDetails:"statement/aadharpaytxn/getAadharDetails",
    query:"requery/dmt/query",
    process:"requery/dmt/process",
    refund:"requery/dmt/refund",
    dmtrefundotp:"requery/dmt/sendotp",

    credit:"statement/credit/list",
    debit: "statement/debit/list",
    payout:"statement/payout/list",
    payoutquery:"requery/payout/query",
    payoutrefund:"requery/payout/refund",
    ccpayment:"statement/ccpayment/list",
    ccquery:"requery/Creditcard/query",
    ccrefund:"requery/Creditcard/refund",
    fasttag: "statement/fasttag/list",

    productstmt:"statement/product/list"
  },

  complaint:{
    list: "complaint/CustomerComplaint/complaintlist",
    add: "complaint/CustomerComplaint/complaint",
    chat:"complaint/CustomerComplaint/getrevertbyticketno",
    message:"complaint/CustomerComplaint/complaintrevert",
    adminlist: "complaint/CustomerComplaint/complaintlist",
  },
  CD:{
    sendotp: "cashdeposit/cashdeposit/sendotp",
    verifyotp: "cashdeposit/cashdeposit/verifyotp",
    transact: "cashdeposit/cashdeposit/transact",
  },
  purchase:{
    purchaseid: "purchase/purchase/",
    purchaseHistory: "purchase/purchase/list",
    transfer: "purchase/purchase/transferIds",
  },
  payout:{
    accountlist: "payout/payout/list",
    addaccount: "payout/Payout/add",
    uploaddoc: "payout/Payout/uploaddocument",
    dotxn: "payout/Payout/dotransaction",
    banklist: "payout/payout/banklist",
    txnlist: "payout/Payout/transactionlist",
    txnStatus : "payout/Payout/status",
    verification: "payout/payout/managestatus"
  },
  banner: {
    addImage: 'banner/banner/add_banner_img',
    addText: 'banner/banner/add_banner_text',
    list: 'banner/banner/banner_list',
    updateimage: 'banner/banner/update_banner_text',
    updateText: 'banner/banner/update_banner_img',
    Delete: 'banner/banner/delete_banner',
    bannerList: 'banner/banner/banner_list_das',
  },
  bbps: {
    getcategory: "bbps/billpayment/getcategory",
    operator: "bbps/billpayment/getoperator",
    fetchbill: "bbps/billpayment/fetchbill",
    paybill: "bbps/billpayment/paybill",
    billstatus: "bbps/billpayment/status",
    fetchlicbill: "bbps/licbillpayment/fetchlicbill",
    paylicbill: "bbps/licbillpayment/paylicbill",
  },
  aeps: {
    banklist: "aeps/banklist/index",
    cashwithdraw: "aeps/cashwithdraw/index",
    balanceenquiry: "aeps/balanceenquiry/index",
    ministatement: "aeps/ministatement/index",
    aadharpayment: "aeps/aadharpay/index",
  },
  paytm: {
    sendotp: "wallet/paytm/sendotp",
    verifyotp: "wallet/paytm/verifyotp",
    checkout: "wallet/paytm/checkout"
  },
  mobikwik :{
    sendotp: "wallet/mobikwik/sendotp",
    verifyotp: "wallet/mobikwik/verifyotp",
    checkout: "wallet/mobikwik/checkout"
  },

  downloadstatement: {
    dmt: "statement/dmt/download",
    recharge:"statement/recharge/download",
    billpayment:"statement/billpayment/download",
    wallet:"statement/wallet/download",
    matm:"statement/matmtxn/download",
    aeps:"statement/aepstxn/download",
    creditledger:"statement/transaction/download",  
    debitledger:"statement/Transactioncashdeposit/download", 
    pg:"statement/pg/download",
    adhaarpay:"statement/aadharpaytxn/download",
    getaepstxndetails:"statement/aepstxn/getaepstxndetails",
    ministatementtxn:'statement/ministatementtxn',
    ministatementtxndownload:'statement/ministatementtxn/download',
    ministatementtxndetails:'statement/ministatementtxn/getmstxndetails',
    credit: 'statement/credit/download',
    debit: 'statement/debit/download',
    ccpaymentdownload:"statement/ccpayment/download"
  },

  recharge:{
    prepaid:{
      operator:"recharge/prepaidrecharge/getoperator",
      dorecharge:"recharge/prepaidrecharge/dorecharge",
      hlrcheck: "recharge/hlrapi/check",

      browseplan: "recharge/hlrapi/browseplan",
      disclaimer: "recharge/prepaidrecharge/disclaimer",
    },
    dth:{
      operator:"recharge/dthrecharge/getoperator",
      dorecharge:"recharge/dthrecharge/dorecharge",
      dthinfo: "recharge/hlrapi/dthinfo",
    },
    status:"recharge/prepaidrecharge/status"
  },
  account:{
    admin:{
      list:"user/admin/admin/adminlist",
      create:"user/admin/admin/create",
      update:"user/admin/admin/updateadmin",
      get:"user/admin/admin/getadmin"
    },
    staff:{
      list:"user/staff/staff/stafflist",
      create:"user/staff/staff/create",
      update:"user/staff/staff/updatstaff",
      get:"user/staff/staff/getstaff"
    },
    partner:{
      list:"user/partner/partner/list",
      create:"user/partner/partner/create",
      update:"user/partner/partner/update",
      get:"user/partner/partner/getpartner"
    },
    retailer:{
      list:"user/retailer/Createretailer/retailerlist",
      create:"user/retailer/Createretailer/create",
      update:"user/retailer/Createretailer/updateretailer",
      get:"user/retailer/Createretailer/getretailer"
    },
    supdistributor:{
      list:"user/super_distributor/superdistributor/list",
      create:"user/super_distributor/superdistributor/create",
      update:"user/super_distributor/superdistributor/update",
      get:"user/super_distributor/superdistributor/getsuperdistributor"
    },
    distributor:{
      list:"user/distributor/distributor/list",
      create:"user/distributor/distributor/create",
      update:"user/distributor/distributor/update",
      get:"user/distributor/distributor/getdistributor"
    },
    asm:{
      list:"user/asm/asmdata/listasm",
      create:"user/asm/asmdata/create",
      update:"user/asm/asmdata/update",
      get:"user/asm/asmdata/get"
    }

  },  
  fastTag: {
    fetchOperator: 'fastag/fastag/getoperator',
    fetchDetail: "fastag/fastag/fetchconsumerdetails",
    payFastTag: 'fastag/fastag/dorecharge',
    statementlist: 'statement/Fastag/list',
    statementDoenload: 'statement/Fastag/download'
  },
  icicicashdeposit: {
    sendotp: 'cashdeposit/cashdeposit/sendotp',
    verifyOtp: 'cashdeposit/cashdeposit/verifyotp',
    doTransaction: 'cashdeposit/cashdeposit/transact',
    statementlist: 'statement/Cashdeposit/list',
    statementDoenload: 'statement/Cashdeposit/download',
    refund:"requery/Cashdeposit/refund",
  },
  companybank:{
    create: "company-bank/bank/add",
    list: "company-bank/bank/getlist",
    update: "company-bank/bank/update",
    get: "company-bank/bank/get"
  },
  notification:{
    create: "notification/notification/add",
    list: "notification/notification/getnotifications",
    update: "notification/notification/update",
    get: "notification/notification/getnotifications",
    active: "notification/notification/getActivenotification",
    toggle: "notification/notification/toggle",
    
  },
  fund:{
    lisitngAdmin: "funding/fundrequest/getadmin",
    lisitng:"funding/fundrequest/get",
    request:"funding/fundrequest/create",
    transfer:"funding/fundrequest/transfer",
    admin:{
      details:"funding/fundrequest/getFundingRequestDetail",
      add:"funding/admin/add",
      listing:"funding/fundrequest/getPendingRequestForAdminApproval",
      approve:"funding/admin/approve",
    },
    fundtransfer: "company-bank/bank/transfer",
    fundtransferlist: "company-bank/bank/transferlist",
    banklist: "company-bank/bank/getlist",
  },
  userlist:{
    partner: "user/dropdown/userlist/getpartner",
    superdistributor: "user/dropdown/userlist/getsuperdistributor",
    distributer: "user/dropdown/userlist/getdistributer",
    retailer: "user/dropdown/userlist/getretailer",
    asm: "user/dropdown/userlist/getasm",
  }, 
  userListDropDown: {
    superdistributor: 'user/dropdown/Userlistbysearch/getsuperdistributor',
    partner: 'user/dropdown/Userlistbysearch/getpartner',
    distributor: 'user/dropdown/Userlistbysearch/getdistributor',
    reatiler: 'user/dropdown/Userlistbysearch/getretailer'
  },
  permissionList:"permission/userpermission/index",
  userTypeList:"user/dropdown/userlist/getusertype",
  getSinglePermission:"user/permission/permission/index",
  updateSinglePermission:"user/permission/permission/update",
  setPermission:"permission/userpermission/setPermission",
  setuserRate: "purchase/setpurchase/update_rate",
  pg:{
    getpg:"pg/pg/index",
    pgreceipt: "pg/pg/transactionstatus"
  },
  commission:{
    getcommission: "commission/commission/getcommission",
    userlist: "commission/commission/getuserlist",
    updatecommission: "commission/commission/updatecommission",
    getoptrlist: "commission/commission/getoperatorlist",
  },
  creditCard:{
    requestOtp:"cc-payment/ccpayment/generateotp",
    paybill:"cc-payment/ccpayment/paybill",
    status:"cc-payment/ccpayment/status",
  },
  pan:{
    genrateUrl:"pan/pan/generateurl",
    panstatement:"statement/panstatement/list",
    panstatementdownload:'statement/panstatement/download',
  },

  template: {
    list: 'user/commission/template/list',
    create: 'user/commission/template/create',
    getData: 'user/commission/template/getbyid',
    update: 'user/commission/template/update',
    getOperator: "user/commission/commission/getoperatorlist",
    bbpsoperator: 'user/commission/commission/getbilloperator',
    fastagoperator: "user/commission/commission/getfastagoperatorlist",
    addtemplateforAssign: 'user/commission/commission/assigntempcomm',
    updatetemplateforAssign: 'user/commission/commission/updateassigncomm',
    getTemplatelist: 'user/commission/commission/list'
  },
  product:{
    addproduct: "products/product/create",
    updateproduct: "products/product/update",
    getproduct: "products/product/getbyid",
    deleteproduct : "products/product/softdelete",
    approveddicount:"products/request/approved"
  },
  product1:{
    productlist: "products/product/list",
    image: "user/Uploads/upload",
    listproduct:"products/request/list",
    request : "products/request/send",
    statusrequest : "products/request/status",
    requestlist : "products/request/list"
  },
  // Authentication Configuration Of Api Start Here 
  tokenauth: "808B31E22610AF6077468B9E975521D6",
  Authkey: "MWQyMmUzNWY4YjhlNjY2NWJjM2EzZjY0NjNhZWM0ZTk="
};
