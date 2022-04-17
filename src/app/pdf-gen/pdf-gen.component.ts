import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
ViewChild
@Component({
  selector: 'app-pdf-gen',
  templateUrl: './pdf-gen.component.html',
  styleUrls: ['./pdf-gen.component.css']
})
export class PdfGenComponent implements OnInit {
@ViewChild('htmlData') htmlData !:ElementRef;
  constructor(private httpClient:HttpClient) { }

  data:any;
  url="https://reqres.in/api/users?page=2"
   baseURL = 'https://api.sampleapis.com/coffee/hot';
  ngOnInit(): void {
 this.get();
 
  
  }
   //baseURL = 'https://api.sampleapis.com/coffee/hot';
 


  public get(){
   
    this.httpClient.get<any>(this.baseURL).subscribe(data=>{
      this.data=data
      console.log( this.data);
    });
  }
  download(){

    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      // PDF.html(this.htmlData.nativeElement),{
      //   callback:(PDF:any)=>{
      //     PDF.save(this.data[0].title);
      //   }
      // }
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(this.data[0].title);
     
    });
  }

}
