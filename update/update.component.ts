import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  
  userloginForm=new FormGroup
  ({
    userId:new FormControl(''),
    uName: new FormControl(''),
    userPass: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    dateOfReg: new FormControl('')  
  })
  constructor(private service: ApiCallService, private router:ActivatedRoute) { }
 


  ngOnInit(): void {
    this.service.getById(this.router.snapshot.params['userId']).subscribe((data)=>
    this.userloginForm=new FormGroup({
      userId:new FormControl(data["userId"]),
      uName:new FormControl(data["uName"]),
      userPass:new FormControl(data["userPass"]),
      email:new FormControl(data["email"]),
      phone:new FormControl(data["phone"]),
      dateOfReg:new FormControl(data["dateOfReg"])
    })
    )
  }
  submitForm(){
    this.service.update(this.router.snapshot.params['userId'],this.userloginForm.value).subscribe((data)=>
      console.log(data,"Details Updated Successfully")
    )
    alert("Details Updated Successfully")
  } 
  get ui()
  {
    return this.userloginForm.get("userId");
  }
  get un()
  {
    return this.userloginForm.get("uName");
  }
  get ei()
  {
    return this.userloginForm.get("email");
  }
  get pn()
  {
    return this.userloginForm.get("phone");
  }

}
