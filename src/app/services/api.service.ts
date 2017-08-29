import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSettings } from '../app.settings';

// @Inj  addRoomType(arg0: any): any {
//     throw new Error("Method not implemented.");
//   }
// ectable()
@Injectable()
export class ApiService {
 


  page = "dashboard";

  constructor(private _http: Http) { }

  // getting designations data
  getdesignations() {
    const body = {}
    return this.callApi(AppSettings.USER_DESIGNATIONS_VIEW_API, 'get', body);
  }

  // year update
  updateYears(data) {
    return this.callApi(AppSettings.UPDATE_YEAR_API, 'post', data);
  }


  // venkat
   // add room type 
  addRoomType(data) {
    return this.callApi(AppSettings.ADD_TYPE_API, 'post', data);
  }

  // add room type 
  addRegistrtion(data) {
    return this.callApi(AppSettings.ADD_REGISTRATION_API, 'post', data);
  }

  getRoomType() {
    const body = {}
    return this.callApi(AppSettings.ROOMTYPE_API, 'get', body);
  }

  getlist() {
    const body = {}
    return this.callApi(AppSettings.GETLIST_API, 'get', body);
  }
  insertlist(data) {
    return this.callApi(AppSettings.INSERTLIST_API, 'post', data);
  }
  itemoutlist(data) {
    return this.callApi(AppSettings.ITEMOUTLIST_API, 'post', data);
  }
  addnewitem(data) {
    return this.callApi(AppSettings.ADDNEWITEM_API, 'post', data);
  }
  menulist(data) {
    return this.callApi(AppSettings.MENULIST_API, 'post', data);
  }
  getmenulist()
  {
     const body = {}
    return this.callApi(AppSettings.GETMENULIST_API,'get',body);
  }
  updatelist(data) {
    return this.callApi(AppSettings.UPDATELIST_API, 'post', data);
  }

  stockRegister(){
    const body = {}
    return this.callApi(AppSettings.STOCKREGISTER_API, 'get', body);
  }
   stockBalance(){
    const body = {}
    return this.callApi(AppSettings.STOCKBALANCE_API, 'get', body);
  }
  getunits(data)
  {
    const body={}
    return this.callApi(AppSettings.GETUNITS_API, 'post', data);
  }
  
  purchaserlist(data)
  {
    console.log(data);  
    return this.callApi(AppSettings.PURCHASERLIST_API, 'post', data);
  }
 
  purchaseItemsList(){
    const body = {}
    return this.callApi(AppSettings.PURCHASEITEMSLIST_API, 'get', body);
  }

  updatemateriallist(data) {
    return this.callApi(AppSettings.UPDATEMATERIALLIST_API, 'post', data);
}

deleteitem(data)
{
    return this.callApi(AppSettings.DELETEITEM_API, 'post', data);
}
selected_PurchaseData(data){
   return this.callApi(AppSettings.SELECTED_PURCHASEDATA, 'post', data);
}

itembuy(body) {
   return this.callApi(AppSettings.ITEMBUY_API, 'post', body);
}
getnames()
{
  const body = {}
  return this.callApi(AppSettings.GETNAMES_API, 'get', body);

}
purchaserdetails(body)
{
  return this.callApi(AppSettings.PURCHASERDETAILS_API, 'post', body);
}
  // responsible for making api calls
  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // if user is logged in, append token to header
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }

    switch (method) {
      case 'post': return this._http.post(url, body, options).map((response: Response) => response.json());
      case 'get': return this._http.get(url, options).map((response: Response) => response.json());
    }
  }
}
