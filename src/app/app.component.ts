import { Component, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from './services/productservice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService, private zone: NgZone) {
    translate.setDefaultLang('en');

  }
  // public title = 'Places';
  public addrKeys: string[];
  public addr: object;
  position1;
  positionValue1;
  city;
  //Method to be invoked everytime we receive a new instance 
  //of the address object from the onSelect event emitter.
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    console.log(addrObj);
    debugger;
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      this.position1 = addrObj.formatted_address;
      this.positionValue1 = this.position1.split(',');
      this.city = this.positionValue1[0].trim();
      // localStorage.setItem('city', this.city);
    });
  }

  setAreaAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
      // this.position2 = addrObj.formatted_address;
      // this.positionValue2 = this.position2.split(',');
      // this.area = this.positionValue2[0].trim();
      // localStorage.setItem('area', this.area);
    });
  }

}
