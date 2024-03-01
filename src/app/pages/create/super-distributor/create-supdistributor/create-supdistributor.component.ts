import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supdistributor',
  templateUrl: './create-supdistributor.component.html',
  styleUrls: ['./create-supdistributor.component.css']
})
export class CreateSupdistributorComponent implements OnInit {
  form: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  maxDate!: Date;
  asmLisitng: Array<Select2OptionData> = [];
  public options: Options;
  usertype:any;
  showRemark:any;
  constructor(
    private auth: ApiService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['',[Validators.required,Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      firmname: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone   : ['', [Validators.required, Validators.pattern('[6789][0-9]{9}'), Validators.maxLength(10)]],
      status: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required,Validators.maxLength(6)]],
      asm: ['', [Validators.required]],
      pannumber: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      remarks: [''],
    });
    this.options = {
      width: '100%'
    };
   }

   ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
      }
    });

    if(this.isEdit){
      this.getDistributorValue();
    }
    const date = new Date();
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.getASMlist();
    let decode: any = EncodeDecode('n', localStorage.getItem('LoginDetails'));
    let data: any = JSON.parse(decode);    
    this.usertype = data.usertype;
  }

  getASMlist() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.auth.postdata(formdata, config.userlist.asm).subscribe((res: any) => {
      if (res.statuscode == 200) {
        let arr = [];
        for (var v of res.data) {  
          arr.push({id:v.id,text:v.name}); 
        }
        this.asmLisitng = arr;
      }
    else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  getDistributorValue() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('userid', this.editID);
    this.auth.postdata(formdata, config.account.supdistributor.get).subscribe((res: any) => {
      if (res.statuscode == 200) {        
      this.setFormValue(res.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  setFormValue(res: any){
    this.form.patchValue({
      name: res.name,
      username: res.username,
      firmname: res.firmname,
      email: res.email,
      phone: res.phone,
      status: res.status,
      gender: res.gender,
      address: res.address,
      state: res.state,
      city: res.city,
      pincode: res.pincode,
      asm: res.asm,
      pannumber: res.pannumber,
      // remarks: res.remarks
    });
    this.showRemark = res.remarks;
  }

  onSubmit(){
    if(!this.form.valid){
      return;
    }else{
      let url;
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', this.form.get('name').value);
      formdata.append('firmname', this.form.get('firmname').value);
      formdata.append('email', this.form.get('email').value);
      formdata.append('phone', this.form.get('phone').value);
      formdata.append('status', this.form.get('status').value);
      formdata.append('address', this.form.get('address').value);
      formdata.append('gender', this.form.get('gender').value);
      formdata.append('state', this.form.get('state').value);
      formdata.append('city', this.form.get('city').value);
      formdata.append('pincode', this.form.get('pincode').value);
      formdata.append('pannumber', this.form.get('pannumber').value);
      formdata.append('asm', this.form.get('asm').value);
      if(this.isEdit == true){
        formdata.append('remarks', this.form.get('remarks').value);
        formdata.append('userid', this.editID);
        url = config.account.supdistributor.update;
      }else{
        url = config.account.supdistributor.create;
      }
      this.auth.postdata(formdata, url).subscribe((res: any) => {
        if (res.statuscode == 200) {
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          if(this.isEdit == false){
          this.form.reset();
          }
          // this.getDistributorValue();
        }else{
          Swal.fire({
            title: res.message,
            icon: 'error'
          });
        }
      });
    }
  }

  // transform(date: any) {
  //   return this.datepipe.transform(date, 'yyyy-MM-dd');
  // }
  get f() { return this.form.controls; }

}
