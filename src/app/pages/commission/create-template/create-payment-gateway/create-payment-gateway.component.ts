import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-payment-gateway',
  templateUrl: './create-payment-gateway.component.html',
  styleUrls: ['./create-payment-gateway.component.css']
})
export class CreatePaymentGatewayComponent implements OnInit {
  data: any = null;
  filterDt: any = []
  Template_name: any='';
  constructor(private fb: FormBuilder, private _auth: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getadata();
  }

  getadata() {
    this.data = [{ "id": "1", "category": "PAYMENT GATEWAY", "name": "Debit Card",'shortName':'DC' }, { "id": "2", "category": "PAYMENT GATEWAY", "name": "Credit Card",'shortName':'CC' }, { "id": "3", "category": "PAYMENT GATEWAY", "name": "Net Banking",'shortName':'NB' }, { "id": "4", "category": "PAYMENT GATEWAY", "name": "Corporate",'shortName':'Corporate' },{ "id": "5", "category": "PAYMENT GATEWAY", "name": "EMI",'shortName':'EMI' }],
      this.filterDt = this.data;
      if (this.filterDt && this.filterDt.length > 0) {
        this.filterDt.forEach((i:any) => {
          i['value'] = '0';
          i['is_fixed'] = '0';
        });
      }
    // let formdata: any = new FormData();
    // formdata.append('token', config.tokenauth);
    // formdata.append('type', '10');
    // this._auth.postdata(formdata, config.template.getOperator).subscribe((res: any) => {
    //   if (res.statuscode === 200) {
    //     if (res.data) {
    //       console.log(res)
    //       this.data = res.data;
    //       this.filterDt = this.data;
    //     } else {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'No record found, Please contact with tech team.',
    //       })
    //     }

    //   }
    // });
  }

  onSubmit() {
    var newArray: any = [];
    for (let index = 0; index < this.filterDt.length; index++) {
      const element = this.filterDt[index];
      let item: any = {
        operatorName: element.shortName,
        operatorid: element.id,
        value: element.value,
        is_fixed: element.is_fixed
      };
      newArray.push(item);
    }
    // console.log(newArray)
    if (this.Template_name == '') {
      Swal.fire({
        icon: 'error',
        title: 'Template name is mandetory'
      });
    } else {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '10');
    formdata.append('name', this.Template_name);
    formdata.append('commission', JSON.stringify(newArray));
    this._auth.postdata(formdata, config.template.create).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          icon: 'success',
          title: res.message
        }).then((s) => {
          this.router.navigate(['/commission/list-template/list-payment-gateway'])
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 45 || charCode > 47)) {
      return false;
    }
    return true;

  }

}
