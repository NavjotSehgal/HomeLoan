import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { IncomeDetails } from '../Models/income-details';
import { LoanDetails } from '../Models/loan-details';
import { PersonalDetails } from '../Models/personal-details';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  status?:boolean;
  addUserForm!: FormGroup;
  incomedetails!:IncomeDetails;
  loandetails!:LoanDetails;
  personaldetails!:PersonalDetails;
  uploaddocuments!:any;
  income_step = false;
  Personal_step = false;
  Loan_step = false;
  upload_step=false
  ROI:number=8.5;
  duration!:number;
  maxLoan!:number;
  step = 1;


  constructor( 
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
         estimatedAmount: ['', [Validators.required,Validators.pattern('[0-9]{1,}')]],
         typeOfEmployment: ['', Validators.required],
         retirementAge: ['', Validators.required],
         organizationType: ['',[Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
         employerName: ['',[Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
         monthlyIncome:['',Validators.required],
         userId:sessionStorage.getItem('username'),
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
         firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
         middleName: ['', [Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
         lastName: ['',[Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
         emailId: ['', Validators.required],
         password: ['',  [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
         confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
         phoneNumber: ['', Validators.required],
         dateOfBirth: ['', Validators.required],
         gender: ['', Validators.required],
         nationality: ['',[Validators.required,Validators.pattern('[a-zA-Z]{1,}')]],
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

    next()
  {

    if(this.step==1)
    {
      console.log(this.maxLoan);
      this.income_step = true;
      if (this.incomedetailsForm.invalid) { return  }
      this.step++
      this.maxLoan=60 * (0.6 * this.incomedetailsForm.value.monthlyIncome); 
      //this.eligibilityDis=this.EligibilityCalculator.value.eligibility;
      
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

      this.service.getAppById(this.personaldetailsForm.value.aadharNo).subscribe((data:any)=>
      {
        this.personaldetails=data;
        let appointmentdate=new Date()
        appointmentdate.setDate(appointmentdate.getDate() +  2);
        alert('Your Application number is ' + this.personaldetails.applicationNumber+ '   and Appointmentdate Date for Document Submission is '+appointmentdate);
        
      }
      )
      this.router.navigateByUrl('DashBoard');
    
    });
  }


  get propertyLocation()
  {
    return this.incomedetailsForm.get("propertyLocation");
  }
  get propertyName()
  {
    return this.incomedetailsForm.get("propertyName");
  }
  get estimatedAmount()
  {
    return this.incomedetailsForm.get("estimatedAmount");
  }
  get retirementAge()
  {
    return this.incomedetailsForm.get("retirementAge");
  }
  get organizationType()
  {
    return this.incomedetailsForm.get("organizationType");
  }
  get employerName()
  {
    return this.incomedetailsForm.get("employerName");
  }
  get monthlyIncome()
  {
    return this.incomedetailsForm.get("monthlyIncome");
  }
  get tenure()
  {
    return this.loandetailsForm.get("tenure");
  }
  get loanAmount()
  {
    return this.loandetailsForm.get("loanAmount");
  }
  get firstName()
  {
    return this.personaldetailsForm.get("firstName");
  }
  get middleName()
  {
    return this.personaldetailsForm.get("middleName");
  }
  get lastName()
  {
    return this.personaldetailsForm.get("lastName");
  }
  get emailId()
  {
    return this.personaldetailsForm.get("emailId");
  }
  get password()
  {
    return this.personaldetailsForm.get("password");
  }
  get confirmPassword()
  {
    return this.personaldetailsForm.get("confirmPassword");
  }
  
  get phoneNumber()
  {
    return this.personaldetailsForm.get("phoneNumber");
  }
  get dateOfBirth()
  {
    return this.personaldetailsForm.get("dateOfBirth");
  }
  get nationality()
  {
    return this.personaldetailsForm.get("nationality");
  }
  get aadharNo()
  {
    return this.personaldetailsForm.get("aadharNo");
  }
  get panNo()
  {
    return this.personaldetailsForm.get("panNo");
  }



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
}
