import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../core/interface/product';
import { CartService } from 'src/app/cart/cart.service';
import { WishlistService } from './../../wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  @Input() product: Product = {} as Product
wishlist:any[]=[]

showSuccess(p:string) {
  this.toastr.success(p);
}
isColorChanged: boolean = false;

toggleColor() {
  this.isColorChanged = !this.isColorChanged;
}
  constructor(private toastr: ToastrService,private _cartService:CartService , private _wishlistService:WishlistService){

  }
  ngOnInit(): void {

  }


addProduct(id:string){
  this._cartService.addToCart(id).subscribe({
    next:(res)=>{
     this._cartService.numOfCartItems.next(res.numOfCartItems)
     this.showSuccess(res.message)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
addProductToWishlist(id:string){
  this._wishlistService.addToWishlist(id).subscribe({
    next:(res)=>{
      this.wishlist=res.data
      console.log(this.wishlist)
     this._wishlistService.numOfWishlistItems.next(this.wishlist.length)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
RemovefromWishlist(id:string){
 this._wishlistService.removeItem(id).subscribe({
  next:(res)=>{
    this.wishlist=res.data
    this._wishlistService.numOfWishlistItems.next(this.wishlist.length)
  },
    error:(err)=>{
      console.log(err);
    }
 })
}
}
