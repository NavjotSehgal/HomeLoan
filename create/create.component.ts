import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { IncomeDetails } from '../Models/income-details';
import { LoanDetails } from '../Models/loan-details';
import { PersonalDetails } from '../Models/personal-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  addUserForm!: FormGroup;
  incomedetails!:IncomeDetails;
  loandetails!:LoanDetails;
  personaldetails!:PersonalDetails;
  uploaddocuments!:any;
  income_step = false;
  Personal_step = false;
  Loan_step = false;
  upload_step=false
  step = 1;
  maxLoan!:number;
  ROI:number=8.5;
  duration!:number;
  status!:boolean;
  
  constructor
  (
    private fb: FormBuilder,
    private router: Router,
    public service: ApiCallService
  ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('username')!=null){
      this.status=true;
    }else{
      this.status=false;
      alert("Please Login");
      this.router.navigateByUrl("Login");
    }
    this.addUserForm =this.fb.group
    ({
      incomedetailsForm: this.fb.group
      ({
       propertyLocation: ['', Validators.required],
       propertyName: ['', Validators.required],
       estimatedAmount: ['', Validators.required],
       typeOfEmployment: ['', Validators.required],
       retirementAge: ['', Validators.required],
       organizationType: ['', Validators.required],
       employerName: ['',Validators.required],
       monthlyIncome:['',Validators.required],
       userId:sessionStorage.getItem('username')
     }),
      loandetailsForm: this.fb.group
      ({
       maxLoanAmountGrantable: ['', Validators.required],
       interestRate: ['', Validators.required],
       tenure: ['',Validators.required],
       loanAmount: ['', Validators.required],
       userId:sessionStorage.getItem('username')
      }),
      personaldetailsForm : this.fb.group
      ({
       firstName: ['', Validators.required],
       middleName: ['', Validators.required],
       lastName: ['', Validators.required],
       emailId: ['', Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
       password: ['', Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')],
       confirmPassword: ['', Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')],
       phoneNumber: ['', Validators.required],
       dateOfBirth: ['', Validators.required],
       gender: ['',Validators.required],
       nationality: ['', Validators.required],
       aadharNo: ['', Validators.required],
       panNo: ['', Validators.required],
       userId:sessionStorage.getItem('username')
      })
    })
  }
  get incomedetailsForm(): any 
  { return this.addUserForm.get('incomedetailsForm'); }
  get loandetailsForm(): any
  { return this.addUserForm.get('loandetailsForm'); }
  get personaldetailsForm(): any
 { return this.addUserForm.get('personaldetailsForm'); }
  
  changeroi()
  {
    if(this.duration <= 5)
    {
    this.ROI=8;
    }
    else if(this.duration >5 && this.duration <= 10)
    {
      this.ROI=10;
    }
    else
    {
    this.ROI=12;
    }
    console.log(this.duration);
  }
  
  next()
  {

    if(this.step==1)
    {
      this.income_step = true;
      if (this.incomedetailsForm.invalid) { return  }
      this.step++
      this.maxLoan=60 * (0.6 * this.incomedetailsForm.value.monthlyIncome); 
    //this.eligibilityDis=this.EligibilityCalculator.value.eligibility;
    console.log(this.maxLoan);
    console.log(this.incomedetailsForm.value);
    
    }

    if(this.step==2)
    {
      this.Loan_step = true;
      if (this.loandetailsForm.invalid) { return }
      this.step++;
      
    }
    if(this.step==3)
    {
      this.Personal_step= true;
      if (this.personaldetailsForm.invalid) { return }
      this.step++;
    }
  }

  previous()
  {

    this.step--
    if(this.step==1)
    {
      this.income_step = false;
    }
    if(this.step==2)
    {
      this.Loan_step = false;
    }
    if(this.step==3)
    {
      this.Personal_step = false;
    }

  }

   submitForm() {
    this.incomedetails=this.incomedetailsForm.value
    console.log(this.incomedetails)
    this.service.create(this.incomedetailsForm.value).subscribe(res => {
      console.log(res)
      console.log('Income details Filled!')
    });
    this.loandetails=this.loandetailsForm.value
    console.log(this.loandetails)
    this.service.createl(this.loandetailsForm.value).subscribe(res => {
      console.log(res)
      console.log('Loan details Filled!')
    });
    this.personaldetails=this.personaldetailsForm.value
    console.log(this.personaldetails)
    this.service.createp(this.personaldetailsForm.value).subscribe(res => {
      console.log(res)
      console.log('Personal details Filled!')
      alert("APPLICATION SUBMITTED")
    });
  }
  get pl()
  {
    return this.incomedetailsForm.get("propertyLocation");
  }
  get pn()
  {
    return this.incomedetailsForm.get("propertyName");
  }
  get ea()
  {
    return this.incomedetailsForm.get("estimatedAmount");
  }
  get toe()
  {
    return this.incomedetailsForm.get("typeOfEmployment");
  }
  get ra()
  {
    return this.incomedetailsForm.get("retirementAge");
  }
  get ot()
  {
    return this.incomedetailsForm.get("organizationType");
  }
  get en()
  {
    return this.incomedetailsForm.get("employerName");
  }
  get mi()
  {
    return this.incomedetailsForm.get("monthlyIncome");
  }
  get ml()
  {
    return this.loandetailsForm.get("maxLoanAmountGrantable");
  }
  get ir()
  {
    return this.loandetailsForm.get("interestRate");
  }
  get te()
  {
    return this.loandetailsForm.get("tenure");
  }
  get la()
  {
    return this.loandetailsForm.get("loanAmount");
  }
  get fn()
  {
    return this.personaldetailsForm.get("firstName");
  }
  get mn()
  {
    return this.personaldetailsForm.get("middleName");
  }
  get ln()
  {
    return this.personaldetailsForm.get("lastName");
  }
  get ei()
  {
    return this.personaldetailsForm.get("emailId");
  }
  get pas()
  {
    return this.personaldetailsForm.get("password");
  }
  get cp()
  {
    return this.personaldetailsForm.get("confirmPassword");
  }
  
  get ph()
  {
    return this.personaldetailsForm.get("phoneNumber");
  }
  get dob()
  {
    return this.personaldetailsForm.get("dateOfBirth");
  }
  get ge()
  {
    return this.personaldetailsForm.get("gender");
  }
  get na()
  {
    return this.personaldetailsForm.get("nationality");
  }
  get an()
  {
    return this.personaldetailsForm.get("aadharNo");
  }
  get pan()
  {
    return this.personaldetailsForm.get("panNo");
  }
  CalculateLoan()
  {
    this.maxLoan=60 * (0.6 * this.incomedetailsForm.value.monthlyIncome); 
    //this.eligibilityDis=this.EligibilityCalculator.value.eligibility;
    console.log(this.maxLoan);
    
  }
}
