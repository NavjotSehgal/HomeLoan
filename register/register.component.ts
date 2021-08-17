import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { UserLogin } from '../Models/user-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  LoanUser!: UserLogin;

  Registeration= new FormGroup({

    uName:new FormControl('', Validators.required),
    userId: new FormControl('', [Validators.required,Validators.minLength(8)]),
    userPass: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]),
    userConPass: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
    dateOfReg:new FormControl(new Date())
  });
  constructor(public service: ApiCallService, private router: Router) { } 

  ngOnInit(): void {
  }
Register(){
    // this.LoanUser=this.Registeration.value
    // console.log(this.LoanUser)
    this.service.getUserById(this.Registeration.value.userId).subscribe((data:any)=>{
      this.LoanUser=data;
      if(this.LoanUser==null){
        this.service.createUser(this.Registeration.value).subscribe(res =>{
          console.log(res);
          console.log('User Registered');
          alert("Registered Succesfully! Please Login with your credentials");
          this.router.navigateByUrl("Login");
        })
      }else{
        alert("Username Already exists!");
      }
    }
    )
   
  }

  get name(){
    return this.Registeration.get("uName");
  }
  get id(){
    return this.Registeration.get("userId");
  }
  get pass(){
    return this.Registeration.get("userPass");
  }
  get Cpass(){
    return this.Registeration.get("userConPass")
  }
  get mail(){
    return this.Registeration.get("email");
  }
  get phone(){
    return this.Registeration.get("phone");
  }
}
