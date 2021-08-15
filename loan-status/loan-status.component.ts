import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { AccountInfo } from '../Models/account-info';
import { PersonalDetails } from '../Models/personal-details';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {

  kind:string="password";
  hidestatus:string="none";

  password!:string;

  appDetails!:PersonalDetails;
  accDetails!:AccountInfo;

  accountstatus?:string;
  status!:string;

  StatusForm!:FormGroup

  constructor(public fb: FormBuilder,private router:Router, public service:ApiCallService) { }

  ngOnInit(): void {
    this.StatusForm=this.fb.group({
      applicationNo: ['',Validators.required,Validators.pattern('^[0-9]*')],
      Password: ['',Validators.required]
    })
  }
  get app(){
    return this.StatusForm.get("applicationNo");
  }
  
  get pass(){
    return this.StatusForm.get("Password");
  }

  ShowHide(){
    if(this.kind==="password")
      this.kind="text";
    else
    this.kind="password";
  }

  
  Submit(){
    this.password=this.StatusForm.get('Password')!.value;
    
      this.service.getByApp(this.StatusForm.value.applicationNo).subscribe(data=>{
        if(data==null){
          alert("Invalid appointment number");
        }
        else{
        console.log(data),
        this.appDetails=data;

        if(this.password!=this.appDetails.password){
          alert("Invalid Password");
        }
        else{
          this.status=this.appDetails.loanStatus;
          this.hidestatus="block";
          if (this.appDetails.loanStatus=="Approved"){
            this.accountstatus="block";
            this.service.getAccById(this.appDetails.userId).subscribe(data=>{
              console.log(data);
              this.accDetails=data;
            });
          }
          else
            this.accountstatus="none";
        }
        }
      });
    }
}
