import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { config } from 'src/app/service/config';
import { CustomValidators } from 'src/app/_helpers/common/custom-validator/commission-validator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-cc-bil',
  templateUrl: './edit-cc-bil.component.html',
  styleUrls: ['./edit-cc-bil.component.css']
})
export class EditCCBILComponent implements OnInit {
  data: any = null;
  filterDt: any = []
  Template_name: any;
  templateId:any;
  constructor(private fb: FormBuilder, private _auth: ApiService, private router: Router,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((res: any) => {
      this.templateId = res['id'];
    })
    this.getData1();
  }

  getData1(){
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('tepid', this.templateId);
    this._auth.postdata(formdata, config.template.getData).subscribe((res: any) => {
      if (res.statuscode == 200) {
        console.log(res.data);
        console.log(res.data.name);
        console.log(JSON.parse(res.data.commission));
        this.Template_name = res.data.name;
        this.filterDt =JSON.parse(res.data.commission);
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }


  onSubmit() {
    var newArray: any = [];
    for (let index = 0; index < this.filterDt.length; index++) {
      const element = this.filterDt[index];
      let item: any = {
        // comm_superdistributor: element.comm_superdistributor,
        // comm_partner: element.comm_partner,
        // comm_distributor: element.comm_distributor,
        charges_retailer: element.charges_retailer,
        charges_type: element.charges_type
      };
      newArray.push(item);
    }

    console.log(newArray)

    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('type', '17');
    formdata.append('tepid',this.templateId );
    formdata.append('name', this.Template_name);
    formdata.append('commission', JSON.stringify(newArray));
    this._auth.postdata(formdata, config.template.update).subscribe((res: any) => {
      if (res.statuscode == 200) {
        Swal.fire({
          icon: 'success',
          title: res.message
        }).then((s) => {
          this.router.navigate(['/commission/list-template/list-cc-bill'])
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 45 || charCode > 47)) {
      return false;
    }
    return true;

  }

}
