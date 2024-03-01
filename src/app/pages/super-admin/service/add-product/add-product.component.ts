import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { LoaderService } from 'src/app/_helpers/common/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('fileUploader', { static: true }) fileUploader!: ElementRef;
  productform: any = FormGroup;
  isEdit: boolean = false;
  editID: any = null;
  showRemark: any;
  formdata: any;
  product: any; 
  price: any;
  docurl: any;
  description: any; 
  image: any;
  imageUrl: any; 

 
  constructor(private route: Router, private fb: FormBuilder, private auth: ApiService, private loader: LoaderService, private rout: ActivatedRoute) {
    this.productform = this.fb.group({
      product: ['', [Validators.required]],
      price: ['', [Validators.required]],
      docurl: [''],
      description: ['', [Validators.required]], 
      image: [''], 
    });
  }
  ngOnInit(): void {
    this.rout.params.subscribe((params: any) => {
      if (typeof params['id'] != 'undefined') {
        this.editID = params['id'];
        this.isEdit = true;
      }
    });
    if (this.isEdit) {
      this.getProductValue();
    }
  } 
  getProductValue() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('id', this.editID);
    this.auth.postdata(formdata, config.product.getproduct).subscribe((res: any) => {
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
  setFormValue(res: any) {
    // let dob = new Date(res.dob);
    this.productform.patchValue({
      product: res.product,
      price: res.price,
      docurl: res.docurl,
      description: res.description, 
      // remarks: res.remarks
    });
    this.imageUrl = res.image;
    this.showRemark = res.remarks;
  }
  onclick() {
    if (!this.productform.valid) {
      console.log('fa');
      
      return;
    } else {
      let url;
      const formdata = new FormData();
      console.log(formdata)
      formdata.append('token', config.tokenauth);
      formdata.append('product', this.productform.get('product')?.value);
      formdata.append('price', this.productform.get('price')?.value);
      formdata.append('docurl', this.productform.get('docurl')?.value);
      formdata.append('description', this.productform.get('description')?.value); 
      formdata.append('image',this.imageUrl);
      if (this.isEdit == true) {
        formdata.append('productid', this.editID);
        url = config.product.updateproduct; 
      } else {
        url = config.product.addproduct;
      } 
      
      this.auth.postdata(formdata,url).subscribe((res: any) => {
        if (res.statuscode == 200) { 
          Swal.fire({
            title: res.message,
            icon: 'success'
          });
          this.route.navigate(['/product-list']);
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message
          });
        }
      });
    }
  }
  handleFileInput(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append('token', config.tokenauth);
      formdata.append('name', file);
      this.auth.postdata(formdata, config.uploadimage).subscribe((data:any) => {
        console.log(data);
        if (data.statuscode == 200) {
          this.imageUrl = data.file;
        } else
          console.error("your image is not uploaded")

      })
    }
  }
  reset() {
    this.productform.reset
  }

  get f() {
    return this.productform.controls
  }

}
