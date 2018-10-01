import { Component, OnInit ,ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from "../../../services/user.service.client";
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('r') registerForm: NgForm;

  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Username exsit!';
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
  }
  register() {
// fetching data from registerForm
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    var us = this.userService.findUser(this.username).subscribe(
      (data:any)=>{
        us = data;
        if(us != null){
          this.errorFlag=true;
          return;
        }
        this.errorFlag=false;
        var nus:any = new Object();
        nus.username = this.username;
        nus.password = this.password;
        nus.firstName = 'N/A';
        nus.lastName = 'N/A';
        // this.userService.createUser(nus).subscribe(
        //   (data:any)=>{
        //     this.userService.findUser(this.username).subscribe(
        //       (data:any)=>{
        //         var id = data._id;
        //         this.router.navigate(['/user/' + id]);
        //       }
        //     )
        //   }
        // );

        this.userService.register(this.username, this.password)
          .subscribe(
            (data: any) => {
              this.router.navigate(['/user/' + data._id]);
            },
            (error: any) => {
              // this.error = error._body;
            }
          );

      }
    );

  }
}
