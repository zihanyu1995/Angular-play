import { Component, OnInit } from '@angular/core';
import {WidgetService} from "../../../services/widget.service.client";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  userId : string;
  webId:string;
  pId:string;
  widget:any = new Object();
  url = ["header","new","new","new","new","new","image","youtube","new","new"];
  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private router:Router,public sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
          this.pId = params['pid'];
          if(params['wgid'].length<=2)
            this.widget.widgetType=this.url[params['wgid']];
          else{
            this.widgetService.findWidgetById(params['wgid']).subscribe(
              (data:any)=>{
                var temp = data.widgetType.toLowerCase();
                if(temp=="heading")
                  temp = "header";
                this.widget.widgetType = temp;
              }
            );
          }
        }
      );

  }


  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page']);
  }
  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget/'+'new']);
  }
}
