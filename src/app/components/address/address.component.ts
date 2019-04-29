import { Component, OnInit } from '@angular/core';
import { appService } from './../../services/mahaliServices/mahali.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    bussinessForm: FormGroup;
    StationaryForm: FormGroup;
    bankForm: FormGroup;
    bussiness_first_name_errors = false;
    bussiness_last_name_errors = false;
    mobile_number_errors = false;
    bussiness_email_errors = false;
    bussiness_name_errors = false;
    bussiness_address_errors = false;
    bussiness_country_errors = false;
    bussiness_area_errors = false;
    bussiness_city_errors = false;
    pin_code_errors = false;
    submitted = false;
    vat_number_errors = false;
    cr_number_errors = false;
    account_holder_name_errors = false;
    account_number_errors = false;
    bank_name_errors = false;
    ifsc_code_errors = false;
    bank_area_errors = false;
    bank_city_errors = false;
    bank_branch_errors = false;
    re_account_number_errors = false;
    showbussinessDetails: boolean = true;
    showStationaryData: boolean = false;
    showBankDetails: boolean = false;
    showAdd: boolean = false;
    constructor(public appService: appService, private router: Router, private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.bussinessForm = this.formBuilder.group({
            bussiness_first_name: [''],
            bussiness_last_name: [''],
            mobile_number: [''],
            bussiness_email: [''],
            bussiness_name: [''],
            bussiness_address: [''],
            bussiness_country: [''],
            bussiness_area: [''],
            bussiness_city: [''],
            pin_code: [''],
        });
        this.StationaryForm = this.formBuilder.group({
            vat_number: [''],
            cr_number: ['']
        });
        this.bankForm = this.formBuilder.group({
            account_holder_name: [''],
            account_number: [''],
            re_account_number: [''],
            bank_name: [''],
            ifsc_code: [''],
            bank_area: [''],
            bank_city: [''],
            bank_branch: [''],
        });
        this.showbussiness();
    }

    // bussiness form
    get f() { return this.bussinessForm.controls; }

    bussinessDetails() {

        if (this.bussinessForm.value.bussiness_first_name === '') {
            this.bussiness_first_name_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_last_name === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = true;
            return;
        }
        else if (this.bussinessForm.value.mobile_number === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_email === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_name === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_address === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.bussiness_address_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_country === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.bussiness_address_errors = false;
            this.bussiness_country_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_area === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.bussiness_address_errors = false;
            this.bussiness_country_errors = false;
            this.bussiness_area_errors = true;
            return;
        } else if (this.bussinessForm.value.bussiness_city === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.bussiness_address_errors = false;
            this.bussiness_country_errors = false;
            this.bussiness_area_errors = false;
            this.bussiness_city_errors = true;
            return;
        } else if (this.bussinessForm.value.pin_code === '') {
            this.bussiness_first_name_errors = false;
            this.bussiness_last_name_errors = false;
            this.mobile_number_errors = false;
            this.bussiness_email_errors = false;
            this.bussiness_name_errors = false;
            this.bussiness_address_errors = false;
            this.bussiness_country_errors = false;
            this.bussiness_area_errors = false;
            this.bussiness_city_errors = false;
            this.pin_code_errors = true;
            return;
        }

        // stop here if form is invalid
        // if (this.bussinessForm.invalid) {
        //     return;
        // }
        this.appService.businessDetails(this.bussinessForm.value).subscribe(res => {
            swal(res.json().message, "", "success");
            this.showStationary();
        }, err => {

        })

    }

    // stationary form
    get f1() { return this.StationaryForm.controls; }

    tax() {
        if (this.StationaryForm.value.vat_number === '') {
            this.vat_number_errors = true;
            return;
        } else if (this.StationaryForm.value.cr_number === '') {
            this.vat_number_errors = false;
            this.cr_number_errors = true;
            return;
        }


        // stop here if form is invalid
        // if (this.StationaryForm.invalid) {
        //     return;
        // }
        this.appService.taxDetails(this.StationaryForm.value).subscribe(res => {
            swal(res.json().message, "", "success");
            this.showBank();
        }, err => {

        })
    }

    // bank Details form

    get f2() { return this.bankForm.controls; }

    bankDeatails() {
        if (this.bankForm.value.account_holder_name === '') {
            this.account_holder_name_errors = true;
            return;
        }
        else if (this.bankForm.value.account_number === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = true;
            return;
        } else if (this.bankForm.value.re_account_number === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.re_account_number_errors = true;
            return;
        }
        else if (this.bankForm.value.bank_name === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = true;
            this.re_account_number_errors = false;
            return;
        } else if (this.bankForm.value.ifsc_code === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = true;
            this.re_account_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_area === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = true;
            this.re_account_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_city === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = false;
            this.bank_city_errors = true;
            this.re_account_number_errors = false;
            return;
        } else if (this.bankForm.value.bank_branch === '') {
            this.account_holder_name_errors = false;
            this.account_number_errors = false;
            this.bank_name_errors = false;
            this.ifsc_code_errors = false;
            this.bank_area_errors = false;
            this.bank_city_errors = false;
            this.bank_branch_errors = true;
            this.re_account_number_errors = false;
            return;
        }
        //         else if(this.bankForm.value.account_number===this.bankForm.value.re_account_number){
        // alert(this.bankForm.value.account_number===this.bankForm.value.re_account_number);
        //         }

        // stop here if form is invalid
        // if (this.bankForm.invalid) {
        //     return;
        // }
        // if (this.bankData.account_number == this.bankData.retype_acc) {
        this.appService.bankDetails(this.bankForm.value).subscribe(res => {
            swal(res.json().message, "", "success");
            this.router.navigate(['/']);
        }, err => {

        })
        // }
        //  else {
        //     swal("Account number missmatch", "", "error");
        // }

    }


    showbussiness() {
        this.showbussinessDetails = true;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = false;
    }

    showStationary() {
        this.showbussinessDetails = false;
        this.showStationaryData = true;
        this.showBankDetails = false;
        this.showAdd = false;

    }

    showBank() {
        this.showbussinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = true;
        this.showAdd = false;
    }

    addProd() {
        this.showbussinessDetails = false;
        this.showStationaryData = false;
        this.showBankDetails = false;
        this.showAdd = true;
    }
    bussinessData = {
        first_name: '',
        last_name: '',
        mobile_number: '',
        email: '',
        bussiness_name: '',
        bussiness_address: '',
        bussiness_country: '',
        bussiness_area: '',
        bussiness_city: ''
    }
    taxData = {
        vat_number: '',
        cr_number: ''

    }
    bankData = {
        account_holder_name: "",
        account_number: "",
        retype_acc: "",
        bank_name: "",
        ifsc_code: "",
        bank_area: "",
        bank_city: "",
        bank_branch: "",
    }

}
