import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WebsiteService} from "../../../services/website.service.client";
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId : string;
  pages:any = [{}];
  name:string;
  description:string;
  webId:string;
  errorFlag: boolean;
  errorMsg = 'Name required!';

  constructor(private pageService : PageService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
        }
      );

    this.pages = this.pageService.findPageByWebsiteId(this.webId).subscribe(
      (data:any)=>{
        this.pages = data;
      }
    );
  }

  newpage(){
    if(this.name == null || this.name =='')
    {
      this.errorFlag = true;
      return;
    }
    var temp:any = new Object();
    temp.name = this.name;
    temp.description = this.description;
    this.pageService.createPage(this.webId,temp).subscribe(
      (data:any)=>{
        this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/']);
      }
    );

  }

  gotowid(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pages[i]._id+'/widget']);
  }
  gotoedit(i:string){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+this.pages[i]._id]);
  }

  gotopro(){
    this.router.navigate(['/user/' + this.userId]);
  }

  gotoback(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page']);
  }
  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+'new']);
  }


}
