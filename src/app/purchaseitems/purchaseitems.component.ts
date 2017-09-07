import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormControl } from '@angular/forms';
import { ModalComponent } from '../modal.component';
import { FormGroup, FormArray, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-purchaseitems',
  templateUrl: './purchaseitems.component.html',
  styleUrls: ['./purchaseitems.component.css']
})
export class PurchaseitemsComponent implements OnInit {

  public filterQuery = "";
  public filterQuery1 = "";
  public rowsOnPage = 10;
  public sortBy = "";
  public sortOrder = "asc";
  purchaseData;
  todaydate = new Date();
  // today = new Date().toISOString().slice(0, 10);
  today;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    timeout: 5000
  });
  // date= new Date();
  selected_Date:any;
  dat;
  pdetails;
  d;
  @ViewChild('popup3') popup3: Popup;
  // public model: Object = { date: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day:this.date.getDate() } };
  // selected_Status:any;
  selectedstatus = 'all';
  selected_Status = 'all';
  public toasterService: ToasterService;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,
    toasterService: ToasterService,
    public popup: Popup) {
      this.toasterService= toasterService;
     // this.selected_PurchaseData();
      // private model: Object = { date: { year: 2018, month: 10, day: 9 } };
  }


  ngOnInit() {
    this.purchaseItemsList();
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() + 1 }

  };

onDateChanged(event: IMyDateModel) {
    this.today =event.date.year+'-'+event.date.month+'-'+event.date.day;
    this.selected_PurchaseData(this.today,this.selected_Status);
}

changeStatus($event){
  this.selected_Status=$event.target.value;
     this.selected_PurchaseData(this.today,this.selected_Status);
}

selected_PurchaseData(date:any='',status:any=''){
    //date=this.model;
    let body={};
    body['date']=date;
    body['status']=status;
    console.log(body);
    this._apiService.selected_PurchaseData(body).subscribe(data=>{
      console.log(data);
    this.purchaseData = data.data.data;
      
    })
}

  purchaseItemsList() {
    this._apiService.purchaseItemsList().subscribe(pitems => {
      if (pitems) {

        this.purchaseData = pitems.data.data;

      }
    })
  }
  
  itembuy()
  {
    console.log(this.selectedItems);
    let temp={};
   temp['list'] =this.selectedItems;
    console.log(temp);
    JSON.stringify(temp);
    this._apiService.itembuy(temp).subscribe(da=>
    {
      //this.da= da;
      this.purchaseItemsList(); 
      this. popToast(); 
    })
  } 
  selectedItems = [];
  unSelectedItems=[];
  tempitems=[];
  itemstatus= false;
  temp_val;
  checkedItems(val, event) {
    console.log(val);
    this.temp_val= val
    if (event) {
      this.temp_val='';
      this.itemstatus=true;
       for(var i=0;i<this.selectedItems.length;i++){
         if(this.selectedItems[i].mid==val.mid){
           this.selectedItems.splice(i,1);
           break;
         }
       }
      this.selectedItems.push(val);
      console.log(this.selectedItems);
      
    } 
    else
     {
      this.temp_val='';
      this.itemstatus=false;
      var index = this.selectedItems.indexOf(val);
      if (index > -1) {
        for(var i=0;i<this.selectedItems.length;i++){
         if(this.selectedItems[i].mid==val.mid){
           this.selectedItems.splice(i,1);
         }
        }
      }
  }
}
  popToast() {
  this.toasterService.pop('success', '', 'Successfully submitted your request');
 }
 purchaserdetails(pdata)
 {
   let d= {};
   this.dat= pdata.pdate
   d['dat'] = this.dat;
  this._apiService.purchaserdetails(d).subscribe(pdetails=>{
    this.pdetails=pdetails.data.data;
    console.log(pdetails);
  })
  this.popup.options = {
   header: "Material request",
   color: "#2c3e50", // red, blue.... 
   widthProsentage: 40, // The with of the popou measured by browser width 
   animationDuration: 1, // in seconds, 0 = no animation 
  // showButtons: true, // You can hide this in case you want to use custom buttons 
   confirmBtnContent: "OK", // The text on your confirm button 
   cancleBtnContent: "Cancel", // the text on your cancel button 
   confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
   cancleBtnClass: "btn btn-danger", // you class for styling the cancel button 
   animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
 };
  this.popup3.show();
 }
close1()
{
  this.popup3.hide();
}
status(){
    this.dat;
    console.log(this.dat);
    let v={};
    v['dat'] = this.dat;
    this._apiService.status(v).subscribe(d=>
    {
    this.d=d;
    this.purchaseItemsList();
    this.popup3.hide();
    })
  }


}
