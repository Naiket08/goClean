import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passPattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g);

  userNameLogin= "";
  passwordLogin = "";

  userNameRegister = "";
  passwordRegister = "";
  reTypePasswordRegister = "";
  displaySignUp = false;


  userLoginFailed = false;


  userCreatedSuccess = false;
  userCreatedFailed = false;
  

  constructor( public auth :Auth , public router: Router ,private fb: FormBuilder) {}

  loginForm = this.fb.group({
    userNameLogin: new FormControl('', Validators.compose([Validators.required])),
    passwordLogin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passPattern)]))
  });

  registrationForm = this.fb.group({
    userNameRegister: new FormControl('', Validators.compose([Validators.required])),
    passwordRegister: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passPattern)])),
    reTypePasswordRegister : new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passPattern)]))
  },
  // {
  //   validators:this.MustMatch('passwordRegister','reTypePasswordRegister')
  // }
  );

  // MustMatch(password:any,confirmPass:any){
  //   return (registrationForm:FormGroup) => {
  //     const pass = registrationForm.controls['password'];
  //     const cnfmPass = registrationForm.controls['confirmPass'];
  //     if(cnfmPass.errors&&!cnfmPass.errors['MustMatch']){
  //       return;
  //     }
  //     if(pass.value!==cnfmPass.value){
  //       cnfmPass.setErrors({MustMatch:true});
  //     }
  //     else{
  //       cnfmPass.setErrors(null);
  //     }
  //   }
  // }

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
