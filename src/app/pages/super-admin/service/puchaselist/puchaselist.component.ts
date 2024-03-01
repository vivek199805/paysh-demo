import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-puchaselist',
  templateUrl: './puchaselist.component.html',
  styleUrls: ['./puchaselist.component.css']
})
export class PuchaselistComponent implements OnInit {
  details: any = [];
  type:any;
  form:any=FormGroup;
  reqid:any;
  admin_price:any;
  constructor(private _auth: ApiService,private fb:FormBuilder) {
    this.form=this.fb.group({
      type:['',[Validators.required]],
      action:['',[Validators.required]],
      remarks:['',[Validators.required]],
      discount:[''],
    })
   }

  ngOnInit(): void { 
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this._auth.postdata(formdata, config.product1.requestlist).subscribe((res: any) => {
      if (res.statuscode == '200') {
        this.details = res.data
        console.log(res.data); 
      } else {
        Swal.fire({
          title: 'Hurray!!',
          text: 'there no Product list here!',
          icon: 'error'
        });
      }
    })
  }

  action(data: any) {   
    if(data){
      $("#kycStatusModel").modal('show'); 
      this.reqid =data.id;
      this.admin_price = data.price;
    }
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    } else {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('reqid', this.reqid);
    formdata.append('admin_price', (this.form.get('discount').value)?this.form.get('discount').value:this.admin_price);
    formdata.append('status',this.form.get('action').value);
    formdata.append('remarks', this.form.get('remarks').value);
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this._auth.postdata(formdata, config.product.approveddicount).subscribe((res: any) => {
      console.log(res);
      $("#kycStatusModel").modal('hide');
      
    })
  } else if (result.isDenied) {
    Swal.fire('order not placed', '', 'info')
  }
})
  }
  }
}


