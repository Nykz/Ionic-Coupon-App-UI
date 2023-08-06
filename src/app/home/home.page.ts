import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {

  orderTotal: number = 400;
  currency = '₹';
  coupons: any[] = [];
  allCoupons = [
    {
      id: '1',
      code: 'TRYNEW',
      discount: 20,
      isPercentage: true,
      description: 'Use code TRYNEW & get 20% off',
      isActive: true,
      expiryDate: "2023-08-15T18:30:00",
      minimumOrderAmount: 499,
      upto_discount: 200,
    },
    {
      id: '2',
      code: 'FREESHIP',
      discount: 100,
      isPercentage: false,
      description: 'Flat ₹100 off',
      isActive: true,
      expiryDate: "2023-09-30T23:59:59",
    },
    {
      id: '3',
      code: 'SALE50',
      discount: 50,
      isPercentage: true,
      description: 'Big Sale - Flat 50% off on everything',
      isActive: true,
      expiryDate: "2023-08-31T23:59:59",
      minimumOrderAmount: 1000,
      upto_discount: 550,
    },
    {
      id: '4',
      code: 'NEW50',
      discount: 50,
      isPercentage: true,
      description: 'New customer offer - Flat 50% off on everything',
      isActive: true,
      expiryDate: "2023-08-31T23:59:59",
      minimumOrderAmount: 399,
      upto_discount: 250,
    },
  ];

  constructor() {}

  ngOnInit(): void {
      const coupons: any[] = this.allCoupons;
      if(coupons?.length > 0) {
        coupons.map((coupon) => {
          coupon.saved = this.getSavedAmount(coupon);
          return coupon;
        });
        this.coupons = [...coupons];
      }
  }

  getSavedAmount(coupon: any) {
    let amt = 0;
    if(coupon?.minimumOrderAmount) {
      amt = this.orderTotal - coupon.minimumOrderAmount;
      if(amt < 0) return amt;
    }
    amt = coupon?.isPercentage ? (this.orderTotal * (coupon?.discount / 100)) : coupon?.discount;
    if(coupon?.upto_discount) {
      console.log('check amt: ', amt);
      amt = (amt >= coupon.upto_discount) ? coupon.upto_discount : amt;
    }
    return amt;
  }

}
