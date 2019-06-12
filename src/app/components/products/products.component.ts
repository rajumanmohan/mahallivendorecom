import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { appService } from './../../services/mahaliServices/mahali.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit {
    product;
    type;
    showCategories = false;
    selectedCat;
    subCategory = [];
    skid;
    noData1;
    subCatName1;
    catName1;
    Brands = [];
    selectedBrnd;
    action;
    brand;
    imgId;
    wholeProd;
    serProd;
    catId1;
    constructor(private router: Router, public productService: ProductService, private appService: appService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            if (params.action === "search") {
                this.product = params.product;
                this.search(this.product);
                this.seeAll = false;
                this.searchProd = true;
            }
            else if (params.action === "deals") {
                this.type = params.action;
                this.getEcomDeals();
                this.action = "deals";
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === "topOffers") {
                this.type = params.action;
                this.action = "topOffers";
                this.getEcomTopOffers();
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === "recent") {
                this.type = params.action;
                this.action = "recent";
                this.getEcom();
                this.seeAll = true;
                this.searchProd = false;
            } else if (params.action === 'category') {
                this.action = params.action;
                this.catId = params.catId;
                this.catId1 = params.catId;
                this.catName = params.catName;
                this.seeAll = true;
                this.searchProd = false;
                this.getCatProducts('', '');
            } else if (params.action === 'subCategory') {
                this.subId = params.subId;
                this.action = params.action;
                this.catName1 = params.catName;
                this.subCatName = params.subCat;
                this.seeAll = true;
                this.searchProd = false;
                this.getSubProducts('', '');
            } else {
                this.imgId = params.imgId
                this.wholeProd = false;
                this.searchProd = true;
                this.seeAll = false;
                this.getBanProducts1();
            }

        })
    }
    catId;
    catName;
    subCatName;
    ngOnInit() {
        this.getCategories();
        this.getBrands();
    }

    collapse() {
        this.showCategories = !this.showCategories;

    }
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
    }
    category = [];
    subCatData = [];
    subId;
    serProducts = [];
    seeAll = false;
    searchProd = false;
    search(product) {
        this.searchProd = true;
        this.subCatName1 = this.catName1 = '';
        this.appService.searchProducts(product).subscribe(res => {
            this.prodData = res.json().data;
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData1 = true;
            }
        }, err => {

        })
    }
    dealData = [];
    topOfrs = [];
    skuData = [];
    skuArr = [];
    topsku = [];
    topArr = [];
    ecomProds = [];
    ecomsku = [];
    ecomArr = [];
    jewelData = [];
    jewelArr = [];
    jewlsku = [];
    cartDetails = [];
    cartCount;
    noData;
    getEcomDeals() {
        // this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.getEcomDeals(params).subscribe(res => {
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
            }

        })
    }

    addtoCart(Id, skId) {
        var inData = {
            "products": [{
                product_id: Id,
                sku_id: skId
            }],
            "vendor_id": sessionStorage.getItem('userId'),
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

    getEcom() {
        this.ecomArr = [];
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.ecomProducts(params).subscribe(res => {
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
            }

        })
    }
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
    prodData = [];



    getSubProducts(subid, subcatName) {
        this.skuData = [];
        this.subId = (subid === '') ? this.subId : subid;
        this.subCatName1 = (subcatName === '') ? this.subCatName : subcatName;
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.productBySubCatId(this.subId, params).subscribe(res => {
            this.prodData = res.json().products;
            if (this.prodData != undefined) {
                this.catId1 = this.catId === undefined ? this.prodData[0].category_id != undefined ? this.prodData[0].category_id : "" : this.catId;
                for (var i = 0; i < this.prodData.length; i++) {
                    for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                        this.prodData[i].selling_price = this.prodData[i].sku_row[0].selling_price;
                        this.prodData[i].actual_price = this.prodData[i].sku_row[0].actual_price;
                        this.prodData[i].image = this.prodData[i].sku_row[0].sku_images[0].sku_image;
                        this.prodData[i].skid = this.prodData[i].sku_row[0].skid;
                        this.skid = this.prodData[i].sku_row[0].skid;
                    }

                }
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
            }
            this.appService.getBrands(this.catId1 || 'null').subscribe(res => {
                this.Brands = res.json().brands;
            })
        }, err => {

        })
    }
    changeSize(Id) {
        this.skid = Id;
        for (var i = 0; i < this.prodData.length; i++) {
            for (var j = 0; j < this.prodData[i].sku_row.length; j++) {
                if (parseInt(Id) === this.prodData[i].sku_row[j].skid) {
                    this.prodData[i].selling_price = this.prodData[i].sku_row[j].selling_price;
                    this.prodData[i].actual_price = this.prodData[i].sku_row[j].actual_price;
                    this.prodData[i].skid = this.prodData[i].sku_row[i].skid;
                    for (var k = 0; k < this.prodData[i].sku_row[j].sku_images.length; k++) {
                        this.prodData[i].image = this.prodData[i].sku_row[j].sku_images[0].sku_image;
                    }
                }

            }

        }
    }
    getCatProducts(id, catName) {
        this.skuData = [];
        this.catId = (id === '') ? this.catId : id;
        this.catName1 = (catName === '') ? this.catName : catName;
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area
        }
        this.appService.productByCatId(this.catId, params).subscribe(res => {
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status === 400) {
                this.noData = true;
            }


        }, err => {

        })
        this.appService.getBrands(this.catId || 'null').subscribe(res => {
            this.Brands = res.json().brands;
        })
        this.subCatName1 = '';
    }
    getBrands() {
        this.appService.getBrands(this.catId1 || 'null').subscribe(res => {
            this.Brands = res.json().brands;
        })
    }
    selectBrand(brand) {
        this.brand = brand;
        this.selectedBrnd = brand;
        let params = {
            // "country": sessionStorage.country,
            // "pin_code": sessionStorage.pinCode === "undefined" ? "null" : sessionStorage.pinCode,
            // "area": sessionStorage.Area === "undefined" ? "null" : sessionStorage.Area,
            "brand": brand

        }
        if (this.action === 'category') {
            this.appService.filterByBrandCat(this.catId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else if (this.action === 'deals') {
            this.appService.filterByBrandDeals(params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else if (this.action === 'topOffers') {
            this.appService.filterByBrandTopOff(params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else if (this.action === 'recent') {
            this.appService.filterByBrandRec(params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        } else {
            this.appService.filterByBrandSubCat(this.subId, params).subscribe(res => {
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
                    this.noData = false;
                    this.noData1 = false;
                }
                if (res.json().status === 400) {
                    this.noData = true;
                }
            })
        }
        this.brand = '';
    }
    getBanProducts1() {
        this.appService.getBannerProds(this.imgId).subscribe(res => {
            this.prodData = res.json().result;
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
                this.noData = false;
                this.noData1 = false;
            }
            if (res.json().status == 400) {
                this.noData = true;
            }
        })
    }
}
