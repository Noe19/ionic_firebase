import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { async } from '@firebase/util';
import { AlertController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
credentials:FormGroup;

  constructor(
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private authService:AuthService,
    private router:Router
  ) { }

  get email(){
    return this.credentials.get('email');
  }

  ngOnInit() {
    this.credentials=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });

  }

  async register(){
    const loadin =await this.loadingController.create();
    await loadin.present();
    const user =await this.authService.register(this.credentials.value);
    await loadin.dismiss();
    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      this.showAlert('Registro fallido','Interntar nuevamente');

    }
  
  }
  async login(){
    const loadin =await this.loadingController.create();
    await loadin.present();
    const user =await this.authService.register(this.credentials.value);
    await loadin.dismiss();
    if (user){
      this.router.navigateByUrl('/home',{replaceUrl:true});
    }else{
      this.showAlert('Login fallido','Interntar nuevamente');

    }

  }

  async showAlert(header,message){
    const alert= await this.alertController.create({
      header,
      message,
      buttons:['ok'],
    });
    await alert.present();

  }


}
