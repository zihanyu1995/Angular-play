import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {
  userId : string;
  websites:any = [{}];
  constructor(private _websiteService : WebsiteService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this._websiteService.findWebsitesByUser(this.userId).subscribe(
      (data:any)=>{
        this.websites = data;
      }
    );

  }
  gotopage(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.websites[i]._id+'/page']);
  }
  gotoedit(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.websites[i]._id]);
  }

  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId]);
  }
  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website'+'/new']);
  }
}
