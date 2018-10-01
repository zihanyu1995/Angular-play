import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../../services/widget.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  name:string;
  userId : string;
  webId:string;
  pId:string;
  wgid:string;
  text:string;
  size:string;
  widget:any;
  errorFlag: boolean;
  errorMsg = 'Name required!';

  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
          this.pId = params['pid'];
          this.wgid= params['wgid'];
        }
      );
    this.widgetService.findWidgetById(this.wgid).subscribe(
      (data:any)=>{
        this.widget = data;
        if(this.widget!=null){
          this.text = this.widget.text;
          this.size = this.widget.size;
          this.name = this.widget.name;
        }
      }
    );


  }

  update(){
    if(this.name == null || this.name =='')
    {
      this.errorFlag = true;
      return;
    }
    var temp:any = new Object();
    temp.text = this.text;
    temp.size = this.size;
    temp.widgetType = "HEADING";
    if(this.name!=null && this.name!="")
      temp.name = this.name;
    if(this.wgid.length>=3){
      this.widgetService.updateWidget(this.wgid,temp).subscribe(
        (data:any)=>{
          this.gotoback();
        }
      );
    }
    else{
      this.widgetService.createWidget(this.pId,temp).subscribe(
        (data:any)=>{
          this.gotoback();
        }
      );
    }
  }

  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget']);
  }

  delete(){
    this.widgetService.deleteWidget(this.wgid).subscribe(
      (data:any)=>{
        this.gotoback();
      }
    );
  }
}
