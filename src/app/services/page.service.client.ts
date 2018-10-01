import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class PageService {
  constructor(private http:HttpClient){
  }


  api = {
    'createPage' : this.createPage,
    'findPageById' : this.findPageById,
    'findPageByWebsiteId' : this.findPageByWebsiteId,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };
  createPage(websiteId : string, page : any) {

    page._website = websiteId;

    return this.http.post(environment.baseurl+'/api/website/'+websiteId+'/page',page ).map(
      (res:Response)=>{
        return res;
      }
    );
  }
  findPageById(pageId: string) {
    return this.http.get(environment.baseurl+'/api/page/'+pageId).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }
  findPageByWebsiteId(websiteId: string) {
    return this.http.get(environment.baseurl+'/api/website/'+websiteId+'/page').map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }
  updatePage(pageId:string, page:any) {
    return this.http.put(environment.baseurl+'/api/page/'+pageId, page ).map(
      (res:Response,status:number)=>{
      }
    );
  }
  deletePage(pageId) {
    return this.http.delete(environment.baseurl+'/api/page/'+pageId ).map(
      (res:Response,status:number)=>{
      }
    );
  }
}
