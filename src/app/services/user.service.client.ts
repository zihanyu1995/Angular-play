import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import {createInjectable} from "@angular/compiler/src/core";
import {SharedService} from './shared.service';


@Injectable()
export class UserService {
  constructor(private http:HttpClient, private sharedService:SharedService,private router: Router){

  }
  // baseUrl = environment.baseUrl;

  api = {
    'createUser' : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'findUser' : this.findUser,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser,
    'login' : this.login,
    'logout' : this.logout
  };

  // options = {
  //   headers:{'Content-Type':['application/x-www-form-urlencoded']}
  // };

  logout() {

    return this.http.post(environment.baseurl + '/api/logout', '', {withCredentials : true})
      .map((res: Response) => {
         return res;
        }
      );
  }

  register(username: String, password: String) {

    const user = {
      username : username,
      password : password
    };
    return this.http.post(environment.baseurl + '/api/register', user,{withCredentials : true})
      .map(
        (res: Response) => {
          const data = res;
          return data;
        }
      );
  }

  login(username: String, password: String) {

    const body = {
      username : username,
      password : password
    };
    return this.http.post(environment.baseurl+'/api/login',body, {withCredentials : true})
  .map(
      (res: Response) => {
        const data = res;
        return data;
      }
    );
  }

  loggedIn(){

  return this.http.post(environment.baseurl+ '/api/loggedIn', '',{withCredentials : true})
    .map(
     (res: Response) => {
      const user = res.toString();
      if(user!=='0'){
        this.sharedService.user = user;
        return true;
      }
        else {
  this.router.navigate(['/login']);
  return false;
}
}
);
}

  createUser(user: any) {

   return this.http.post(environment.baseurl+'/api/user',user ).map(
     (res:Response,status:number)=>{
       return res;
     }
   );

  }
  findUserById(userId: string) {

    console.log(userId);
    return this.http.get(environment.baseurl+'/api/user/'+userId).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );

  }
  findUserByUsername(username: string, password: string) {

    return this.http.get(environment.baseurl+'/api/user?username='+username+'&password='+password).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }

  findUser(username: string) {
    return this.http.get(environment.baseurl+'/api/user?username='+username).map(
      (res:Response)=>{
        console.log(res);
        return res;
      }
    );
  }

  updateUser(userId:string, user:any) {


    return this.http.put(environment.baseurl+'/api/user/'+userId, user ).map(
      (res:Response,status:number)=>{
      }
    );

  }
  deleteUser(userId:string) {

    return this.http.delete(environment.baseurl+'/api/user/'+userId).map(
      (res:Response,status:number)=>{
      }
    );
  }
}
