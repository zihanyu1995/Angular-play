import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";
@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId : string;
  websites:any = [{}];
  name:string;
  description:string;
  webId:string;
  errorFlag: boolean;
  errorMsg = 'Name required!';

  constructor(private _websiteService : WebsiteService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
        }
      );

     this._websiteService.findWebsitesByUser(this.userId).subscribe(
      (data:any)=>{
        this.websites = data;
      }
    );
    this._websiteService.findWebsiteById(this.webId).subscribe(
      (data:any)=>{
        var web:any = data;
        this.name=web.name;
        this.description = web.description;
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
    temp.name = this.name;
    temp.description = this.description;
    this._websiteService.updateWebsite(this.webId,temp).subscribe(
      (data:any)=>{
        this.router.navigate(['/user/' + this.userId+'/website']);
      }
    );

  }

  gotopage(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.websites[i]._id+'/page']);
  }
  gotoedit(i:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/user/' + this.userId+'/website/'+this.websites[i]._id]));
  }

  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId+'/website']);
  }

  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website'+'/new']);
  }

  delete(){
    this._websiteService.deleteWebsite(this.webId).subscribe(
      (data:any)=>{
        this.router.navigate(['/user/' + this.userId+'/website']);
      }
    );
  }
}
