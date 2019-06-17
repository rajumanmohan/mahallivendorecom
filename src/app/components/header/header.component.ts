import { appService } from './../../services/mahaliServices/mahali.service';
import { UseraccountComponent } from './../useraccount/useraccount.component';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginComponent } from '../../components/login/login.component';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var jQuery: any;
declare var $: any;
import { googlemaps } from 'googlemaps';
// import { } from '@types/googlemaps';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
    @Input() cartCount: number;
    @Input() billing: number;
    registerForm: FormGroup;
    loginForm: FormGroup;
    submitted = false;
    loginSubmitted = false;
    category: any;
    product: any;
    forgotForm: FormGroup;
    changePassForm: FormGroup;
    loginDetails: any;
    myAccount: boolean = false;
    phone: boolean = false;
    showdetails = false;
    showSubCats = false;
    showCartDetail = false;
    showLoginScreen = true;
    showRegistration = true;
    showOpacity = false;
    forgotSubmitted = false;
    changePwSubmitted = false;
    forgotForm1: FormGroup;
    google: any;
    city1;
    showLocation = false;
    public addrKeys: string[];
    public addr: object;
    position1;
    positionValue1;
    city;
    position2;
    productsData = [];
    productArr = [];
    positionValue2;
    pin_code;
    Area;
    country;
    pinCode1;
    pin_code1;
    catId;
    catFirstId;
    selLogin;
    forgotSubmitted1 = false;
    constructor(public dialog: MatDialog, private router: Router, public appService: appService, private formBuilder: FormBuilder, private zone: NgZone) {
        if (sessionStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        // if (!sessionStorage.country) {
        //     this.showLocation = true;
        // }
    }
    // @Output() valueChange = new EventEmitter();
    setAddress(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
            this.position1 = addrObj.formatted_address;
            this.positionValue1 = this.position1.split(',');
            console.log(this.positionValue1)
            this.pin_code = this.positionValue1[0].trim();
            // this.city = this.positionValue1[0].trim();
            // localStorage.setItem('city', this.city);
        });
    }
    setAreaAddress(addrObj) {
        //We are wrapping this in a NgZone to reflect the changes
        //to the object in the DOM.
        this.zone.run(() => {
            this.addr = addrObj;
            this.addrKeys = Object.keys(addrObj);
            this.position2 = addrObj.formatted_address;
            this.positionValue2 = this.position2.split(',');
            this.pin_code = addrObj.postal_code;
            this.country = addrObj.country;
            this.area = addrObj.locality === undefined ? addrObj.admin_area_l1 === undefined ? addrObj.formatted_address : addrObj.admin_area_l1 : addrObj.locality;
            console.log(addrObj);
        });
    }
    submitLocation() {
        this.city = this.position2;
        this.showLocation = false;
        sessionStorage.removeItem("pinCode");
        sessionStorage.setItem("pinCode", this.pin_code);
        sessionStorage.removeItem('city');
        sessionStorage.setItem('city', this.position2);
        this.Area = sessionStorage.city;
        sessionStorage.removeItem("country");
        sessionStorage.setItem('country', this.country);
        sessionStorage.removeItem("Area");
        sessionStorage.setItem('Area', this.area);
        location.reload();
        // sessionStorage.removeItem("pinCode");
        // sessionStorage.setItem("pinCode", this.pin_code)
    }
    item = {
        quantity: 1
    }

    userMobile;
    userName;
    location;
    ngOnInit() {
        this.selLogin = 1;
        if (sessionStorage.token === undefined) {
            this.showRegistration = true;
            this.showLoginScreen = true;
            this.myAccount = false;
        } else {
            this.showRegistration = false;
            this.showLoginScreen = false;
            this.myAccount = true;
            this.phone = true;
            this.userMobile = JSON.parse(sessionStorage.getItem('phone'));
            this.userName = (sessionStorage.getItem('userName'));
        }
        this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mobile_number: ['', [Validators.required, Validators.minLength(8)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.loginForm = this.formBuilder.group({
            email: [''],
            mobile_number: [''],
            password: ['']
        });
        this.forgotForm = this.formBuilder.group({
            mob_number: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.forgotForm1 = this.formBuilder.group({
            email: ['', [Validators.required]],
        });
        this.changePassForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.getCategories();
        this.getProduct();
        if (sessionStorage.userId != undefined) {
            this.updateGetCart();
        }
        this.getCart();
        // this.geoLocation();
        this.Area = sessionStorage.city;
        this.showSubCat(this.catFirstId, '');
    }

    hideSubCats() {
        this.showSubCats = false;
    }

    // showLogin() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(LoginComponent, dialogConfig);
    // }


    // showRegistration() {
    //     const dialogConfig = new MatDialogConfig();
    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;
    //     this.dialog.open(RegistrationComponent, dialogConfig);

    // }

    showCartItems() {
        this.showCartDetail = !this.showCartDetail;
    }
    showProduxtDetails(prodId) {
        this.router.navigate(['/productdetails'], { queryParams: { prodId: prodId } });
        jQuery("#itemdesc").modal("hide");
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
    showAddress() {
        this.router.navigate(['/address'], { queryParams: { order: 'popular' } });
    }
    showVegetables() {
        this.router.navigate(['/freshvegetables'], { queryParams: { order: 'popular' } });
    }
    signOut() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('phone');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('session');
        this.showRegistration = true;
        this.showLoginScreen = true;
        this.myAccount = false;
        this.phone = false;
        this.router.navigate(['/']);
        this.ngOnInit();
        this.getCart();
        if (this.router.navigate(['/'])){
            location.reload();
        }
        // location.reload();
    }
    get f() { return this.registerForm.controls; }
    registration(form: FormGroup) {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.appService.registration(this.registerForm.value).subscribe(resp => {
            // this.users = resp.json();
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                // this.showRegistration = false;
                sessionStorage.setItem('userId', (resp.json().id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                this.router.navigate(['/address']);
            }
            else if (resp.json().status === 400) {
                swal(resp.json().message, "", "error");
                // jQuery("#signupmodal").modal("hide");
            }
        })

    }
    radioChange(selLogin) {
        this.selLogin = selLogin.value || 1;
    }
    get f1() { return this.loginForm.controls; }
    login() {
        if (this.selLogin == 1) {
            delete this.loginForm.value.mobile_number;
            if (this.loginForm.value.email == '') {
                swal("Required Fields are missing", "", "error");
            }
        } else {
            delete this.loginForm.value.email
            if (this.loginForm.value.mobile_number == '') {
                swal("Required Fields are missing", "", "error");
            }
        }
        this.appService.login(this.loginForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                sessionStorage.setItem('token', JSON.stringify(resp.json().token));
                sessionStorage.setItem('userId', (resp.json().id));
                jQuery("#loginmodal").modal("hide");
                this.showRegistration = false;
                this.showLoginScreen = false;
                this.myAccount = true;
                if (this.loginForm.value.email != undefined) {
                    this.appService.loginDetailsbyEmail(this.loginForm.value.email).subscribe(response => {
                        sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                        sessionStorage.setItem('email', (response.json().data[0].email));
                        sessionStorage.setItem('userId', (response.json().data[0].id));
                        sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                        this.loginDetails = response.json().data[0];
                        this.phone = true;
                        this.ngOnInit();

                    })
                } else {
                    this.appService.getDetailsById().subscribe(response => {
                        console.log(response.json());
                        sessionStorage.setItem('phone', (response.json().data[0].mobile_number));
                        sessionStorage.setItem('email', (response.json().data[0].email));
                        sessionStorage.setItem('userId', (response.json().data[0].id));
                        sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
                        this.loginDetails = response.json().data[0];
                        this.phone = true;
                        this.ngOnInit();

                    })
                }


            }
            else if (resp.json().status === 404 || resp.json().status === 400) {
                swal(resp.json().message, "", "error");
            }
        }, err => {

        })
    }
    get f2() { return this.forgotForm.controls; }
    forgot() {
        this.forgotSubmitted = true;
        if (this.forgotForm.invalid) {
            return;
        }
        var inData = {
            mobile_number: this.forgotForm.value.mob_number
        }
        this.appService.forgotPassword(inData).subscribe(resp => {
            if (resp.json().status === 200) {
                jQuery("#forgotpass").modal("hide");
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("show");
                sessionStorage.setItem('mobile_number', (this.forgotForm.value.mob_number));
            } else {
                swal(resp.json().message, "", "error");
            }


        }, err => {
            swal(err.json().message, "", "error");
        })
    }
    get f3() { return this.forgotForm1.controls; }
    forgot1() {
        this.forgotSubmitted1 = true;
        if (this.forgotForm1.invalid) {
            return;
        }
        var inData = {
            email: this.forgotForm1.value.email
        }
        this.appService.forgotwithEmail(inData).subscribe(resp => {
            if (resp.json().status === 200) {
                jQuery("#forgotpass").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("show");
                sessionStorage.setItem('mobile_number', (resp.json().mobile_number));

            } else {
                swal(resp.json().message, "", "error");
            }

        }, err => {
            swal(err.json().message, "", "error");
        })
    }
    otpNumber;
    otpScreen() {
        var data = {
            'otp': this.otpNumber,
            'mobile_number': sessionStorage.mobile_number
        }
        this.appService.otpVerify(data).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#otpScreen").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                jQuery("#changepwd").modal("show");

            } else {
                swal(resp.json().message, "", "error");
            }
        })
        // jQuery("#otpScreen").modal("hide");
        // $('body').removeClass('modal-open');
        // $('.modal-backdrop').remove();
        // jQuery("#changepwd").modal("show");

    } get f4() { return this.changePassForm.controls; }
    ChangePw() {
        this.changePwSubmitted = true;

        if (this.changePassForm.invalid) {
            return;
        }
        this.changePassForm.value.mobile_number = sessionStorage.mobile_number;
        this.appService.changePwForgot(this.changePassForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                jQuery("#changepwd").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            } else {
                swal(resp.json().message, "", "error");
            }
        }, err => {

        })
    }
    getProduct() {
        this.appService.getProduct().subscribe(resp => {
            this.product = resp.json().products;
            console.log(this.product);
        });
    }
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
            this.catId = this.category[0].id;
            // this.showSubCat(this.subId);
        })
    }
    subCatData = [];
    subId;
    selectedCat;
    showSubCat(Id, index) {
        this.subCatData = [];
        this.subId = Id;
        this.showSubCats = true;
        this.selectedCat = index;
        this.productArr =[];
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                if (Id === this.category[i].subcategory[j].category_id) {
                    this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                    this.subCatData.push(this.category[i].subcategory[j]);
                    console.log(this.subCatData);
                    for (var k = 0; k < this.category[i].subcategory[j].products.length; k++) {
                        if (Id == this.category[i].subcategory[j].category_id) {
                            this.productsData = this.category[i].subcategory[j].products[k];
                            this.productArr.push(this.productsData);
                        }
                    }

                }
                // for (var k = 0; k < this.category[i].subcategory[j].products.length; k++) {
                //     if (Id === this.category[i].subcategory[j].products[k].category_id) {
                //         this.productsData = this.category[i].subcategory[j].products[k];
                //         this.productArr.push(this.productsData);
                //     }
                // }
            }
        }
    }
    showProds(Id) {
        this.subId = Id;
        this.showSubCats = true;
        this.productArr = [];
        for (var i = 0; i < this.category.length; i++) {
            for (var j = 0; j < this.category[i].subcategory.length; j++) {
                // if (Id === this.category[i].subcategory[j].category_id) {
                //     this.category[i].subcategory[j].cat_name = this.category[i].category_name;
                //     this.subCatData.push(this.category[i].subcategory[j]);
                // }
                for (var k = 0; k < this.category[i].subcategory[j].products.length; k++) {
                    if (Id === JSON.parse(this.category[i].subcategory[j].products[k].subcategory_id)) {
                        this.productsData = this.category[i].subcategory[j].products[k];
                        this.productArr.push(this.productsData);
                    }
                }

            }
        }
    }
    productTy;
    search(product, action) {
        // this.appService.searchProducts(product).subscribe(res=> {
        if (!product) {
            swal("Please enter the field", "", "warning");
        } else {
            this.productTy = product;
            this.router.navigate(['/products'], { queryParams: { product: this.productTy, action: action } });
            this.productTy = "";
        }
    }
    showProbyCat(catId, action, catName) {
        this.showSubCats = false;
        this.router.navigate(['/products'], { queryParams: { catId: catId, action: action, catName: catName } });
        $("#itemdesc").modal("hide");
    }
    showProbySubCat(SubCatId, action, catName, subCat) {
        this.showSubCats = false;
        this.router.navigate(['/products'], { queryParams: { subId: SubCatId, action: action, catName: catName, subCat: subCat } });
        $("#itemdesc").modal("hide");
    }
    cartDetails = [];
    cartData = [];
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            // if (res.json().count === 0) {
            //     this.cartCount = res.json().count;
            //     this.billing = 0;
            //     return;
            // } else {
            this.cartData = res.json().cart_details;
            if (this.cartData.length != undefined) {
                for (var i = 0; i < this.cartData.length; i++) {
                    this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                    this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                    this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
                    this.cartData[i].products.offer_price = this.cartData[i].products.sku_details[0].offer_price;
                    this.cartData[i].prodName = this.cartData[i].products.product_name;
                    this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
                }
                // }
                this.cartCount = res.json().count;
                this.billing = res.json().selling_Price_bill;
            }
        }, err => {

        })
    }
    updateGetCart() {
        var inData = {
            vender_id: sessionStorage.userId
        }
        this.appService.updateGetCart(inData).subscribe(res => {
            console.log(res.json().message);
            this.getCart();
        })
    }
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {

        })
    }
    latlocation;
    lanLocation;
    getPin;
    position;
    positionValue;
    area;
    state;
    geoLocation() {
        // if (navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
            this.latlocation = position.coords.latitude;
            this.lanLocation = position.coords.longitude;
            var latlng = { lat: this.latlocation, lng: this.lanLocation };
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'location': latlng }, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    console.log(result);
                    this.position = result.address_components[0].short_name;
                    this.positionValue = this.position.split('-');
                    this.area = result.address_components[2].long_name;;
                    this.city1 = result.address_components[4].long_name;
                    this.state = result.address_components[7].long_name;
                    this.city = this.position2 === undefined ? this.city1 + " " + this.state : this.position2;
                    this.country = result.address_components[8].long_name;
                    // sessionStorage.setItem('country', this.country);
                    // sessionStorage.setItem('Area', this.area);
                    // sessionStorage.setItem('city', this.city);
                    this.pinCode1 = result.address_components[9].long_name;
                    this.pin_code1 = this.pin_code === undefined ? result.address_components[9].long_name : this.pin_code;
                    // sessionStorage.setItem("pinCode", this.pin_code);
                    sessionStorage.setItem('country', this.country);
                    sessionStorage.setItem('Area', this.area);
                    sessionStorage.setItem('city', this.city);
                    sessionStorage.setItem("pinCode", this.pinCode1);
                    this.Area = sessionStorage.city;
                }
            });
        });
        this.showLocation = false;
    }

    hidesub() {
        this.showSubCats = false;
    }
    //modify cart
    itemIncrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                this.cartData[i].quantity = this.cartData[i].quantity + 1;
                this.modifyCart(this.cartData[i].quantity, cartId);
                // this.getCart();
                return;
            }
        }
    }
    showLocation1() {
        this.showLocation = true;
    }
    hideLocation() {
        this.showLocation = false;
    }

    itemDecrease(cartId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                if (this.cartData[i].quantity === 1) {
                    this.delCart(cartId);
                    return;
                } else {
                    this.cartData[i].quantity = this.cartData[i].quantity - 1;
                    this.modifyCart(this.cartData[i].quantity, cartId);
                }
                // this.getCart();
                return;
            }
        }

    }
    checkProdQuty(cartId, prodId, skuId, qunt) {
        this.appService.checkQuty(prodId, skuId, qunt).subscribe(res => {
            if (res.json().status === 200) {
                this.itemIncrease(cartId);
            } else {
                swal(res.json().message, "", "error");
            }
        })
    }

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                jQuery("#signupmodal").modal("hide");
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.getCart();
                // this.showRegistration = false;
                // localStorage.setItem('userId', (resp.json().reg_id));
                // this.myAccount = true
                // this.showOpacity = false;
                // this.onCloseCancel();
                // this.router.navigate(['/address']);
            }
        }, err => {

        })
    }
    viewCart() {
        if (sessionStorage.userId === undefined) {
            jQuery("#loginmodal").modal("show");
        } else {
            this.router.navigate(["/mycart"]);
        }
    }
    getGeoLocation() {
        sessionStorage.removeItem('city');
        sessionStorage.removeItem("pinCode");
        sessionStorage.removeItem("Area");
        sessionStorage.removeItem("country");
        sessionStorage.setItem('country', this.country);
        sessionStorage.setItem('Area', this.area);
        sessionStorage.setItem('city', this.city);
        sessionStorage.setItem("pinCode", this.pinCode1);
        this.Area = sessionStorage.city;
        this.geoLocation();
    }

}
