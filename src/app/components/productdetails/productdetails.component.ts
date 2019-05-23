import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-productdetails',
    templateUrl: './productdetails.component.html',
    styleUrls: ['./productdetails.component.less']
})

export class ProductdetailsComponent implements OnInit {
    product: ProductsData;
    constructor(private route: ActivatedRoute, public productService: ProductService, private appService: appService, private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.prodId = params.prodId;
        });
    }
    item = {
        quantity: 1
    }
    sub;
    prodId;
    ngOnInit() {
        this.product = this.productService.product;
        this.sub = this.route
            .data
            .subscribe(v => console.log(v));
        this.getProductById();

    }
    itemIncrease() {
        let thisObj = this;

        thisObj.item.quantity = Math.floor(thisObj.item.quantity + 1);

    }
    itemDecrease() {
        let thisObj = this;
        if (thisObj.item.quantity === 0) {
            return;
        }
        thisObj.item.quantity = Math.floor(thisObj.item.quantity - 1);

    }

    starList: boolean[] = [true, true, true, true, true];       // create a list which contains status of 5 stars
    rating: number;
    //Create a function which receives the value counting of stars click, 
    //and according to that value we do change the value of that star in list.
    setStar(data: any) {
        this.rating = data + 1;
        for (var i = 0; i <= 4; i++) {
            if (i <= data) {
                this.starList[i] = false;
            }
            else {
                this.starList[i] = true;
            }
        }
    }
    prodData = [];
    prodsData = [];
    skid;
    skuData = [];
    description;
    prodImages = [];
    size;
    selling_price;
    catName;
    subCatName;
    prodName;
    cat_id1;
    getProductById() {
        this.skuData = [];
        this.appService.getProductById(this.prodId).subscribe(res => {
            this.prodId = res.json().products.product_id;
            this.prodsData = res.json().products;
            for (var i = 0; i < this.prodsData.length; i++) {
                this.prodId = this.prodsData[0].product_id;
                this.prodName = this.prodsData[0].product_name;
                this.catName = this.prodsData[0].category_name;
                this.subCatName = this.prodsData[0].sub_category_name;
                this.prodName = this.prodsData[0].product_name;
                this.cat_id1 = this.prodsData[0].category_id;
                for (var j = 0; j < this.prodsData[i].sku_row.length; j++) {
                    this.offer_price = this.prodsData[i].sku_row[0].offer_price;
                    this.actual_price = this.prodsData[i].sku_row[0].actual_price;
                    this.selling_price = this.prodsData[i].sku_row[0].selling_price;
                    this.product_image = this.prodsData[i].sku_row[0].sku_images[0].sku_image;
                    this.skid = this.prodsData[i].sku_row[0].skid;
                    this.image = this.prodsData[i].sku_row[0].sku_images[0].sku_image;
                    this.size = this.prodsData[i].sku_row[0].size;
                    this.description = this.prodsData[i].sku_row[0].description;
                    this.skuData.push(this.prodsData[i].sku_row[j]);
                    for (var k = 0; k < this.prodsData[i].sku_row[j].sku_images.length; k++) {
                        this.prodImages.push(this.prodsData[i].sku_row[j].sku_images[k]);
                        console.log(this.prodImages);
                    }
                }
            }
            let params = {
                // "country": sessionStorage.country,
                // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
                // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
                "user_id": sessionStorage.userId
            }
            this.appService.productByCatId(this.cat_id1, params).subscribe(res => {
                this.prodData = res.json().products;
                if (this.prodData != undefined) {
                    for (var i = 0; i < this.prodData.length; i++) {
                        for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                            this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                            this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                            this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                            this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                            this.skid = this.prodData[i].sku_row[0].skid;
                        }

                    }
                    // this.noData = false;
                    // this.noData1 = false;
                }
                if (res.json().status === 400) {
                    // this.noData = true;
                }


            }, err => {

            })

        }, err => {

        })
    }
    showBigImage(image) {
        this.product_image = image;
    }
    offer_price = [];
    actual_price;
    product_image;
    image;
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodsData.length; i++) {
            for (var j = 0; j < this.prodsData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodsData[i].sku_row[j].skid) {
                    this.selling_price = this.prodsData[i].sku_row[j].selling_price;
                    this.actual_price = this.prodsData[i].sku_row[j].actual_price;
                    this.skid = this.prodsData[i].sku_row[j].skid;
                    this.description = this.prodsData[i].sku_row[j].description;
                    for (var k = 0; k < this.prodsData[i].sku_row[j].sku_images.length; k++) {
                        this.product_image = this.prodsData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }

    cartDetails;
    cartCount;
    billing;
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartDetails = res.json().cart_details;
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;
        }, err => {

        })
    }
    addtoCart(id, skuId) {
        var inData = {
            "products": [{
                product_id: id,
                sku_id: skuId
            }],
            "vendor_id": sessionStorage.getItem('userId'),
            "item_type": "ecommerce"
        }
        this.appService.addtoCart(inData).subscribe(res => {
            this.getCart();
            swal(res.json().message, "", "success");
            if (res.json().status === 400) {
                swal(res.json().message, "", "error");
            }
        }, err => {

        })
    }
    checkProdQuty(prodId, skuId) {
        this.appService.checkQuty(prodId, skuId, 0).subscribe(res => {
            if (res.json().status === 200) {
                this.addtoCart(prodId, skuId);
            } else {
                swal(res.json().message, "", "error");
                // this.NoStockMsg = res.json().data;
            }
        })
    }
    // showProduxtDetails(prodId) {
    //     this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    // }
}
