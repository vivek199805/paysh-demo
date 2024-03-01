import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
import { EncodeDecode } from 'src/app/_helpers/encode-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-distributor-dashboard',
  templateUrl: './distributor-dashboard.component.html',
  styleUrls: ['./distributor-dashboard.component.css']
})
export class DistributorDashboardComponent implements OnInit {
  alltxn: any;
  mainBalance: any;
  cashBalance: any;
  usertype: any;
  headings: any;
  values: any;
  commission:any;
  datavalue: any;
  constructor(
    private auth: ApiService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.getcurrenttxn('0','Today');
    const encode:any = EncodeDecode('n',localStorage.getItem('LoginDetails'));
    const _permissionlist:any = JSON.parse(encode);
    this.usertype = _permissionlist.usertype;
     console.log(_permissionlist);
     if (_permissionlist.is_kyc == 0) {
       this.getuserdata();
     }
     
  }

  getcurrenttxn(days:any,title:any) {
   this.datavalue = title;
    const formdata = new FormData();
    formdata.append('token', config.tokenauth);
    formdata.append('days', days);
    this.auth.postdata(formdata, config.currenttxn).subscribe((res: any) => {
      if (res.statuscode == 200) { 
        this.commission = res.commission;
        this.headings = res.data.heading;
        let obj:any = [];
        for(let i in res.data.service){
          let child:any = [];  
          for(let j of res.data.service[i]){
            child.push(j);
          }
          obj.push({heading:i.replace('_',' '),children:child})
        }
        this.values = obj;
        console.log(this.values);
        
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message
        });
      }
    });
  }
  getuserdata(){ 
    const formdata = new FormData();
    formdata.append('token', config.tokenauth); 
    this.auth.postdata(formdata, config.getsingleuser).subscribe((res: any) => {  
      if(res.data.is_kyc == 0){
        this.route.navigate(['kyc-upload-documents']); 
      } 
    })
  }
}
