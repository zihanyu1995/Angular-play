import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service.client";

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId : string;
  webId:string;
  pages:any =[{}];
  constructor(private pageService : PageService, private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.webId = params['wid'];
        }
      );

     this.pageService.findPageByWebsiteId(this.webId).subscribe(
      (data:any)=>{
        this.pages = data;
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
    this.router.navigate(['/user/' + this.userId+'/website/']);
  }
  gotonew(){
    this.router.navigate(['/user/' + this.userId+'/website/'+this.webId+'/page/'+'new']);
  }
}
