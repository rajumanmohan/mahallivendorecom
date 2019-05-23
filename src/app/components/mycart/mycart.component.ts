import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ItemsComponent } from '../../components/items/items.component';
import { PromocodesComponent } from '../../components/promocodes/promocodes.component';
import { Router } from '@angular/router';
@Component({
    selector: 'app-mycart',
    templateUrl: './mycart.component.html',
    styleUrls: ['./mycart.component.less']
})
export class MycartComponent implements OnInit {
    showCartItems = true;
    showDeliveryAddress = false;
    showAddresses = true;
    showPaymentMethode = false;
    showDeliveryType = false;
    payment_option;
    addresses = false;
    stackCheck;
    constructor(public dialog: MatDialog, private appService: appService, private router: Router) { }

    ngOnInit() {
        this.getCart();
        this.getAdd();
        this.paymentOptions();

    }

    showCart() {
        this.showCartItems = !this.showCartItems;
        this.showDeliveryAddress = false;
        this.showPaymentMethode = false;
    }

    //show addrss
    showAddress() {
        this.showCartItems = false;
        this.showDeliveryAddress = !this.showDeliveryAddress;
        this.showPaymentMethode = false;
        this.addresses = false;
        this.showAddresses = true;
        this.showDeliveryType = false;
        window.scrollTo(0, 0);
    }

    //add address
    addAddress() {
        this.addresses = true;
        this.showAddresses = false;
    }
    addData = {
        full_name: "",
        mobile_number: "",
        house_no: "",
        city: "",
        state: "",
        landmark: "",
        pin_code: "",
        address_type: "",
        vendor_id: 44


    }
    type;
    Type(type) {
        this.type = type || 'Home';
    }
    //save address
    saveAddress() {
        var inData = {
            "full_name": this.addData.full_name,
            "mobile_number": this.addData.mobile_number,
            "house_no": this.addData.house_no,
            "city": this.addData.city,
            "state": this.addData.state,
            "landmark": this.addData.landmark,
            "pin_code": this.addData.pin_code,
            "address_type": this.type,

        }
        this.appService.addaddress(inData).subscribe(res => {
            if (res.json().status == 200) {
                this.getAdd();
                this.showAddresses = true;
                this.addresses = false;
                swal(res.json().message, "", "success");
            } else {
                swal(res.json().message, "", "error");
            }
        })

    }
    getAddData = [];
    getAdd() {
        this.appService.getAddress().subscribe(res => {
            this.getAddData = res.json().delivery_address;

        })
    }
    payOptions = [];
    paymentOptions() {
        this.appService.paymentType().subscribe(res => {
            this.payOptions = res.json().options;
        }, err => {

        })
    }

    //showPayment
    showPayment() {
        this.showPaymentMethode = !this.showPaymentMethode;
        this.showCartItems = false;
        this.showAddresses = false;
        this.showDeliveryAddress = false;
        window.scrollTo(0, 0);
    }
    addId;
    // show shipment type
    shipmentType(addId) {
        this.addresses = false;
        this.showAddresses = false;
        this.showDeliveryAddress = false;
        this.showPaymentMethode = true;
        this.addId = addId;
        swal("Selected successfully", "", "success");
    }

    //items popup
    showItems() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(ItemsComponent, dialogConfig);

    }
    showPromos() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(PromocodesComponent, dialogConfig);

    }
    cartData;
    sku = [];
    cartCount;
    billing;
    prodName;
    getCart() {
        var inData = sessionStorage.getItem('userId');
        this.appService.getCart(inData).subscribe(res => {
            this.cartData = res.json().cart_details;
            for (var i = 0; i < this.cartData.length; i++) {
                this.cartData[i].products.skuValue = this.cartData[i].products.sku_details[0].size;
                this.cartData[i].products.skid = this.cartData[i].products.sku_details[0].skid;
                this.cartData[i].products.selling_price = this.cartData[i].products.sku_details[0].selling_price;
                this.cartData[i].prodName = this.cartData[i].products.product_name;
                this.cartData[i].products.img = this.cartData[i].products.sku_details[0].sku_images[0].sku_image;
            }
            this.cartCount = res.json().count;
            this.billing = res.json().selling_Price_bill;

        }, err => {

        })
    }
    skuData = [];
    skuArr = [];
    offer_price;
    changeData(prodId) {
        this.getCart();
        for (var i = 0; i < this.cartData.length; i++) {
            // for(var j = 0;j<this.cartData[i].products;j++){
            for (var k = 0; k < this.cartData[i].products.sku_details.length; k++) {
                if (parseInt(prodId) === this.cartData[i].products.sku_details[k].skid) {
                    this.skuData = this.cartData[i].products.sku_details[k];
                    this.offer_price = this.cartData[i].products.sku_details[k].offer_price;
                }
            }
        }
    }
    delCart(cartId) {
        var inData = cartId;
        this.appService.delCart(inData).subscribe(res => {
            swal(res.json().message, "", "success");
            this.getCart();
        }, err => {

        })
    }
    checkout() {
        this.showCartItems = false;
        this.showDeliveryAddress = true;
    }
    seleOpt;
    payId;
    selePayOptn(index, Id) {
        this.seleOpt = index;
        this.payId = Id;
    }
    ordData = [];
    orderPlace() {
        if (sessionStorage.userId === undefined) {
            swal('Please Login', '', 'warning');
            return;
        } else if (this.payId != 3) {
            swal("Please select Cash on Delivery", "", "warning");
            return
        } else {
            var inData = {
                "delivery_address_id": this.addId,
                "billing_amount": this.billing,
                "payment_type": this.payId,
                "vendor_id": sessionStorage.getItem('userId'),
                "order_status": "placed",
                "wholesaler_id": sessionStorage.wholeSellerId,
                "item_type": "ecommerce"
            }

            this.appService.palceOrder(inData).subscribe(res => {
                this.ordData = res.json().Order[0].order_id;
                swal(res.json().message, "", "success");
                this.router.navigate(['/Orderplaced'], { queryParams: { orderId: this.ordData } });
            }, err => {

            })
        }
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
    checkProdQuty(cartId, prodId, skuId, qunt) {
        this.appService.checkQuty(prodId, skuId, qunt).subscribe(res => {
            if (res.json().status === 200) {
                this.stackCheck = "In Stock";
                this.itemIncrease(cartId);
            } else {
                this.stackCheck = "Out of Stock";
                swal(res.json().message, "", "error");
            }
        })
    }

    itemDecrease(cartId, prodId, skuId, qunt, venId, venprodId) {
        for (var i = 0; i < this.cartData.length; i++) {
            if (this.cartData[i].cart_id === cartId) {
                if (this.cartData[i].quantity === 1) {
                    this.delCart(cartId);
                    return;
                } else {
                    this.cartData[i].quantity = this.cartData[i].quantity - 1;
                    this.modifyCart(this.cartData[i].quantity, cartId);
                    this.appService.checkQuty(prodId, skuId, qunt).subscribe(res => {
                        if (res.json().status === 200) {
                            this.stackCheck = "In Stock";
                        } else {
                            this.stackCheck = "Out of Stock";
                            // swal(res.json().message, "", "error");
                        }
                    })
                }
                // this.getCart();
                return;
            }
        }

    }

    modifyCart(quantity, cartId) {
        var params = {
            "quantity": quantity
        }

        this.appService.modifyCart(params, cartId).subscribe(resp => {
            if (resp.json().status === 200) {
                // swal(resp.json().message, "", "success");
                // jQuery("#signupmodal").modal("hide");
                // $('body').removeClass('modal-open');
                // $('.modal-backdrop').remove();
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
}
