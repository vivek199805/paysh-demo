import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isActive: boolean = false;
  stename:any='';
  url: string = config.product1.productlist;
  columns: any = [
    {
      title: 'Product Name',
      data: 'product'
    },
    {
      title: 'Price',
      data: 'price'
    },
    {
      title: 'Description',
      data: 'description'
    },
    {
      title: 'Image',
      data: 'image',
      pipe: function (obj: any) {
        return "<a href="+obj.image+" target='_blank'> <img src="+obj.image+" style='width: 80px; height: 80px;'></a>";
      }
    },


    {
      title: "Action",
      data: 'id',
      pipe: function (obj: any) {
        return "<a routerLink='/update-product/" + obj.id + "' class='btn btn-primary btn-sm'>Edit</a>";
      }
    },
    {
      title: "Delete",
      data: 'id',
      pipe: function (obj: any) {
        if (obj.status == 1) {
          return "<a (click)='delete' class='btn btn-success btn-sm'>Acive</a>";
        } else {
          return "<a (click)='delete' class='btn btn-warning btn-sm'>Deactive</a>";
        }
      }
    }

  ];

  constructor(private route: Router, private api: ApiService) { }

  ngOnInit(): void {
  }


  funObj(obj: any) {
    var key = obj.key;
    var value = obj.value;
    switch (key) {
      case "delete":
        //console.log(value);  
        this.stename = (value.status == 0)?'Activate':'Deactivate';
        Swal.fire({
          title: "Are you sure Want to "+this.stename+"?",
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: "Yes, "+this.stename+" it!"
        }).then((result) => {
          if (result.isConfirmed) {
            const formdata = new FormData();
            formdata.append('token', config.tokenauth);
            formdata.append('id', value.id);
            formdata.append('status', (value.status == 0) ? '1' : '0');
            this.api.postdata(formdata, config.product.deleteproduct).subscribe((res: any) => { 
              if (res.statuscode == 200) {  
                this.api.reloadTo('product-list');
              }else{
                Swal.fire(res.message)
              } 
            })
          }
        })

        break;
    }

  }

}
