import { appService } from './../../services/mahaliServices/mahali.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductsData } from '../../services/productsdata';
import { ProductService } from '../../services/productservice';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    product: ProductsData = {
        name: "Utpal Kumar Das"
    };
    constructor(private router: Router, public productService: ProductService, private appService: appService) {
        this.getWholeSellers();
        this.getBanners();
        this.dealOfDay();
        // this.getJewel();
        // this.getCloth();
        this.getEcom();
        this.getEcomCats();
    }
    showAllProducts = true;
    showVegetablesScreen = false;
    showFruitScreen = false;
    showTeaScreen = false;
    showBreadScreen = false;
    showJuiceScreen = false;
    allProductsData = [];
    allProductsData1 = []
    skid;
    noData;
    topOffers = [];
    noData2;
    noData1;
    noData3;
    noData4;
    noData5;
    ecomDeals = [];
    showVegetables() {
        this.showVegetablesScreen = true;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showFruits() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = true;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showTea() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = true;
        this.showBreadScreen = false;
        this.showJuiceScreen = false;
    }
    showBread() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = true;
        this.showJuiceScreen = false;
    }
    showJuices() {
        this.showVegetablesScreen = false;
        this.showAllProducts = false;
        this.showFruitScreen = false;
        this.showTeaScreen = false;
        this.showBreadScreen = false;
        this.showJuiceScreen = true;
    }
    ngOnInit() {
        this.productService.product = this.product;
        this.getWholeSellers();
        this.getBanners();
        this.dealOfDay();
        // this.getJewel();
        // this.getCloth();
        this.getEcom();
        this.getEcomCats();
        this.getEcomDeals();
        this.getEcomTopOffers();
        // this.getRecentlProds();
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


    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }

    showStore() {
        this.router.navigate(['/store'], { queryParams: { order: 'popular' } });
    }
    getWholeSellers() {
        this.appService.getWholeSellers().subscribe(resp => {

        })
    }
    bannerData = [];
    offerBan = [];
    dummyBan = [];
    bannersTotalData = [];
    getBanners() {
        this.appService.getBanners().subscribe(res => {
            this.bannersTotalData = res.json().result;
            for (var i = 0; i < this.bannersTotalData.length; i++) {
                if (this.bannersTotalData[i].banner_position === 'Main Banners') {
                    this.bannerData = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === 'Feature brands') {
                    this.offerBan = this.bannersTotalData[i].banner_details;
                } else if (this.bannersTotalData[i].banner_position === "Dummy Banner") {
                    this.dummyBan = this.bannersTotalData[i].banner_details[0].website_banner;
                }
            }



            // if (res.json().result[6] !== undefined) {
            //     this.offerBan = res.json().result[6].banner_details;
            // }
            // if (res.json().result[7] !== undefined) {
            //     this.dummyBan = res.json().result[7].banner_details[0].website_banner;
            // }
            console.log(this.dummyBan);
        })
    }
    dealData = [];
    skuData = [];
    skuArr = [];
    prodName;
    topOfrs = [];
    topsku = [];
    topArr = [];
    dealOfDay() {
        this.appService.dealOfDay().subscribe(res => {
            this.dealData = res.json().data.deals_of_the_day;
            this.topOfrs = res.json().data.top_offers;
            for (var i = 0; i < this.dealData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.dealData[i].sku_details.length; j++) {
                    this.dealData[i].sku_details[j].product_name = this.dealData[i].product_name;
                    this.dealData[i].sku_details[j].product_id = this.dealData[i].product_id;
                    this.skuData = this.dealData[i].sku_details[j];
                    this.skuArr.push(this.skuData);
                }

            }
            for (var i = 0; i < this.topOfrs.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.topOfrs[i].sku_details.length; j++) {
                    this.topOfrs[i].sku_details[j].product_name = this.topOfrs[i].product_name;
                    this.topOfrs[i].sku_details[j].product_id = this.topOfrs[i].product_id;
                    this.topsku = this.dealData[i].sku_details[j];
                    this.topArr.push(this.topsku);
                }

            }
        })
    }
    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    getJewel() {
        this.appService.getJewel().subscribe(res => {
            this.jewelData = res.json().data;
            for (var i = 0; i < this.jewelData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.jewelData[i].sku_details.length; j++) {
                    this.jewelData[i].sku_details[j].product_name = this.jewelData[i].product_name;
                    this.jewelData[i].sku_details[j].product_id = this.jewelData[i].product_id;
                    this.jewlsku = this.jewelData[i].sku_details[j];
                    this.jewelArr.push(this.jewlsku);
                }

            }
        })
    }
    clothData = [];
    clothsku = [];
    clothArr = [];
    getCloth() {
        this.appService.getCloth().subscribe(res => {
            this.clothData = res.json().data;
            for (var i = 0; i < this.clothData.length; i++) {
                // this.prodName = this.dealData[i].product_name;
                for (var j = 0; j < this.clothData[i].sku_details.length; j++) {
                    this.clothData[i].sku_details[j].product_name = this.clothData[i].product_name;
                    this.clothData[i].sku_details[j].product_id = this.clothData[i].product_id;
                    this.clothsku = this.clothData[i].sku_details[j];
                    this.clothArr.push(this.clothsku);
                }

            }
        })
    }
    seeAll(catName, Id, action) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                catName: catName,
                catId: Id,
                action: action
            }
        }
        this.router.navigate(['/products'], navigationExtras);
    }
    ecomProds = [];
    ecomsku = [];
    ecomArr = [];
    getEcom() {
        this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.ecomProducts(params).subscribe(res => {
            this.ecomProds = res.json().products;
            if (this.ecomProds != undefined) {
                for (var i = 0; i < this.ecomProds.length; i++) {
                    for (var j = 0; j < this.ecomProds[i].sku_row.length; j++) {
                        this.ecomProds[i].selling_price = this.ecomProds[i].sku_row[0].selling_price;
                        this.ecomProds[i].actual_price = this.ecomProds[i].sku_row[0].actual_price;
                        this.ecomProds[i].image = this.ecomProds[i].sku_row[0].sku_images[0].sku_image;
                        this.ecomProds[i].skid = this.ecomProds[i].sku_row[0].skid;
                        this.skid = this.ecomProds[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            } else {
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = true;
            }

        })
    }
    getEcomDeals() {
        // this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.getEcomDeals(params).subscribe(res => {
            this.ecomDeals = res.json().products;
            if (this.ecomDeals != undefined) {
                for (var i = 0; i < this.ecomDeals.length; i++) {
                    for (var j = 0; j < this.ecomDeals[i].sku_row.length; j++) {
                        this.ecomDeals[i].selling_price = this.ecomDeals[i].sku_row[0].selling_price;
                        this.ecomDeals[i].actual_price = this.ecomDeals[i].sku_row[0].actual_price;
                        this.ecomDeals[i].image = this.ecomDeals[i].sku_row[0].sku_images[0].sku_image;
                        this.ecomDeals[i].skid = this.ecomDeals[i].sku_row[0].skid;
                        this.skid = this.ecomDeals[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;

            } else {
                this.noData = false;
                this.noData1 = true;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            }

        })
    }
    getEcomTopOffers() {
        // this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.getEcomTopOffers(params).subscribe(res => {
            this.topOffers = res.json().products;
            if (this.topOffers != undefined) {
                for (var i = 0; i < this.topOffers.length; i++) {
                    for (var j = 0; j < this.topOffers[i].sku_row.length; j++) {
                        this.topOffers[i].selling_price = this.topOffers[i].sku_row[0].selling_price;
                        this.topOffers[i].actual_price = this.topOffers[i].sku_row[0].actual_price;
                        this.topOffers[i].image = this.topOffers[i].sku_row[0].sku_images[0].sku_image;
                        this.topOffers[i].skid = this.topOffers[i].sku_row[0].skid;
                        this.skid = this.topOffers[i].sku_row[0].skid;
                    }
                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            } else {
                this.noData = false;
                this.noData1 = false;
                this.noData2 = true;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            }

        })
    }
    EcomCats;
    category1;
    category2;
    getEcomCats() {
        this.appService.getEcomCats().subscribe(res => {
            this.EcomCats = res.json().categories;
            this.category1 = this.EcomCats[0].id;
            this.category2 = this.EcomCats[1].id;
            if (this.category2) {
                this.category2 = this.EcomCats[1].id;
            }
            this.EcomCatProds();
            this.EcomCatProds1();
        })
    }
    EcomCatProds() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.productByCatId(this.category1, params).subscribe(res => {
            this.allProductsData = res.json().products;
            if (this.allProductsData != undefined) {
                for (var i = 0; i < this.allProductsData.length; i++) {
                    for (var j = 0; j < this.allProductsData[i].sku_row.length; j++) {
                        this.allProductsData[i].selling_price = this.allProductsData[i].sku_row[0].selling_price;
                        this.allProductsData[i].actual_price = this.allProductsData[i].sku_row[0].actual_price;
                        this.allProductsData[i].image = this.allProductsData[i].sku_row[0].sku_images[0].sku_image;
                        this.allProductsData[i].skid = this.allProductsData[i].sku_row[0].skid;
                        this.skid = this.allProductsData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            } else {
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = true;
                this.noData4 = false;
                this.noData5 = false;
            }

        }, err => {

        })
    }
    EcomCatProds1() {
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.productByCatId(this.category2, params).subscribe(res => {
            this.allProductsData1 = res.json().products;
            if (this.allProductsData1 != undefined) {
                for (var i = 0; i < this.allProductsData1.length; i++) {
                    for (var j = 0; j < this.allProductsData1[i].sku_row.length; j++) {
                        this.allProductsData1[i].selling_price = this.allProductsData1[i].sku_row[0].selling_price;
                        this.allProductsData1[i].actual_price = this.allProductsData1[i].sku_row[0].actual_price;
                        this.allProductsData1[i].image = this.allProductsData1[i].sku_row[0].sku_images[0].sku_image;
                        this.allProductsData1[i].skid = this.allProductsData1[i].sku_row[0].skid;
                        this.skid = this.allProductsData1[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = false;
                this.noData5 = false;
            } else {
                this.noData = false;
                this.noData1 = false;
                this.noData2 = false;
                this.noData3 = false;
                this.noData4 = true;
                this.noData5 = false;
            }

        }, err => {

        })
    }
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
    cartDetails
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
            // swal(res.json().message, "", "success");
            swal("Success", "", "success");
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
    // getRecentlProds() {
    //     this.appService.getEcomVenProds().subscribe(res => {
    //         this.ecomProds = res.json().products;
    //         if (res.json().status === 400) {
    //             this.noData1 = "No products Found";
    //         }
    //     }, err => {

    //     })
    // }
    getBanProds(imgId) {
        this.router.navigate(['/products'], { queryParams: { imgId: imgId, action: 'banner' } });
    }
}
