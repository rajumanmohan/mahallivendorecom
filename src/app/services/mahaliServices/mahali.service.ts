import { AppSettings } from './../constants/constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class appService {
    product: any;
    constructor(private http: Http) { }
    registration(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.registrationUrl, params, { headers: headers });
    }
    login(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.loginUrl, params, { headers: headers });
    }
    changePwd(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': JSON.parse(sessionStorage.token)
        });
        return this.http.post(AppSettings.changePwdUrl, params, { headers: headers });
    }
    getProduct() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.productUrl, { headers: headers })
    }
    loginDetailsbyEmail(formValaues) {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.loginDetailsbyEmail + formValaues, { headers: headers })
    }
    updateProfile(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': (sessionStorage.token),
        });
        return this.http.put(AppSettings.updateProfile + "/" + this.vendor_id, params, { headers: headers })
    }
    forgotPassword(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.forgotPw, params, { headers: headers });
    }
    getCategories() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.categoriesUrl, { headers: headers });
    }
    getWholeSellers() {
        const headers = new Headers({ 'Content-Type': "application/x-www-form-urlencoded" });
        return this.http.get(AppSettings.getWholeSellersUrl, { headers: headers })
    }
    vendor_id;
    addaddress(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.post(AppSettings.addaddress + "/" + this.vendor_id, params, { headers: headers });
    }
    getAddress() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.getAddress + "/" + this.vendor_id, { headers: headers });
    }
    delAddress(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delAddress + "/" + params, { headers: headers });
    }
    businessDetails(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.businessDetails + "/" + this.vendor_id, params, { headers: headers });
    }
    taxDetails(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.taxDetails + "/" + this.vendor_id, params, { headers: headers });
    }
    bankDetails(parmas) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.bankDetails + "/" + this.vendor_id, parmas, { headers: headers });
    }
    getBanners() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBanners, { headers: headers });
    }
    productByCatId(params, params1) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productByCatId + "/" + params, params1, { headers: headers });
    }
    productBySubCatId(params, params1) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.productBySubCatId + "/" + params, params1, { headers: headers });
    }
    searchProducts(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.searchProducts + "/" + params, { headers: headers });
    }
    addtoCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });
        return this.http.post(AppSettings.addToCart, params, { headers: headers });
    }
    getCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': sessionStorage.userId === undefined ? (sessionStorage.session) : ""
        });
        return this.http.get(AppSettings.getCart + "/" + params, { headers: headers });
    }
    delCart(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.delete(AppSettings.delCart + "/" + this.vendor_id + "/" + params, { headers: headers });
    }
    paymentType() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.paymentType, { headers: headers });
    }
    palceOrder(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'x-access-token': (sessionStorage.token),
        });
        return this.http.post(AppSettings.palceOrder, params, { headers: headers });
    }
    orderSummary(ordId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.orderSummary + "/" + ordId, { headers: headers });
    }
    getAccDetails() {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getAccDetails + "/" + this.vendor_id, { headers: headers });
    }
    updateAcc(params) {
        this.vendor_id = sessionStorage.userId;
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateAcc + "/" + this.vendor_id, params, { headers: headers });
    }
    dealOfDay() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.dealOfDay, { headers: headers });
    }
    getJewel() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getJewel, { headers: headers });
    }
    getCloth() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getCloth, { headers: headers });
    }
    getProductById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.ProductById + "/" + params, { headers: headers });
    }
    ecomProducts(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.ecomProducts, params, { headers: headers });
    }
    getPlaceOrder() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.getItem('userId');
        return this.http.get(AppSettings.getPlaceOrd + "/" + this.vendor_id, { headers: headers });
    }
    reqOrder(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.reqProducts + "/" + this.vendor_id + "/" + params, { headers: headers });
    }
    orderById(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.ordById + "/" + params, { headers: headers });
    }
    update(params, venId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateProd + "/" + venId, params, { headers: headers });
    }
    getAdd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        // this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getAddbyId + "/" + params, { headers: headers });
    }
    updateAddData(params, addId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.put(AppSettings.updateAddress + "/" + this.vendor_id + "/" + addId, params, { headers: headers });
    }
    filterVendor(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.post(AppSettings.filterVendor + "/" + this.vendor_id, params, { headers: headers });
    }
    getAddedData() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getAddedData + "/" + this.vendor_id, { headers: headers });
    }
    delProd(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.delete(AppSettings.delProd + "/" + params, { headers: headers });
    }
    getFooter(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getFooter, params, { headers: headers });
    }
    getEcomVenProds() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getEcomVenProds, { headers: headers });
    }
    getUserOrders() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getUserOrders, { headers: headers });
    }
    reqAdmin(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.requestAdmin, params, { headers: headers });
    }
    getEcomCats() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.shoEcomCats, { headers: headers });
    }
    //user order
    updateUsrOrd(cartId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.updateUserOrd + "/" + cartId, params, { headers: headers });
    }
    otpVerify(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.otpUrl, params, { headers: headers });
    }
    changePwForgot(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.changeForgot, params, { headers: headers });
    }
    updateGetCart(params) {
        const headers = new Headers({
            'Content-Type': "application/JSON",
            'session_id': (sessionStorage.session),
        });
        return this.http.put(AppSettings.updategetCart, params, { headers: headers });
    }
    modifyCart(params, cartId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.put(AppSettings.modifyCart + '/' + cartId, params, { headers: headers });
    }
    getBrands() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBrands, { headers: headers });
    }
    filterByBrandCat(catId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterByBrandCat + "/" + catId, params, { headers: headers });
    }
    filterByBrandSubCat(subId, params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterByBrandSubCat + "/" + subId, params, { headers: headers });
    }
    filterByBrandDeals(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterByBrandDeals, params, { headers: headers });
    }
    filterByBrandTopOff(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterByBrandTopOff, params, { headers: headers });
    }
    filterByBrandRec(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.filterByBrandRec, params, { headers: headers });
    }
    getEcomDeals(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getEcomDeals, params, { headers: headers });
    }
    getEcomTopOffers(params) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.post(AppSettings.getEcomTopOffers, params, { headers: headers });
    }
    getUserOrdByVenId() {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.getUserOrdByVenId + "/" + this.vendor_id, { headers: headers });
    }
    orderDetByVenId(ordId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        this.vendor_id = sessionStorage.userId;
        return this.http.get(AppSettings.orderDetByVenId + "/" + ordId + "/" + this.vendor_id, { headers: headers });
    }
    checkQuty(proId, skuId, qnt) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.checkQuty + "/" + proId + "/" + skuId + "/" + qnt, { headers: headers });
    }
    getBannerProds(ImgId) {
        const headers = new Headers({ 'Content-Type': "application/JSON" });
        return this.http.get(AppSettings.getBannerProds + "/" + ImgId, { headers: headers });
    }
}

