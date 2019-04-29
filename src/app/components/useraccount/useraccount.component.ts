import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appService } from './../../services/mahaliServices/mahali.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
    selector: 'app-useraccount',
    templateUrl: './useraccount.component.html',
    styleUrls: ['./useraccount.component.less']
})
export class UseraccountComponent implements OnInit {
    userOrds = [];
    constructor(
        private route: ActivatedRoute, public appService: appService, private formBuilder: FormBuilder, private router: Router) {
        this.page = this.route.snapshot.data[0]['page'];
        if (this.page === 'profile') {
            this.showProfile = true;
            this.getProfile();
        } else if (this.page === 'addProduct') {
            this.showAddProducts = true;
            this.addProducts();
        }
        else if (this.page === 'orders') {
            this.showMyOrders = true;
            this.getOrders();
        } else if (this.page === 'changePw') {
            this.showChangePassword = true;
        }
        else if (this.page === 'myproduct') {
            this.showMyProducts = true;
            this.getAddedData();
        } else if (this.page === 'accountData') {
            this.showAccountDetails = true;
            this.accountDetails();
        } else if (this.page === 'deliveryAdd') {
            this.showDeliveryAddress = true;
            this.deliveryAddress();
        }

    }
    addressForm: FormGroup;
    resetForm: FormGroup;
    productForm: FormGroup
    submitted = false;
    deal_price_errors = false;
    quantity_errors = false;
    discount_error = false;
    status_errors = false;
    noOrd;
    editDel = false;
    status;
    ngOnInit() {
        this.getAddedData();
        this.getUserOrds();
        this.addressForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            mobile_number: ['', Validators.required],
            house_no: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            landmark: ['', Validators.required],
            pin_code: ['', Validators.required],
        });
        this.resetForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            new_password: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.productForm = this.formBuilder.group({
            price: [''],
            quantity: [''],
            discount: [''],
            // product_status: ['']
            // vendor_id: sessionStorage.userId,
            // product_id: this.productId
        });
        // this.editAddForm = this.formBuilder.group({
        //     full_name:['', Validators.required]
        // })
    }

    page;
    showNotifications = false;
    showOrderDetails = false;
    showMyOrders = false;
    showChangePassword = false;
    showWishlist = false;
    showAddAddress = false;
    showDeliveryAddress = false;
    editUserProfile = false;
    showProfile = false;
    showAccountDetails = false;
    editAccount = false;
    showAddProducts = false;
    showAddProducts5 = false;
    showOfferZone = false;
    showMyProducts = false;
    showRequestAdmin = false;
    showEditAddress = false;
    showManageUserOrders = false;
    profile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProfile();
    }

    editProfile() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = true;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    deliveryAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = true;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getAdd();
    }
    addAddress() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = true;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    // wishList() {
    //     this.showNotifications = false;
    //     this.showOrderDetails = false;
    //     this.showMyOrders = false;
    //     this.showChangePassword = false;
    //     this.showWishlist = true;
    //     this.showAddAddress = false;
    //     this.showDeliveryAddress = false;
    //     this.editUserProfile = false;
    //     this.showProfile = false;
    //     this.showAccountDetails=false;
    //     this.editAccount = false;
    //     this.showAddProducts=false;
    //     this.showAddProducts5=false;
    // }

    changePassword() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showChangePassword = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }

    myOrder() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = true;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getOrders();
    }

    // notifications() {
    //     this.showNotifications = true;
    //     this.showOrderDetails = false;
    //     this.showMyOrders = false;
    //     this.showChangePassword = false;
    //     this.showWishlist = false;
    //     this.showAddAddress = false;
    //     this.showDeliveryAddress = false;
    //     this.editUserProfile = false;
    //     this.showProfile = false;
    //     this.showAccountDetails=false;
    //     this.editAccount = false;
    //     this.showAddProducts=false;
    //     this.showAddProducts5=false;
    //     this.showOfferZone = false;
    // }

    showOrderDetailsEcom(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.ordDetails(ordId);
    }
    accountDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = false;
        // this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = true;
        this.editAccount = false;
        this.showAddProducts = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.getAccDet();
    }
    editAccountDetails() {
        this.showNotifications = false;
        // this.showOrderDetails = true;
        this.showMyOrders = false;
        this.showChangePassword = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showAccountDetails = false;
        this.editAccount = true;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    cancelAdd() {
        this.showDeliveryAddress = true;
        this.showAddAddress = false;
        this.showEditAddress = false;
        this.getAdd();
    }
    addProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        // this.showAddProducts = true;
        // this.showAddProducts5 = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts = true;
        this.showAddProducts5 = false;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getCategories();
    }
    showAddProducts2(Id) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        // this.showOfferZone = false;
        this.showAddProducts = false;
        // this.showAddProducts5 = true;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showAddProducts5 = true;
        this.showOfferZone = false;
        this.showMyProducts = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
        this.getProducts(Id);
    }
    offerZone() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        // this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = true;
        this.showAddProducts = false;
        // this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showMyProducts = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    myProducts() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = true;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    requestAdmin() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        // this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = true;
        this.showEditAddress = false;
        this.showManageUserOrders = false;
    }
    showEditAdd(addId) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = false;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = true;
        this.editAdd(addId);
    }
    showVendorOrderDetails() {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
    }
    showUserOrderDetails(ordId) {
        this.showNotifications = false;
        this.showOrderDetails = false;
        this.showMyOrders = false;
        this.showMyProducts = false;
        this.showWishlist = false;
        this.showAddAddress = false;
        this.showDeliveryAddress = false;
        this.editUserProfile = false;
        this.showProfile = false;
        this.showOfferZone = false;
        this.showAddProducts = false;
        this.showAddProducts5 = false;
        this.showManageUserOrders = true;
        this.showAccountDetails = false;
        this.editAccount = false;
        this.showRequestAdmin = false;
        this.showEditAddress = false;
        this.getUserOrdDetails(ordId);
    }
    email;
    profileData;
    ordId;
    ordData = [];
    orderDet = [];
    ordAdd = [];
    count;
    Ordstatus;
    ordIdUser;
    orderStatus(orderStatus, cartId, ordId) {
        this.Ordstatus = orderStatus;
        var inData = {
            "order_status": this.Ordstatus
        }
        this.appService.updateUsrOrd(cartId, inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getUserOrdDetails(ordId);
        })
    }
    ordDetails(ordId) {
        this.ordId = ordId;
        this.appService.orderById(ordId).subscribe(resp => {
            this.ordData = resp.json().Order.products;
            for (var i = 0; i < this.ordData.length; i++) {
                this.ordData[i].size = this.ordData[i].sku_row[0].size;
                this.ordData[i].selling_price = this.ordData[i].sku_row[0].selling_price;
                this.ordData[i].quantity = this.ordData[i].quantity;
                this.ordData[i].status = this.ordData[i].order_status;

            }
            this.orderDet = resp.json().Order.details[0];
            this.count = resp.json().Order.total_selling_price;
            this.ordAdd = resp.json().Order.delivery_address[0];


        })
    }
    getProfile() {
        this.email = (sessionStorage.email);
        this.appService.loginDetailsbyEmail(this.email).subscribe(response => {
            this.profileData = response.json().data[0];
            sessionStorage.removeItem('userName');
            sessionStorage.setItem('userName', (response.json().data[0].first_name) + " " + (response.json().data[0].last_name));
        })
    }
    updateProfile() {
        var inDate = {
            first_name: this.profileData.first_name,
            email: this.profileData.email,
            mobile_number: this.profileData.mobile_number,
            bussiness_area: this.profileData.bussiness_area,
            bussiness_city: this.profileData.bussiness_city,
            bussiness_name: this.profileData.bussiness_name,
            bussiness_pincode: this.profileData.bussiness_pincode

        }
        this.appService.updateProfile(inDate).subscribe(response => {
            console.log(response.json());
            swal(response.json().message, "", "success");
            this.ngOnInit();
            this.getProfile();
            this.cancel();
        })
    }
    cancel() {
        this.showProfile = true;
        this.editUserProfile = false;
        this.getProfile();

    }
    get f1() { return this.addressForm.controls; }

    saveAddress() {
        this.addressForm.value.address_type = this.type;
        this.submitted = true;
        // stop here if form is invalid
        if (this.addressForm.invalid) {
            return;
        }
        this.appService.addaddress(this.addressForm.value).subscribe(res => {
            this.addressForm.reset();
            swal(res.json().message, "", "success");
            this.getAdd();
            this.cancelAdd();
            //   this.addressForm.reset();
            // this.showAddresses = true;
            //     this.addresses = false;

        })
    }
    getAddData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;
        })
    }
    delAdd(delId) {
        this.appService.delAddress(delId).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAdd();
        })
    }
    get f() { return this.resetForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        } else if (this.resetForm.value.password != this.resetForm.value.new_password) {
            swal("Passwords doesn't matched", "", "warning");
            return;
        }
        this.appService.changePwd(this.resetForm.value).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.router.navigate(['/'])
            } else {
                swal(resp.json().message, "", "error");
            }

        }, err => {
            swal(err.json().message, "", "error");
        })


    }
    seleOpt;
    addId;
    seleAddOptn(index, addId) {
        this.seleOpt = index;
        this.editDel = true;
        this.addId = addId;
    }
    accDet: any;
    getAccDet() {
        this.appService.getAccDetails().subscribe(res => {
            this.accDet = res.json().data[0];
        }, err => {

        })
    }
    saveDetails() {
        var inData = {
            account_holder_name: this.accDet.account_holder_name,
            account_number: this.accDet.account_number,
            bank_area: this.accDet.bank_area,
            bank_branch: this.accDet.bank_branch,
            bank_city: this.accDet.bank_city,
            bank_name: this.accDet.bank_name,
            ifsc_code: this.accDet.ifsc_code
        }
        this.appService.updateAcc(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getAccDet();
            this.cancelDetails();
        }, err => {

        })
    }
    cancelDetails() {
        this.showAccountDetails = true;
        this.editAccount = false;
    }
    category = [];
    getCategories() {
        this.appService.getCategories().subscribe(resp => {
            this.category = resp.json().categories;
        })
    }
    prodId;
    reqProds = [];
    orders = [];
    getOrders() {
        this.appService.getPlaceOrder().subscribe(res => {
            this.orders = res.json().Orders;
        }, err => {

        })
    }
    getProducts(Id) {
        this.prodId = Id;
        this.appService.reqOrder(Id).subscribe(resp => {
            this.reqProds = resp.json().Order;

        })
    }
    get f2() { return this.productForm.controls; }
    productId;
    vend_prod_id;
    save(Img) {
        // this.productForm.value.status = 1;
        this.productForm.value.image = Img;
        this.productForm.value.item_type = "ecommerce";
        if (this.productForm.value.price === '') {
            this.deal_price_errors = true;
            return;
        } else if (this.productForm.value.quantity === '') {
            this.quantity_errors = true;
            this.deal_price_errors = false;
            return;
        } else if (this.productForm.value.discount === '') {
            this.quantity_errors = false;
            this.deal_price_errors = false;
            this.discount_error =true;
            return;
        }
        // this.productId = prodId;
        this.submitted = true;
        // stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }
        this.appService.update(this.productForm.value, this.vend_prod_id).subscribe(resp => {
            this.status_errors = false;
            swal("Your order under process for Approvel", "", "success");
            this.productForm.reset();
            $('#addProd').modal('hide');
        })

    }
    reqProduct;
    reqAdmin() {
        var inData = {
            "category_id": this.prodId,
            "subcategory_id": 0,
            "product_name": this.reqProduct
        }
        this.appService.reqAdmin(inData).subscribe(res => {
            if (res.json().status == 200) {
                swal(res.json().message, "", "success");
                $('#product-name').modal('hide');
            } else {
                swal(res.json().message, "", "error");
            }
        })
    }
    editAddData = {
        full_name: '',
        mobile_number: '',
        house_no: '',
        landmark: '',
        city: '',
        state: '',
        pin_code: '',

    };
    // get f3() { return this.editAddForm.controls; }
    editAdd(addId) {
        this.appService.getAdd(addId).subscribe(resp => {
            this.editAddData = resp.json().delivery_address[0];
        }, err => {

        })
    }
    getImg;
    prodName;
    brName;
    getData(img, prodName, brName, venProdId) {
        this.getImg = img;
        this.prodName = prodName;
        this.brName = brName;
        this.vend_prod_id = venProdId;
    }
    UpdateAdd(addId) {
        var indata = {
            "full_name": this.editAddData.full_name,
            "mobile_number": this.editAddData.mobile_number,
            "house_no": this.editAddData.house_no,
            "city": this.editAddData.city,
            "state": this.editAddData.state,
            "landmark": this.editAddData.landmark,
            "pin_code": this.editAddData.pin_code,
            "address_type": this.type
        }
        this.appService.updateAddData(indata, addId).subscribe(resp => {
            swal(resp.json().message, "", "success");
            this.getAdd();
            this.cancelAdd();
        }, err => {

        })
    }
    fromDt;
    toDt;
    type;
    // status = ["Available", "Unavilable"];
    // onSelect(status) {
    //     this.status = status;
    // }
    Type(type) {
        this.type = type;
    }
    filterVendor() {
        var inData = {
            "from_date": this.fromDt,
            "to_date": this.toDt
        }
        this.appService.filterVendor(inData).subscribe(resp => {
            this.orders = resp.json().products;

        }, err => {

        })
    }
    cartData = [];
    cartCount;
    billing;
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartData = res.json().cart_details;
            for (var i = 0; i < this.cartData.length; i++) {
                this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
                this.cartData[i].prodName = this.cartData[i].products.product_name;
                this.cartData[i].products.img = this.cartData[i].products.sku_details[0].image;
            }
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;

        }, err => {

        })
    }
    getVenData = [];
    venProducts = [];
    prodArr = [];
    getAddedData() {
        this.appService.getAddedData().subscribe(res => {
            this.getVenData = res.json().data;
            for (var i = 0; i < this.getVenData.length; i++) {
                this.venProducts = this.getVenData[i].vendor_products;
                // this.venProducts[i]

            }
            // console.log(this.venProducts);
        }, err => {

        })
    }
    deleteProd(proId) {
        this.appService.delProd(proId).subscribe(resp => {
            if (resp.json().status === 200) {
                swal(resp.json().message, "", "success");
                this.getAddedData();
            }

        }, err => {

        })
    }
    getUserOrds() {
        this.appService.getUserOrdByVenId().subscribe(res => {
            this.userOrds = res.json().Orders;
            this.noOrd = false;
            if (this.userOrds.length == 0) {
                this.noOrd = true;
            }
        })
    }
    htmlToPdf() {
        var data = document.getElementById('userOrd');
        // $('#title').innerHTML = "My Orders";

        html2canvas(data).then(canvas => {
            // var img = new Image(); img.crossOrigin = "anonymous";
            // this.ImgSrc = btoa(document.getElementById("imgId").getAttribute('src'));
            // var file = $("#imgId")[0].files[0];
            // Few necessary setting options  
            var imgWidth = 208;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('MYPdf.pdf'); // Generated PDF   
        });
        // $("#imgId").show();
    }
    getUserOrdDetails(ordId) {
        this.ordId = ordId;
        this.showManageUserOrders = true;
        this.appService.orderDetByVenId(ordId).subscribe(resp => {
            this.ordData = resp.json().Order.products;
            // this.proData = resp.json().Order;
            for (var i = 0; i < this.ordData.length; i++) {
                // this.ordData[i].prodStatus = this.ordData[i].order_status;
                // this.ordData[i].cart_id = this.ordData[i].products.cart_id;
                // this.ordData[i].size = this.ordData[i].sku_details[0].size;
                // this.ordData[i].selling_price = this.ordData[i].sku_details[0].selling_price;
            }
            this.orderDet = resp.json().Order.details[0];
            this.ordAdd = resp.json().Order.delivery_address[0];
            this.count = resp.json().Order.total_selling_price;

        })
    }

}
