import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WidgetService} from "../../../services/widget.service.client";


@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {
  userId : string;
  webId:string;
  pId:string;

  name = ["Header","Label","HTML","Text Input","Link","Button","Image","Youtube","Data Table","Repeater"];

  constructor(private widgetService : WidgetService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
          this.pId = params['pid'];
        }
      );

  }

  gotoedit(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget/'+i]);
  }

  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget']);
  }
  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pId+'/widget/'+'new']);
  }
}
