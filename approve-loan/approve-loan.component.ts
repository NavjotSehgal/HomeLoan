import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-approve-loan',
  templateUrl: './approve-loan.component.html',
  styleUrls: ['./approve-loan.component.css']
})
export class ApproveLoanComponent implements OnInit {

  eligible=""
  max!:number
  action!:string
   accountForm!:FormGroup;
   lstatus=new FormGroup({
     loanStatus:new FormControl(''),
   })
   public incomeform=new FormGroup({
     propertyLocation:new FormControl(''),
   propertyName:new FormControl(''),
   estimatedAmount:new FormControl(''),
   typeofEmployment:new FormControl(''),
   retirementage:new FormControl(''),
   organizationType:new FormControl(''),
   employerName:new FormControl(''),
   userId:new FormControl(''),
   monthlyIncome:new FormControl('')
    
     })
    
   public loanform=new FormGroup({
     maxLoanAmountGrantable:new FormControl(''),
     interestRate:new FormControl(''),
     tenure:new FormControl(''),
     loanAmount:new FormControl(''),
     userId:new FormControl(''),
      })
   public personalform=new FormGroup({
     firstName:new FormControl(''),
     middleName:new FormControl(''),
     lastName:new FormControl(''),
     emailID:new FormControl(''),
     password:new FormControl(''),
     phoneNumber:new FormControl(''),
     dateofBirth:new FormControl(''),
     gender:new FormControl(''),
     nationality:new FormControl(''),
     aadharNo:new FormControl(''),
     panNo:new FormControl(''),
     userId:new FormControl(''),
     applicationNumber:new FormControl('')
       })
       appid!:string
     constructor(private fb: FormBuilder,private service: ApiCallService, private router:ActivatedRoute,public nav:Router) { }
   
   ngOnInit(): void {
    this.service.getByIdincome(this.router.snapshot.params['userId']).subscribe((data:any)=>
   this.incomeform=new FormGroup({
   propertyLocation:new FormControl(data["propertyLocation"]),
   propertyName:new FormControl(data["propertyName"]),
   estimatedAmount:new FormControl(data["estimatedAmount"]),
   organizationType:new FormControl(data["organizationType"]),
   employerName:new FormControl(data["employerName"]),
   typeofEmployment:new FormControl(data["typeOfEmployment"]),
   retirementage:new FormControl(data["retirementAge"]),
   userId:new FormControl(data["userId"]),
   monthlyIncome:new FormControl(data["monthlyIncome"])
    
     }) 
   )  
   this.service.getByIdloan(this.router.snapshot.params['userId']).subscribe((data:any)=>
   this.loanform=new FormGroup({
      maxLoanAmountGrantable:new FormControl(data["maxLoanAmountGrantable"]),
   interestRate:new FormControl(data["interestRate"]),
   tenure:new FormControl(data["tenure"]),
   loanAmount:new FormControl(data["loanAmount"]),
   userId:new FormControl(data["userId"])
    })
   ) 
   this.service.getByIdpersonal(this.router.snapshot.params['userId']).subscribe((data:any)=>
   this.personalform=new FormGroup({
   firstName:new FormControl(data["firstName"]),
   middleName:new FormControl(data["middleName"]),
   lastName:new FormControl(data["lastName"]),
   emailID:new FormControl(data["emailId"]),
   password:new FormControl(data["password"]),
   phoneNumber:new FormControl(data["phoneNumber"]),
   dateofBirth:new FormControl(data["dateOfBirth"]),
   gender:new FormControl(data["gender"]),
   nationality:new FormControl(data["nationality"]),
   aadharNo:new FormControl(data["aadharNo"]),
   panNo:new FormControl(data["panNo"]),
   userId:new FormControl(data["userId"]),
   applicationNumber:new FormControl(data["applicationNumber"])
   })
   )
 }
 
 submit(){
 this.lstatus.get('loanStatus')?.setValue("Approved")
 this.service.update(this.router.snapshot.params['userId'],this.lstatus.value).subscribe((data:any)=>
 console.log(data)
 )
 
 let startdate = new Date()
 let enddate=new Date()
 enddate.setFullYear(enddate.getFullYear() +  this.loanform.get('tenure')?.value);
 this.accountForm= this.fb.group
 ({
   loanAmt: this.loanform.get('loanAmount')?.value,
   loanStartDate: startdate,
   loanEndDate: enddate,
   loanTenure: this.loanform.get('tenure'),
   emi: (this.loanform.get('loanAmount')?.value/this.loanform.get('tenure')?.value),
   userId: this.personalform.get('userId')?.value
 })
 this.service.createaccount(this.accountForm.value).subscribe(res => {
   console.log(res)
 });
 alert("Application Approved")
 this.nav.navigateByUrl("application");
    }
 
    Reject(){
 this.lstatus.get('loanStatus')?.setValue("Rejected")
 this.service.update(this.router.snapshot.params['userId'],this.lstatus.value).subscribe((data:any)=>
 console.log(data))
 alert("Application Rejected")
 this.nav.navigateByUrl("application");
    }
}
