import { Component, OnInit } from '@angular/core';
import { Bundle } from '../model/bundle.model';
import { TourAuthoringService } from '../tour-authoring.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { OrderItem, OrderItemType } from 'src/app/feature-modules/marketplace/model/order-item.model';
import { MarketplaceService } from '../../marketplace/marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { ShoppingCart } from '../../marketplace/model/shopping-cart.model';

@Component({
  selector: 'xp-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit{
  
  public bundles: Bundle[]
  shouldRenderBundleForm: boolean = false;
  shouldEdit: boolean = false;
  
  public shoppingCart: ShoppingCart
  
  constructor(private service: TourAuthoringService, private marketService: MarketplaceService, private userService: AuthService) { }

  user: User;

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.getShoppingCart();
    });

    this.service.getAllBundles().subscribe({
      next: (result: PagedResults<Bundle>) => {
        this.bundles = result.results;
        console.log(result.results)
      },
      error: () => {
      }
    })
  }

  archive(id: number){
    this.service.archiveBundle(id).subscribe({
      next: () =>
        this.service.getAllBundles().subscribe({
          next: (result: PagedResults<Bundle>) => {
            this.bundles = result.results;
          },
          error: () => {
          }
        })
    });
  }
  
  publish(id: number){
    this.service.publishBundle(id).subscribe({
      next: () =>
        this.service.getAllBundles().subscribe({
          next: (result: PagedResults<Bundle>) => {
            this.bundles = result.results;
          },
          error: () => {
          }
        })
    });
  }

  delete(id: number){
    this.service.deleteBundle(id).subscribe({
      next: () =>
      this.service.getAllBundles().subscribe({
        next: (result: PagedResults<Bundle>) => {
          this.bundles = result.results;
        },
        error: () => {
        }
      })
    })
  }

  onAddClicked(){
    this.shouldEdit = false;
    this.shouldRenderBundleForm = true;
  }

  closeModal(){
    this.shouldRenderBundleForm = false;
  }

  addToCart(bundle: Bundle){
    let orderItem: OrderItem = {
      idType: bundle.id,
      name: bundle.name,
      price: bundle.price,
      image: bundle.tours[0].points[0].picture,
      type: "Bundle",
      couponCode: "",
    }

    if(this.shoppingCart.items.findIndex((x: OrderItem) => x.idType === bundle.id && x.type === OrderItemType.bundle) === -1){
      this.marketService.addToCart(orderItem, this.user.id).subscribe({
        next: result => {
          alert('Added to cart!');
          this.getShoppingCart();
        },
        error: (err) => {
          console.log(err);
          alert('Error while adding to cart!');
        }
      })
    }
    else {
      alert('Bundle is already in cart!');
    }
    }

    getShoppingCart() {
      this.marketService.getCartByUserId(this.user.id).subscribe({
        next: (result: ShoppingCart) => {
          this.shoppingCart = result;
        },
        error: err => {
          console.log(err);
          this.shoppingCart = {
            id: 0,
            idUser: this.user.id,
            items: []
          }
        }
      })
    }
  }
