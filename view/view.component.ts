import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { UserLogin } from '../Models/user-login';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  user:UserLogin[]=[];
  constructor(private service: ApiCallService, private router:ActivatedRoute) { }
 

  ngOnInit(): void 
  {
    this.service.getAll().subscribe((data:UserLogin[])=>{
      console.log(data)
      this.user=data;
    })
  }

}
