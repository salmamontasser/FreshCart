import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogin: boolean= false;
  numberOfCarts:number=0;
  numberOfWishlist:number=0
userNameLogged:any=''
  constructor(private _authServices: AuthService, private _cartService:CartService, private _wshlistService:WishlistService){
    this._authServices.UserData.subscribe((res)=>{
      if(this._authServices.UserData.getValue()){
        this.isLogin=true
      }
      else{
        this.isLogin=false
      }
    })
 this._cartService.numOfCartItems.subscribe(res=>{
  this.numberOfCarts=res
 })
 this._wshlistService.numOfWishlistItems.subscribe(res=>{
  this.numberOfWishlist=res
 })

  }
  logOut(){
   this._authServices.logOut()

  }
  ngOnInit(): void {
this.userNameLogged=this._authServices.userName
let decode:any=localStorage.getItem('userToken')
let encoded:any= jwtDecode(decode);
console.log(encoded)
this._authServices.UserData.next(encoded.name)
  }
}
