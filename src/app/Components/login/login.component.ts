import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userNameLogin= "";
  passwordLogin = "";

  userNameRegister = "";
  passwordRegister = "";
  displaySignUp = false;


  userLoginFailed = false;


  userCreatedSuccess = false;
  userCreatedFailed = false;
  

  constructor( public auth :Auth , public router: Router ) { 



  }

  ngOnInit(): void {
  }

  refresh(): void {
    window.location.reload();
}

  onSubmitHandleRegister(){

    createUserWithEmailAndPassword(this.auth, this.userNameRegister, this.passwordRegister)
    .then((response : any)=>{
      this.userCreatedSuccess = !this.userCreatedSuccess;
      this.userCreatedFailed = false;
      
      console.log(response)

      setTimeout(() => {
        console.log("Delayed for 2 second.");
        this.refresh();

      }, 4000)
    
    })
    .catch((err) =>{
      console.log(err.message);
      this.userCreatedFailed = !this.userCreatedFailed;

    })

  }

  onSubmitHandleLogin(){

    signInWithEmailAndPassword(this.auth, this.userNameLogin, this.passwordLogin)
    .then((response : any)=>{
      console.log(response.user)
      this.userLoginFailed = false;
      this.router.navigateByUrl("/Home")
    })
    .catch((err) =>{
      console.log(err)
      this.userLoginFailed = !this.userLoginFailed;

    })

  }

  changeDisplaySignup(){

    this.displaySignUp = !this.displaySignUp
    
  }



}
