import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { CustConfg } from 'src/app/_helpers/common/custom-datepicker/ngx-datePicker-CustConfg';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-enquiry',
  templateUrl: './status-enquiry.component.html',
  styleUrls: ['./status-enquiry.component.css']
})
export class StatusEnquiryComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  @ViewChild('modal', { read: ElementRef }) modal!: ElementRef;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  modelObj: any = [];
  url: string = config.payout.txnlist;
  columns: any = [
    {
      title: 'TXN ID',
      data: 'txnid'
    },
    {
      title: 'Bank name',
      data: 'bankname'
    },
    {
      title: "A/C no",
      data: 'acno'
    },
    {
      title: "IFSC Code",
      data: 'ifsccode'
    },
    {
      title: "Bene Name",
      data: 'benename'
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
      title: "Date",
      data: 'addeddate',
      pipe: "date"
    },
    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a (click)='showStatusModel' class='btn btn-primary'>Status</a>";
      }
    },
    {
      title: "Print",
      pipe: 'print'
    }
  ];
  @ViewChild('rangePicker') rangePicker: any;
  bsCustConfg = CustConfg;
  minDate!: Date;
  form: any = FormGroup;
  constructor(private datepipe: DatePipe, private auth: ApiService) {
    this.form = new FormGroup({
      selectdate: new FormControl([new Date(), new Date()], [Validators.required]),
    })
  }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1950, 1, 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  onDateRangePickerShow() {
    // This is a workaround to show previous month
    var prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    this.rangePicker._datepicker.instance.monthSelectHandler({ date: prevMonth });
  }
  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.form.get('selectdate')?.value[0]);
    search.enddate = this.dt.transform(this.form.get('selectdate')?.value[1]);
    this.dt.filter(search)
  }
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showStatusModel":
        const formdata = new FormData();
        this.modelObj = [];
        formdata.append('token', config.tokenauth);
        formdata.append('txnid', value.txnid);
        formdata.append('refid', value.refid);
        this.auth.postdata(formdata, config.payout.txnStatus).subscribe((res: any) => {
          if (res.statuscode == 200) {
            this.modal.nativeElement.click();
            for (let i in res.data) {
              this.modelObj.push({ heading: i.replace('_', ' '), value: res.data[i] });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });
        break;
    }
  }
}
