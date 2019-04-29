import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-freshvegetables',
  templateUrl: './freshvegetables.component.html',
  styleUrls: ['./freshvegetables.component.css']
})
export class FreshvegetablesComponent implements OnInit {
  catId;
  catName;
  subId;
  subCatName;
  constructor(private appService: appService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params.action === 'category') {
        this.catId = params.catId;
        this.catName = params.catName;
        this.getCatProducts();
      } else if (params.action === 'subCategory') {
        this.subId = params.subId;
        this.catName = params.catName;
        this.subCatName = params.subCat;
        this.getSubProducts();
      }
    })
  }

  ngOnInit() {
    this.getCategories();
  }
  showCategories = false;
  collapse() {
    this.showCategories = !this.showCategories;

  }
  category = [];
  getCategories() {
    this.appService.getCategories().subscribe(resp => {
      this.category = resp.json().categories;
      // this.showSubCat(this.subId);
      for (var i = 0; i < this.category.length; i++) {
        for (var j = 0; j < this.category[i].subcategory.length; j++) {
          this.subCatData.push(this.category[i].subcategory[j]);
          console.log(this.subCatData);
        }
      }
    })
  }
  prodData = [];
  noData;
  getSubProducts() {
    this.appService.productBySubCatId(this.subId, '').subscribe(res => {
      this.prodData = res.json().products;
      this.skuData = [];
      for (var i = 0; i < this.prodData.length; i++) {
        for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
          this.prodData[i].sku_details[j].product_name = this.prodData[i].product_name;
          this.skuData.push(this.prodData[i].sku_details[j]);
        }
      }
      if (res.json().message === "No records Found") {
        this.noData = true;
      }
    }, err => {

    })
  }
  getCatProducts() {
    this.appService.productByCatId(this.catId, '').subscribe(res => {
      this.prodData = res.json().products;
      for (var i = 0; i < this.prodData.length; i++) {
        for (var j = 0; j < this.prodData[i].sku_details.length; j++) {
          this.prodData[i].sku_details[j].product_name = this.prodData[i].product_name;
          this.skuData.push(this.prodData[i].sku_details[j]);
        }
      }
      if (res.json().message === "No records Found") {
        this.noData = true;
      }


    }, err => {

    })
  }
  cartDetails = [];
  cartCount;
  addtoCart(Id, skId) {
    var inData = {
      "products": [{
        product_id: Id,
        sku_id: skId
      }],
      "vendor_id": JSON.parse(sessionStorage.getItem('userId')),
      "item_type": "ecommerce"
    }
    this.appService.addtoCart(inData).subscribe(res => {
      this.getCart();
      this.cartDetails = res.json().selling_price_total;
      this.cartCount = res.json().count;
      swal(res.json().message, "", "success");
    }, err => {

    })
  }
  getCart() {
    var inData = sessionStorage.getItem('userId');
    this.appService.getCart(inData).subscribe(res => {
      this.cartDetails = res.json().cart_details;
      this.cartCount = res.json().count;
    }, err => {

    })
  }
  skuData = [];
  subCatData = [];
  subCategory = [];
  selectedCat = [];
  showsubCat(index, id) {
    this.subCategory = [];
    this.selectedCat = index;
    this.showCategories = true;

    for (var i = 0; i < this.subCatData.length; i++) {
      if (id === this.subCatData[i].category_id) {
        this.subCategory.push(this.subCatData[i]);
      }
    }
  }

  closesubSubCat() {
    this.showCategories = false;
    // this.showSubCategories = false;
  }
}
