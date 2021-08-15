import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { Admin } from '../Models/admin';
import { UserLogin } from '../Models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  kind:string="password";
  status?:boolean;
  LoginUser!: UserLogin;
  LoginAdmin!:Admin;

  loginform=new FormGroup({
    userId:new FormControl(),
    userPass:new FormControl()
  });

  constructor(private service:ApiCallService,private router:ActivatedRoute, private nav:Router) { }

  ngOnInit(): void {
  }
  ShowHide(){
    if(this.kind==="password")
      this.kind="text";
    else
    this.kind="password";
  }

Login(){
  
  this.service.getUserById(this.loginform.value.userId).subscribe((data:any)=>
  {
    this.LoginUser=data;
    if(this.LoginUser != null){

    if(this.LoginUser.userPass==this.loginform.value.userPass)
  {
    console.log("Correct Login");
    sessionStorage.setItem('username',this.loginform.value.userId);
    sessionStorage.setItem('role','customer');

    if(sessionStorage.getItem('username')!=null){
      this.status=true;
    }
    this.nav.navigateByUrl("UserInfo1");
  }else{
    console.log("Login failed")
    alert("Incorrect Password! Please try again")
  }
  }else{
    alert("Incorrect Username")
  }
}
  )
  
}

AdminLogin(){
  this.service.getAdminById(this.loginform.value.userId).subscribe((data:any)=>
  {
    this.LoginAdmin=data;
    if(this.LoginAdmin == null){
      alert("Incorrect Username")
    }else{    
    if(this.LoginAdmin.adminPass==this.loginform.value.userPass){
      console.log("Correct Admin Login");
      sessionStorage.setItem('adminName',this.loginform.value.userId);
      sessionStorage.setItem('role','admin');
      console.log(sessionStorage.getItem('adminName'));
      this.nav.navigateByUrl('AdminInterface');
    }
    else{
      console.log("Login failed")
      alert("Incorrect Password")
    }
  }
  })

  
}



get name(){
  return this.loginform.get("userId");
}
get pass(){
  return this.loginform.get("userPass");
}
}
