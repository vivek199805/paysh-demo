import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { DataTableToolsComponent } from 'src/app/_helpers/data-table-tools/data-table-tools.component';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-kyc-user-list',
  templateUrl: './kyc-user-list.component.html',
  styleUrls: ['./kyc-user-list.component.css']
})
export class KycUserListComponent implements OnInit {
  @ViewChild(DataTableToolsComponent) dt!: DataTableToolsComponent;
  search: any = { startdate: "", enddate: "" };
  maxDate!: Date;
  remarks: any;
  modelObj: any = [];
  url: string = config.kyc.list;
  kycform: any = FormGroup;
  docid: any;
  panImage: any;
  aadhar_front: any;
  aadhar_back: any;
  changest: boolean = false;
  rejectedDoc: boolean = false;

  columns: any = [
    {
      title: 'ID',
      data: 'id'
    },
    {
      title: 'Name',
      data: 'name'
    },
    {
      title: "Firm Name",
      data: 'firmname'
    },
    {
      title: "Email ID",
      data: 'email'
    },
    {
      title: "Date Of Birth",
      data: 'dob',
      pipe: "date"
    },
    {
      title: "Phone No.",
      data: 'phone'
    },
    {
      title: "Pan Number",
      data: 'pannumber'
    },
    {
      title: "Uploaded Document",
      data: 'panimage',
      pipe: function (obj: any) {
        return "<a (click)='uploadeDoc' data-toggle='modal' data-target='#uploadeDoc' class='btn btn-primary'>View</a>";
      }
    },
    {
      title: 'Status',
      data: 'status'
    },
    {
      title: 'Address',
      data: 'address'
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
        if (obj.status == 'Approved') {
          return "-";
        } else {
          return "<a (click)='showStatusModel' class='btn btn-primary'>Action</a>";
        }
      }
    }
  ];

  constructor(
    private datepipe: DatePipe,
    private auth: ApiService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.kycform = this.fb.group({
      remarks: ['', [Validators.required]],
      status: ['', [Validators.required]],
      rejectDoctype: [''],
    });
  }

  ngOnInit(): void {
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.kycform.valueChanges.subscribe((x: any) => {
      console.log(x)
      this.rejectedDoc = x.status == '2' ? true : false;
      if (this.rejectedDoc) {
        this.kycform.controls["rejectDoctype"].setValidators(Validators.required);
      } else {
        this.kycform.controls['rejectDoctype'].clearValidators()
      }

    })
  }

  filter() {
    let search: any = {};
    search.startdate = this.dt.transform(this.search.startdate);
    search.enddate = this.dt.transform(this.search.enddate);
    search.status = this.search.status;
    this.dt.filter(search)
  }
  listing() {
    let search: any = {};
    this.dt.filter(search)
  }
  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "showStatusModel":
        this.docid = value.doc_id;
        this.remarks = value.remarks;
        console.log(value.remarks);
        $("#kycStatusModel").modal('show');
        break;
      case "uploadeDoc":
        this.panImage = value.panimage;
        this.aadhar_back = value.back_image;
        this.aadhar_front = value.front_image;
        break;
    }
  }

  stmodalClose() {
    this.changest = false;
  }

  kycForm() {
    if (!this.kycform.valid) {
      return;
    } else {
      let sta = '';
      if (this.kycform.get('status').value == '1') {
        sta = 'Approved';
      }
      if (this.kycform.get('status').value == '2') {
        sta = 'Rejected';
      }
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to " + sta + " this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const formdata = new FormData();
          formdata.append('token', config.tokenauth);
          formdata.append('doc_id', this.docid);
          formdata.append('status', this.kycform.get('status').value);
          formdata.append('remarks', this.kycform.get('remarks').value);
          formdata.append('reject_type', this.kycform.get('rejectDoctype').value);
          this.auth.postdata(formdata, config.kyc.status).subscribe((res: any) => {
            if (res.statuscode == 200) {
              Swal.fire({
                title: res.message,
                icon: 'success'
              });
              $("#kycStatusModel").modal('hide');
              this.kycform.reset();
              this.listing();
            } else {
              Swal.fire({
                title: res.message,
                icon: 'error'
              });
            }
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Transaction Cancelled',
            'error'
          )
        }
      })

    }
  }

  get f() { return this.kycform.controls; }


}
