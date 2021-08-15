
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { UserLogin } from '../Models/user-login';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  userloginsForm=new FormGroup
  ({
    oldPwd:new FormControl(''),
    userPass:new FormControl(''),
    confirmPwd:new FormControl('')
  })
  login!:UserLogin
  constructor(private service: ApiCallService, 
    private router:ActivatedRoute,
    public fb:FormBuilder
   ) { 
     
    }
    
    
  ngOnInit(): void {
    this.service.getById(this.router.snapshot.params['userId']).subscribe((data:UserLogin)=>{this.login=data })
    this.userloginsForm=this.fb.group({
      oldPwd:['',Validators.required,],
      userPass:['',Validators.required],
      confirmPwd:['',Validators.required]
     
    });
    this.service.getById(this.router.snapshot.params['userId']).subscribe((data)=>  
    this.userloginsForm=new FormGroup({
      oldPwd:new FormControl(''),
      userPass:new FormControl(''),
     confirmPwd:new FormControl('')
    })
    )
  }
  
  submitForm(){
   
    if(this.login.userPass == this.userloginsForm.value.oldPwd)
    {

   
    
    this.login.userPass=this.userloginsForm.value.userPass
    console.log(this.login);
    this.service.updatecp(this.router.snapshot.params['userId'],this.login).subscribe((data)=>
      console.log(data,"Password Updated Successfully")
    )
    alert("Password Updated Successfully")
    }
    else{
      console.log(this.login.userPass);
      console.log( this.userloginsForm.value.oldPwd);
      alert("old password did not match" )
    }
  }  
  get pa()
  {
    return this.userloginsForm.get("oldPwd");
  }
  get pas()
  {
    return this.userloginsForm.get("userPass");
  }
  get cp()
  {
    return this.userloginsForm.get("confirmPwd");
  }
  
}
