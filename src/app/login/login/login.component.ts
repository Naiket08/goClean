import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  name:any = '';
  

  constructor() {

    

    

    
   }

  handleRegister(value :any){
    console.log(value);
  }
 
   
  ngOnInit(): void {
  }

  

}
