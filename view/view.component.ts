import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { IncomeDetails } from '../Models/income-details';
import { LoanDetails } from '../Models/loan-details';
import { PersonalDetails } from '../Models/personal-details';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
incomes:IncomeDetails[]=[];
loans:LoanDetails[]=[];
personals:PersonalDetails[]=[];
  
 constructor(public service:ApiCallService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe((data:IncomeDetails[])=>{
      console.log(data)
      this.incomes=data;
    })
    this.service.getAllloan().subscribe((data:LoanDetails[])=>{
      console.log(data)
      this.loans=data;
    })
    this.service.getAllpersonal().subscribe((data:PersonalDetails[])=>{
      console.log(data)
      this.personals=data;
    })
  }

}
