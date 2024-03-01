import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { threadId } from 'worker_threads';
import { RiCustomMdlService } from 'src/app/_helpers/common/custome-modal/ri-custom-mdl/ri-custom-mdl.service';
import { LoaderService } from 'src/app/_helpers/common/loader.service';

@Component({
  selector: 'app-bbps-partner',
  templateUrl: './bbps-partner.component.html',
  styleUrls: ['./bbps-partner.component.css']
})
export class BbpsPartnerComponent implements OnInit {
  operator: any;
  longitute: any;
  latitute: any;
  bbpsInformation: any;
  form: any = FormGroup;
  public options: Options;
  operators: Array<Select2OptionData> = [];
  heading: string = "";
  isOperator: boolean = false
  viewbill: boolean = false
  fetchBill: any = null;
  subheading: any;
  subinputfeild: boolean = false;
  invoiceObj: any = false;

  mdlId: any = 'testRecipt';
  constructor(private auth: ApiService,
    private fb: FormBuilder,
    private route: Router,
    private loader: LoaderService,
    private _RiCustomMdlService: RiCustomMdlService) {
    this.options = {
      width: '100%',
      templateSelection: (object: any) => {
        this.valueChange(object)
        return object && object.text;
      }
      /* ,templateResult: (object: any) => {
        return object && object.name;
      } */
    };
    this.form = this.fb.group({
      operator: ['', [Validators.required]],
      code: ['', [Validators.required]],
      subcode: [''],
    });
  }


  ngOnInit(): void {
    if (typeof (localStorage.getItem('bbpsInformation')) !== 'undefined' && localStorage.getItem('bbpsInformation') !== '' && localStorage.getItem('bbpsInformation') !== null) {
      let decode: any = EncodeDecode('n', localStorage.getItem('bbpsInformation'));
      this.bbpsInformation = JSON.parse(decode);

      this.fetch_bbps_dropdown().then((res: any) => {
        this.operators = res.data;
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: error.message
        });
      });
    } else {
      this.route.navigate(['bbps']);
    }

    this.auth.getLocationService().then(resp => {
      this.longitute = resp.lng;
      this.latitute = resp.lat;
    })

  }

  fetch_bbps_dropdown() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('category', this.bbpsInformation.name);
    return this.auth.postdata(formdata, config.bbps.operator).toPromise();
  }

  valueChange(obj: any) {
    console.log(this.subinputfeild);
    

    if (obj.selected) {
      this.heading = obj.displayname;
      this.isOperator = true
      if (obj.regex != null) {
        this.form.controls["code"].setValidators([Validators.required, Validators.pattern(obj.regex)]);
      }
      if (obj.viewbill == '1') {
        this.viewbill = true
      } else {
        this.viewbill = false
      }
    }
    if (obj.ad1_name) {
      this.subheading = obj.ad1_d_name;
      if(obj.ad1_name != 'null'){
         this.subinputfeild = true;
      }
     // this.subinputfeild = true;
      if (obj.ad1_regex != null) {
        this.form.controls["subcode"].setValidators([Validators.required, Validators.pattern(obj.ad1_regex)]);
      }
    }
  }

  onSubmit() {
    this.loader.loaderEvent.emit(true)
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.form.get('operator').value);
    formdata.append('canumber', this.form.get('code').value);
    formdata.append('amount', this.fetchBill.amount);
    formdata.append('referenceid', this.form.get('code').value);
    formdata.append('latitude', this.latitute);
    formdata.append('longitude', this.longitute);
    formdata.append('bill_fetch', JSON.stringify(this.fetchBill));
    this.auth.postdata(formdata, config.bbps.paybill).subscribe((res: any) => {

      if (res.statuscode == 200) {
        this.loader.loaderEvent.emit(false)
        Swal.fire({
          icon: 'success',
          title: res.message,
        })
          .then((result) => {
            this.invoiceObj = res.data;
            this._RiCustomMdlService.open(this.mdlId);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        }).then((result) => {
          this.invoiceObj = res.data;
          this._RiCustomMdlService.open(this.mdlId);
        });;
      }
    });
  }
  viewBill() {
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('operator', this.form.get('operator').value);
    formdata.append('canumber', this.form.get('code').value);
    this.auth.postdata(formdata, config.bbps.fetchbill).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        this.fetchBill = res.data;
        console.log(res.data);
        
        this.viewbill = false;
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }

  get f() { return this.form.controls; }

  goBack() {
    localStorage.removeItem('bbpsInformation');
    this.route.navigate(['bbps']);
  }

  slipClose() {
    const url = this.route.url;
    this._RiCustomMdlService.close(this.mdlId);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([url]);
    });
  }
  validatePayButton() {
    if (this.form.valid && +this.fetchBill.amount > 0) {
      return false;
    } else {
      return true;
    }
  }

}
