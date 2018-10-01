import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {createInjectable} from "@angular/compiler/src/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class WebsiteService {
  constructor(private http:HttpClient){
  }

  api = {
    'createUser' : this.createWebsite,
    'findUserById' : this.findWebsiteById,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'updateUser' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };
  createWebsite(userId: string,website:any) {

    website._user = userId ;
    return this.http.post(environment.baseurl+'/api/user/'+userId+'/website',website ).map(
      (res:Response)=>{
        return res;
      }
    );
  }
  findWebsitesByUser(userId: string) {
    return this.http.get(environment.baseurl+'/api/user/'+userId+'/website').map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }
  findWebsiteById(websiteId: string) {
    return this.http.get(environment.baseurl+'/api/website/'+websiteId).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }

  updateWebsite(websiteId:string, website:any) {
    return this.http.put(environment.baseurl+'/api/website/'+websiteId, website ).map(
      (res:Response,status:number)=>{
      }
    );
  }
  deleteWebsite(websiteId:string) {
    return this.http.delete(environment.baseurl+'/api/website/'+websiteId ).map(
      (res:Response,status:number)=>{
      }
    );
  }
}
