import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-ministatement-txn',
  templateUrl: './ministatement-txn.component.html',
  styleUrls: ['./ministatement-txn.component.css']
})
export class MinistatementTxnComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!:DataTableToolsComponent;
  search:any = {startdate:"",enddate:""};
  maxDate!: Date;
  refundid:any;
  exceldownurl:string = config.downloadstatement.ministatementtxndownload;
  url:string = config.downloadstatement.ministatementtxn;
  bsCustConfg = CustConfg;
  downloadexl:any; 
  form: any =FormGroup;
  ministatementDetails:any;
  @ViewChild('rangePicker') rangePicker:any;
  minDate!: Date;
  columns: any = [
    {
      title: 'User Id',
      data: 'userid'
    },
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: 'Mobile No',
      data: 'mobile'
    },
    {
      title: 'Ackno',
      data: 'ackno'
    }, 
    {
      title: "UTR",
      data: 'utr'
    },
    {
      title: "lastaadharno",
      data: 'last_aadhar'
    },
    {
      title: "transfertype",
      data: 'transfertype'
    },
    {
      title: "bankName",
      data: 'bankName'
    },
    {
      title: "Status",
      data: 'status'
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
      let is_refund = "<a (click)='showRefundModel' #modal data-toggle='modal' data-target='#transactionStatus'  class='btn btn-primary btn-sm ml-2  mb-1'>Details</a>";
      return is_refund;
    }
  }
  ];
  constructor(private api:ApiService) { 
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(),new Date()], [Validators.required]), 
    })
  }

  closeModal(){
    console.log(''); 
    $("#transactionStatus").modal('hide'); 
  }


  funObj(obj: any) {  
    var key = obj.key;
    var value = obj.value;
    this.refundid = obj.value.id;
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.refundid);
    this.api.postdata(formdata, config.downloadstatement.ministatementtxndetails).subscribe((res: any) => {
      if (res.statuscode == 200) {
      console.log(res.data);
      this.ministatementDetails =  res.data;
      }else{
        Swal.fire({
          icon: 'error',
          title: res.message 
        }) 
      }
    })
    
  }

  ngOnInit(): void { 
    const date = new Date(); 
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());    
  }  
  filter() {
    let search:any = {};
    search.startdate =this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
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
        const fileName = 'Mini-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Dmt-Statement');
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

}
