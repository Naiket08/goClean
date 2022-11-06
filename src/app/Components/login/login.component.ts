import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';
import { getDatabase, ref, set } from "firebase/database";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { UserinfoService } from '../helper/userinfo.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passPattern = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g);

  userNameLogin= "";
  passwordLogin = "";

  firstName = "";
  lastName = "";
  mobileNumber = "";

  userNameRegister = "";
  passwordRegister = "";
  reTypePasswordRegister = "";
  displaySignUp = false;


  userLoginFailed = false;


  userCreatedSuccess = false;
  userCreatedFailed = false;
  

  constructor( public auth :Auth , public router: Router ,private fb: FormBuilder, public afAuth: AngularFireAuth, public getUserInfo : UserinfoService) {}

  loginForm = this.fb.group({
    userNameLogin: new FormControl('', Validators.compose([Validators.required])),
    passwordLogin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(this.passPattern)]))
  });

  registrationForm = this.fb.group({
    firstName: new FormControl('', Validators.compose([Validators.required])),
    lastName: new FormControl('', Validators.compose([Validators.required])),
    mobileNumber: new FormControl('', Validators.compose([Validators.required])),
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
      // localStorage.setItem('SeesionUser',this.userNameRegister)  
  }

  refresh(): void {
    window.location.reload();
}

  

  addUserToDb(userID:any , username:any ){ // adds users to Real time Data base in firebase
    const db = getDatabase();
  set(ref(db, 'Customers/' + userID), {
    userdetails: {
      firstname: this.firstName,
      lastname : this.lastName,
      emailId : username,
      PhoneNumber: this.mobileNumber,
      isNewUser: true
    },
    devices : {
      laundryBasketStatus: 30,
      DustbinStatus: true,
      ventStatus: 'clean'
    }

  });


  }

  onSubmitHandleRegister(){

    createUserWithEmailAndPassword(this.auth, this.userNameRegister, this.passwordRegister)
    .then((response : any)=>{
      this.userCreatedSuccess = !this.userCreatedSuccess;
      this.userCreatedFailed = false;
      console.log(response)
      console.log(response.user.reloadUserInfo.localId)

      this.addUserToDb(response.user.reloadUserInfo.localId,this.userNameRegister );
      

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
      console.log(response.user.reloadUserInfo.localId);
      localStorage.setItem('SeesionUser',this.userNameLogin)
      this.getUserInfo.getCurrentUserUniqueId(response.user.reloadUserInfo.localId);

    })
    .catch((err) =>{
      console.log(err)
      this.userLoginFailed = !this.userLoginFailed;

    })

  }

  changeDisplaySignup(){

    this.displaySignUp = !this.displaySignUp
    
  }

  onGoogleSignIn(){


    return this.afAuth.signInWithPopup(new GoogleAuthProvider)
    .then((response:any) =>{
      console.log('google signin success');
      console.log(response.user.uid);
      
      localStorage.setItem('SeesionUser',this.userNameLogin); 
      this.router.navigateByUrl("/Home");
      console.log(response);
      this.getUserInfo.getCurrentUserUniqueId(response.user.uid);
      
    }).catch((err)=>{
      console.log('google signin failed');
    })

    

      
  }

  



}
