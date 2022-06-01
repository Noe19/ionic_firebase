import { Injectable } from '@angular/core';
// importamos lo que necesitamos para el login con firebase 
import {Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from '@angular/fire/auth';
import { create } from 'domain';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
// servicio del login con firebase 
  constructor(private auth:Auth) { }
// registrase 
  async register({email,password}){
    try {
      const user = await createUserWithEmailAndPassword(
        // los parametro que debo enviar
        this.auth,email,password

      );
    } catch (error) {
      return  null;
      
    }

  }
// inicar sesion 
  async login(email,password){
    const user = await signInWithEmailAndPassword(
      this.auth,email,password
    );
    return user;
  
  }
// salir 
  logout(){
    return signOut(this.auth)
  }
}
