import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';
import { PurchaseProdService } from './servic/purchase-prod.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  listform: any = FormGroup;
  public productdata: any = [];
  public cartList: any = [];
  constructor(private api: ApiService, private _PurchaseProdService: PurchaseProdService,) {

  }

  ngOnInit(): void {


    this.getProductList();

  }
  getProductList() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.product1.statusrequest).subscribe((res: any) => {
      console.log(this.productdata = res.data);

      if (res.statuscode) {
        this.productdata = res.data
        // this.productdata = res.data.filter((dt: any) => {
        //   return dt.status == 1;
        // })  
        // } 

      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }

    });
  }




  purchase_req(data: any) {
    var value = data.value;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('productid', data.productid);
    formdata.append('quantity', '1');
    Swal.fire({
      title: 'Do you want to add this Product?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.postdata(formdata, config.product1.request).subscribe((res: any) => {
          if (res.statuscode == 200) {
            Swal.fire(res.message, '', 'success')
            this.getProductList();
          } else {
            Swal.fire({
              icon: 'error',
              title: res.message
            });
          }
        });

      } else if (result.isDenied) {
        Swal.fire('order not placed', '', 'info')
      }
    })
  }



}
