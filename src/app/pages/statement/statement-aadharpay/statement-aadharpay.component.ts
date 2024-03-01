import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-statement-aadharpay',
  templateUrl: './statement-aadharpay.component.html',
  styleUrls: ['./statement-aadharpay.component.css']
})
export class StatementAadharpayComponent implements OnInit {
  listtype ='statement'
  accessmode: any;
  aepsrefId: any;
  profit: any;
  aadharpayrefid: any;
  mobile: any;
  lat: any;
  longt: any;
  last_aadhar: any;
  bankiiin: any;
  bankName: any;
  remarks: any;
  ipaddress: any;
  dateadded: any;
  deviceimei: any;
  devicemi: any;
 userType:any;
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  form: any = FormGroup;
  @ViewChild('rangePicker') rangePicker: any;
  url: string = config.statement.adhaarpay;
  exceldownurl: string = config.downloadstatement.adhaarpay;
  downloadexl: any;
  columns: any = [
    {
      title: 'Id',
      data: 'id'
    },
    {
      title: 'User Name',
      data: 'username'
    },
    {
      title: 'Serial Number',
      data: 'serialnumber'
    },
    {
      title: 'Amount',
      data: 'amount',
      pipe: "currency"
    }, 
    {
      title: 'Ackno',
      data: 'ackno',
      pipe:'showNullResult'
    },
    {
      title: "UTR",
      data: 'utr'
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
        return "<a (click)='addharpay' data-toggle='modal' data-target='#addharpaydetails' class='btn btn-primary'>Details</a>";
      }
    },
  ];
  bsCustConfg = CustConfg;
  minDate!: Date; 
  public morefilter: boolean = false;
  userKeyword = 'userdetails';
  superDistributorID: any;
  DistributorID: any;
  PartnerID: any
  retailerID: any;

  SuperDistributorData: any;
  distributorData: any;
  partnerData: any;
  retailerData: any;

  objectIDs: any = {
    superdistributorId: '',
    distributorId: '',
    partnerId: '',
    retilerId: '',
  }


  constructor(private api: ApiService) {
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);
    this.userType = data.usertype
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
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
      formdata.append('superdisId', this.superDistributorID);
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
      formdata.append('superdisId', this.superDistributorID);
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
      formdata.append('superdisId', this.superDistributorID);
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

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
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

  download($event: any) {
    let startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    let enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    let formdata: any = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('startdate', (startdate === null ? '' : startdate));
    formdata.append('enddate', (startdate === null ? '' : enddate));
    this.api.postdata(formdata, config.downloadstatement.adhaarpay).subscribe((res: any) => {
      if (res.statuscode == 200) {
        const fileName = 'Addhar-pay-Statement.xlsx';
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(res['data']);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Addhar-pay-Statement');
        XLSX.writeFile(wb, fileName);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        })
      }
    });
  }
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value; 
    
    switch (key) { 
      case "addharpay":
        const formdata = new FormData();
        formdata.append('token', config.tokenauth);
        formdata.append('id', value.id);
        this.api.postdata(formdata, config.statement.getAadharDetails).subscribe((res: any) => { 
          console.log( res.data);
          this.aepsrefId = res.data.aepsrefId;
          this.accessmode = res.data.accessmode;
          this.profit = res.data.profit;
          this.aadharpayrefid = res.data.aadharpayrefid;
          this.mobile = res.data.mobile;
          this.lat = res.data.lat;
          this.longt = res.data.longt;
          this.last_aadhar = res.data.last_aadhar;
          this.bankiiin = res.data.bankiiin;
          this.bankName = res.data.bankName;
          this.remarks = res.data.remarks;
          this.ipaddress = res.data.ipaddress;
          this.dateadded = res.data.dateadded;
          this.deviceimei = res.data.deviceimei;
          this.devicemi = res.data.devicemi; 
        })
        break;
    }
  }
  GetChildData(data: any) {
    this.downloadexl = data;
  }
}
