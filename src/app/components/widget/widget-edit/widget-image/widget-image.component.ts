import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../../services/widget.service.client";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId : string;
  webId:string;
  pId:string;
  wgid:string;
  name:string;
  text:string;
  url:string;
  width:string;
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
          this.url = this.widget.url;
          this.width = this.widget.width;
          this.widget.hasOwnProperty("name")
          this.name = this.widget.name;
          this.widget.hasOwnProperty("text")
          this.text = this.widget.text;
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
    temp.url = this.url;
    temp.width = this.width;
    temp.widgetType = "IMAGE";
    if(this.name!=null && this.name!="")
      temp.name = this.name;
    if(this.text!=null && this.text!="")
      temp.text = this.text;
    if(this.wgid.length==3){
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
