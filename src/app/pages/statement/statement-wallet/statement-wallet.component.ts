import { Component, OnInit, ViewChild } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config'; 
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-statement-wallet',
  templateUrl: './statement-wallet.component.html',
  styleUrls: ['./statement-wallet.component.css']
})
export class StatementWalletComponent implements OnInit {

  @ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
  search:any = {startdate:"",enddate:""};
  maxDate!: Date;
  url:string = config.statement.wallet;
  exceldownurl:string = config.downloadstatement.wallet;
  form: any =FormGroup;
  refundid: any;
    refund: any = FormGroup; 
  @ViewChild('rangePicker') rangePicker:any;
  downloadexl:any;
  columns:any;
  listtype ='statement'
  bsCustConfg = CustConfg;
  minDate!: Date;

  SuperDistributorData:any;
  distributorData:any;
  partnerData:any;
  retailerData:any;

  public morefilter: boolean = false;
  userKeyword = 'userdetails';
  userAutoComData: any;
  superDistributorID: any;
  DistributorID: any;
  PartnerID: any
  retailerID: any;

  objectIDs: any = {
    superdistributorId: '',
    distributorId: '',
    partnerId: '',
    retilerId: '',
  }
  userType:any;
  constructor(private api:ApiService) { 
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]), 
    })
    this.refund = new FormGroup({
      authcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  ngOnInit(): void { 
    const date = new Date(); 
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());    
    if(this.userType === '0'){
      this.columns= [
        {
          title: 'Userid',
          data: 'userid',
          issort: 0
        },
        {
          title: 'Username',
          data: 'username',
          issort: 0
        },
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Mobile no',
          data: 'mobile'
        }, 
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title: "Status",
          data: 'status'
        }, 
        {
          title: "Refunded",
          data: 'refunded'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe: "date"
        },
        {
          title: "Action",
          data: 'id',
          pipe: function (obj: any) {
            let btnStr: any = '';
            let is_query = "<a   routerLink='/statement/walletquery/" + obj.id + "' target='_blank'  class='btn btn-warning btn-sm ml-2 mb-1'>Query</a>";
            let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Refund</a>";
    
            if (obj.is_query == 1) {
              btnStr += is_query;
            } 
            if (obj.is_refund == 1) {
              btnStr += is_refund;
            }
            // console.log(btnStr);
    
            return (obj.is_query == 0 && obj.is_refund == 0) ? 'No Action Found' : btnStr;
          }
        },
        {
          title: "Wallet Type",
          data: 'apitype', 
        }
      ];
    }else{
      this.columns= [
        {
          title: 'Userid',
          data: 'userid',
          issort: 0
        }, 
        {
          title: 'TXN ID',
          data: 'txnid'
        },
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Mobile no',
          data: 'mobile'
        }, 
        {
          title: "Amount",
          data: 'amount',
          pipe: "currency"
        },
        {
          title: "Status",
          data: 'status'
        }, 
        {
          title: "Refunded",
          data: 'refunded'
        },
        {
          title: "Date",
          data: 'addeddate',
          pipe: "date"
        }, 
        {
          title: "Wallet Type",
          data: 'apitype', 
        }
      ];
    }
  }  

  searchCleared() {
    this.superDistributorID = null;
    this.DistributorID = null;
    this.PartnerID = null;
    this.retailerID = null;
  }

  selectSuperDistributor(item: any) {
    this.superDistributorID = item.id
  }

  selectDistributor(item: any) {
    this.DistributorID = item.id
  }

  selectPartner(item: any) {   
    this.PartnerID = item.id
  }

  selectRetailer(item: any) {
    // do something with selected item
    //console.log(item);
    this.retailerID = item.id
  }

  forSuperDistributorData(val: any) {
    if (val != this.superDistributorID) {
      this.superDistributorID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdistributor', val);
      this.api.postdata(formdata, config.userListDropDown.superdistributor).subscribe((res: any) => {
        console.log(res);
        
        if (res.data == undefined) {
          this.SuperDistributorData = [];
        } else {
          this.SuperDistributorData = res.data;
        }
      });
    }
  }

  forDistributorData(val: any) {
    if (val != this.DistributorID) {
      this.DistributorID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partnerId', this.PartnerID);
      formdata.append('distributor', val);
      this.api.postdata(formdata, config.userListDropDown.distributor).subscribe((res: any) => {
        if (res.data == undefined) {
          this.distributorData = [];
        } else {
          this.distributorData = res.data;
        }
      });
    }
  }


  forPartnerData(val: any) {
    if (val != this.PartnerID) {
      this.PartnerID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partner', val);
      this.api.postdata(formdata, config.userListDropDown.partner).subscribe((res: any) => {
        if (res.data == undefined) {
          this.partnerData = [];
        } else {
          this.partnerData = res.data;
        }
      });
    }
  }


  forRetailerData(val: any) {
    if (val != this.retailerID) {
      this.retailerID = val;
      let formdata: any = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('retailer', val);
      formdata.append('superdisId',this.superDistributorID );
      formdata.append('partnerId', this.PartnerID);
      formdata.append('distributorId', this.DistributorID);
      this.api.postdata(formdata, config.userListDropDown.reatiler).subscribe((res: any) => {
        if (res.data == undefined) {
          this.retailerData = [];
        } else {
          this.retailerData = res.data;
        }
      });
    }
  }

  filter() {
    let search:any = {};
    search.startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);

    this.objectIDs.superdistributorId=this.superDistributorID === null ? '' : this.superDistributorID;
    this.objectIDs.distributorId=this.DistributorID === null ? '' : this.DistributorID;
    this.objectIDs.partnerId=this.PartnerID === null ? '' : this.PartnerID;
    this.objectIDs.retilerId=this.retailerID === null ? '' : this.retailerID;

    this.dt.filter(search)
  }

  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }

  download($event: any){
    let startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate)); 
    this.api.postdata(formdata, this.exceldownurl).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Wallet-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Wallet-Statement');
        XLSX.writeFile(wb, fileName);
      }else{
        Swal.fire({
          icon: 'error',
          title: res.message 
        }) 
      }
    });
  }
  GetChildData(data:any){  
    this.downloadexl =data;
  } 
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    this.refundid = obj.value.id;
    // console.log(value);

  }
  
  closeModal() {
    console.log('');
    $("#transactionStatus").modal('hide');
  }
  request_refund() {
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.refundid);
    formdata.append('authcode', this.refund.get('authcode')?.value);
    this.api.postdata(formdata, config.statement.walletrefund).subscribe((res: any) => {
      if (res.statuscode == 200) {
        this.closeModal();
        this.filter();
        Swal.fire({
          title: res.message,
          icon: 'success'
        });
        this.refund.reset();
      } else {
        this.refund.reset();
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    })
  }
  get r() {
    return this.refund.controls
  }
}
