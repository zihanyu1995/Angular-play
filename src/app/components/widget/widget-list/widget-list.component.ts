import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WidgetService} from "../../../services/widget.service.client";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId : string;
  webId:string;
  pId:string;
  widgets:any=[{}];
  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private router:Router,public sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
          this.pId = params['pid'];
        }
      );

    this.widgetService.findWidgetByPageId(this.pId).subscribe(
      (data:any)=>{
        this.widgets = data;
      }
    );

  }

  gotoedit(i:string){

    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget/'+this.widgets[i]._id]);
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
