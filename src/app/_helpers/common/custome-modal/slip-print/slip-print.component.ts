import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RiCustomMdlService } from '../ri-custom-mdl/ri-custom-mdl.service';

@Component({
  selector: 'app-slip-print',
  templateUrl: './slip-print.component.html',
  styleUrls: ['./slip-print.component.css']
})
export class SlipPrintComponent implements OnInit {
  @Output() closeCallBack = new EventEmitter<any>();
  @Input() riCustomMdlId!: string;
  @Input() recepitListObj: any;

  constructor(private _RiCustomMdlService: RiCustomMdlService) { }

  ngOnInit(): void {
  }
  printInvoice() {
    const printContent: any = document.getElementById("printIt")?.innerHTML;
    const WindowPrt: any = window.open('', '', 'left=0,top=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',fullscreen=yes,toolbar=0,scrollbars=0,status=0');
    let html = `
    <html>
      <head>
        <title>Print tab</title>
        <style>
        table {
         width:100%;
        }
        table, th, td {
          border:1px solid black;
          text-align:left;
          padding: 10px;
        }
      
        .form_blk tr td {
          width: 50%;
        }
      
        .form_blk tr td:first-child {
          text-transform: uppercase;
          font-weight: 700;
        }
      
        .hideOnPrint{
          display:none;
        }
        .table {
          width: 100%;
          margin-bottom: 1rem;
          color: #212529;
      }.table tr td{
        padding: 10px;
      }
        </style>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
      
      </head> 
       <body onload="window.print();">
          ${printContent}
         <div class="alert alert-danger mx-5 d-print-none" role="alert">
          Please close this window.
        </div>
        <div class="text-center d-print-none">
        <button class="btn btn-secondary ml-2" onclick="window.close()">Close</button>
        </div>
      </body>
    </html>`
    WindowPrt.document.write(html);
    WindowPrt.document.close();
    WindowPrt.focus(); 
  }
}
