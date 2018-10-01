import { Component, OnInit ,ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router'
import {SharedService} from '../../../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';
  constructor(private userService: UserService,private router: Router, private sharedService: SharedService) {

  }

  ngOnInit() {
  }

  login() {
// fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // var us :any = new Object();
    // this.userService.findUserByUsername(this.username,this.password).subscribe(
    //   (data:any)=>{
    //     us = data;
    //     if(us == null){
    //       this.errorFlag=true;
    //       return;
    //     }
    //     this.errorFlag=false;
    //     this.router.navigate(['/user/' + us['_id']]);
    //   }
    // );
    this.​userService.login​(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.router.navigate(['/user/' + data['_id']])},
        (error: any) => {
          this.errorFlag=true;
          console.log(error);
        }
      );
  }

}
