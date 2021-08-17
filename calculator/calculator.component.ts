import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  eligibilityDis?:number;
  EligibilityCalculator = new FormGroup(
    {
      income:new FormControl(),
      interest: new FormControl(),
      eligibility:new FormControl()
    }
  );

  emi?:number;
  num?:number;
  den?:number;
  EMICalculator = new FormGroup(
    {
      loan : new FormControl(),
      tenure:new FormControl(),
      roi:new FormControl(8.5),
      emi1:new FormControl()
    }
  );

  CalculateEmi(){
    this.EMICalculator.value.tenure=this.EMICalculator.value.tenure*12;
    this.EMICalculator.value.roi=this.EMICalculator.value.roi/1200;
    this.num=Math.pow((1+this.EMICalculator.value.roi),this.EMICalculator.value.tenure);
    console.log(this.num);
    this.den=(Math.pow((1+this.EMICalculator.value.roi),(this.EMICalculator.value.tenure)))-1;
    console.log(this.den);
    this.emi= (this.EMICalculator.value.loan * this.EMICalculator.value.roi*this.num)/this.den;
    console.log(this.emi);
  }

  CalculateEligibility(){
    if(this.EligibilityCalculator.value.income !=null){
    this.eligibilityDis=60 * (0.6 * this.EligibilityCalculator.value.income); 
    //this.eligibilityDis=this.EligibilityCalculator.value.eligibility;
    console.log(this.eligibilityDis);
    }
  }
  
}
