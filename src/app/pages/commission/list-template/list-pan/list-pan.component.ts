import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { config } from 'src/app/service/config';
@Component({
  selector: 'app-list-pan',
  templateUrl: './list-pan.component.html',
  styleUrls: ['./list-pan.component.css']
})
export class ListPanComponent implements OnInit {

  showMenu: boolean | undefined;
  data: any;
  subData: any = [];
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    const formdata = new FormData();
    formdata.append('type', '15');
    formdata.append('token', config.tokenauth);
    this.api.postdata(formdata, config.template.list).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  getData(id: any) {
    // this.subData = []
    const foundIndex = this.data.findIndex((res: any) => res.id == id);
    this.subData = JSON.parse(this.data[foundIndex].commission);
    console.log(this.subData)
  }

}