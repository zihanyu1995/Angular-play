import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class WidgetService {
  constructor(private http:HttpClient){
  }

  api = {
    'createWidget' : this.createWidget,
    'findWidgetById' : this.findWidgetById,
    'findWidgetByPageId' : this.findWidgetByPageId,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };
  createWidget(pageId : string, Widget : any) {

    Widget._page = pageId ;
    return this.http.post(environment.baseurl+'/api/page/'+pageId+'/widget',Widget ).map(
      (res:Response)=>{
        return res;
      }
    );
  }
  findWidgetById(WidgetId: string) {
    return this.http.get(environment.baseurl+'/api/widget/'+WidgetId).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }
  findWidgetByPageId(pageId: string) {
    return this.http.get(environment.baseurl+'/api/page/'+pageId+'/widget').map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }
  updateWidget(WidgetId, Widget:any) {
    return this.http.put(environment.baseurl+'/api/widget/'+WidgetId, Widget ).map(
      (res:Response,status:number)=>{
      }
    );
  }
  deleteWidget(WidgetId) {
    return this.http.delete(environment.baseurl+'/api/widget/'+WidgetId ).map(
      (res:Response,status:number)=>{
      }
    );
  }
}
