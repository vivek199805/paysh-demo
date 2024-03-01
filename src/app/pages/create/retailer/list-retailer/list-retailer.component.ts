import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/service/config';
import { UserLoginDtlService } from 'src/app/service/user-login-dtl.service';
@Component({
  selector: 'app-list-retailer',
  templateUrl: './list-retailer.component.html',
  styleUrls: ['./list-retailer.component.css']
})
export class ListRetailerComponent implements OnInit {
  url: string = config.account.retailer.list; 
  userType:any;
  columns : any = [];
  
  constructor(private localsession:UserLoginDtlService) { }

  ngOnInit(): void { 
    this.localsession.geterUserLoginDtl.subscribe((val: any) => {  
      this.userType = val.usertype;
        this.columns = [ 
          {
            title: 'Username',
            data: 'username'
          },
          {
            title: 'Name',
            data: 'name'
          },
          {
            title: 'Email',
            data: 'email'
          },
          {
            title: 'Phone no',
            data: 'phone'
          },
          {
            title: 'Firm name',
            data: 'firmname'
          },
          {
            title: "Date",
            data: 'addeddate',
            pipe:'date'
          },
          {
            title: "Status",
            data: 'status', 
          },
          {
            title: "Action",
            data: 'id',
            pipe: function (obj:any) {  
              let btnStr: any = '';  
              let retailer = "<a routerLink='/account/retailer/update/"+obj.id+"' class='btn btn-primary'>Edit</a>"; 
            
              
              if(val.usertype == '0'){
                btnStr += retailer;  
              }
              return (btnStr =='')?'No Action Found':btnStr;
             
            }
          }
        ]; 
       
    }) 
    
  }

  funObj(obj: any) {  
    var key = obj.key;
    var value = obj.value; 
    
  }
}
