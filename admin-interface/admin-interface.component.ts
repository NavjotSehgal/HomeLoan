import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { PersonalDetails } from '../Models/personal-details';
import { UserLogin } from '../Models/user-login';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit {
  user:UserLogin[]=[];
  personal:PersonalDetails[]=[];
  adminid=1
  status=""
  constructor(public service: ApiCallService) { }

  ngOnInit(): void {
    if(this.adminid==1){
      this.status="Sent for verification"
    }
    else{
      this.status="Approved"
    }
    console.log(this.status)​​​​​​​​ 
    console.log(this.user)
    this.service.getAllpersonal().subscribe((data:PersonalDetails[])=>{
      this.personal=data;
    })
  }

}
