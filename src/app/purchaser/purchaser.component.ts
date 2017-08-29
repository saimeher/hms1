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
  selector: 'app-purchaser',
  templateUrl: './purchaser.component.html',
  styleUrls: ['./purchaser.component.css']
})
export class PurchaserComponent implements OnInit {
  purchase_form: FormGroup;
  newitemaddForm: FormGroup;

  itemaddForm: FormGroup;
  stock_balance;
  error = false;
  errorMessage = '';
  rem_length;
  data;
  insert = {};
  item;
  value1;
  array;
  check_list = [];
  purchaseData
  table = true;
  dat0;
  purchaser ='';
  pdetails;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  public toasterconfig: ToasterConfig =
  new ToasterConfig({
    timeout: 5000
  });
  public toasterService: ToasterService;
  // public data;
  public filterQuery = "";
  public filterQuery1 = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";


  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,
    toasterService: ToasterService,
    public popup: Popup) {
    this.toasterService = toasterService;
    this.stockBalance();
  }

  slots: Array<any> = [

    { name: 'Breakfast' },
    { name: 'Lunch' },
    { name: 'Snacks' },
    { name: 'Dinner' },
  ];
  units: Array<any> = [

    { u: 'kgs' },
    { u: 'litres' },
    { u: 'packets' },
    { u: 'gms' },
  ];

  //  a: any;
  //  events={};
  ngOnInit() {
    this.stockBalance();
    this.purchaseItemsList();
    this.getnames();
    this.itemaddForm = this.fb.group({
      purchaser:['',Validators.required],
      activeList: this.fb.array([]),
    });
    this.newitemaddForm = this.fb.group({
      item1: ['', Validators.required],
      units1: ['', Validators.required],
      minvalue: ['', Validators.required]
    });
  }

  addactiveList() {

    const control = <FormArray>this.itemaddForm.controls['activeList'];
    const addrCtrl = this.initLink();
    control.push(addrCtrl);

    console.log(control.length);
    //this.addmore_length = (control.length);

  }

  initLink() {
    return this.fb.group({
      purchaser:['',Validators.required],
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      units: ['', Validators.required],
      mid: '',
    });
  }
  stockBalance() {
    this._apiService.stockBalance().subscribe(stockbalance => {
      if (stockbalance) {
        for (var i = 0; i < stockbalance.data.data.length; i++) {
          stockbalance.data.data[i].total_balance = parseInt(stockbalance.data.data[i].total_balance);
          stockbalance.data.data[i].minvalue = parseInt(stockbalance.data.data[i].minvalue);
        }
        this.stock_balance = stockbalance.data.data;
        console.log(this.stock_balance);
      }
    })
  }
  check = false;
  checkedValues(item) {
    this.check_list;
    this.check_list.push(item);

    console.log(this.check_list);
    if (!this.check) {
      console.log(item);
    }
    if (this.check) {
      console.log('uncheckde');
    }
  }
  controlArray;
  selectedItems = [];
  unSelectedItems = [];
  tempitems = [];
  itemstatus = false;
  temp_val;
  clickedItem(val, event) {
    //this.selectedItems = [];
    
    console.log(val,event);
    this.temp_val = val
    if (event) {
      this.temp_val = '';
      this.itemstatus = true;
      for (var i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].mid == val.mid) {
          this.selectedItems.splice(i, 1);
          break;
        }
      }
      this.selectedItems.push(val);
      // this.selectedItems = Array.from(new Set(this.tempitems));
      console.log(this.selectedItems);

    } else {
      this.temp_val = '';
      this.itemstatus = false;
      var index = this.selectedItems.indexOf(val);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
        this.controlArray = <FormArray>this.itemaddForm.controls['activeList'];
        this.controlArray.removeAt(this.itemaddForm.controls['activeList'][index]);
        this.unSelectedItems = this.selectedItems;
        for (var i = 0; i < this.selectedItems.length; i++) {
          if (this.selectedItems[i].mid == val.mid) {
            this.selectedItems.splice(i, 1);
            this.controlArray = <FormArray>this.itemaddForm.controls['activeList'];
            this.controlArray.removeAt(this.itemaddForm.controls['activeList'][i]);
            break;
          }
        }
      }
      //  let controlArray = <FormArray>this.itemaddForm.controls['activeList'];   
      this.selectedItems.forEach(app => {
        // const fb = this.initLink();
        // fb.patchValue(app);
        this.controlArray.removeAt(this.itemaddForm.controls['activeList'][index]);
        console.log(this.controlArray);

      });
    }

  }
  purchasepop() {
    // this.table=false;
    this.popup.options = {
      header: "Purchase Items",
      color: "#34495e", // red, blue.... 
      widthProsentage: 50, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: false, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "ok", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-info", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "fadeInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    this.popup1.show();
    console.log(this.selectedItems);
    console.log(this.temp_val);

    if (this.itemstatus) {
      this.controlArray = <FormArray>this.itemaddForm.controls['activeList'];
      // this.selectedItems = Array.from(new Set(this.tempitems));    
      // this.controlArray=[];

      for (var i = 0; i < this.selectedItems.length; i++) {


        this.controlArray.removeAt(this.itemaddForm.controls['activeList'][i]);


      }
      this.selectedItems.forEach(app => {
        console.log(app);
        const fb = this.initLink();
        console.log(fb);
        fb.patchValue(app);
        this.controlArray.push(fb);
      });
    }
    if (this.itemstatus == false) {

      console.log(<FormArray>this.itemaddForm.controls['activeList']);
      this.controlArray = <FormArray>this.itemaddForm.controls['activeList'];
      for (var i = 0; i < this.selectedItems.length; i++) {

        this.controlArray.removeAt(this.itemaddForm.controls['activeList'][i]);


      }
      this.unSelectedItems.forEach(app => {
        const fb = this.initLink();
        fb.patchValue(app);
        this.controlArray.push(fb);
      });
    }


  }
  cancel() {
    console.log('hello');
    // this.stockBalance();
    this.popup1.hide();
  }
  quantity: '';
  purchasersubmit() {
    console.log(this.quantity)
  }
  dat;
  itemaddform() {

    console.log(this.purchaser);
    //  this.insert['purchaser'] = this.purchaser;
    console.log(this.itemaddForm.value);
    this._apiService.purchaserlist(this.itemaddForm.value).subscribe(dat => {
      this.dat = dat;
      console.log(dat);
      
      if(dat){
         for (var i = 0; i <= this.selectedItems.length; i++) {
           
            this.selectedItems.splice(i, 1);
            this.controlArray = <FormArray>this.itemaddForm.controls['activeList'];
            this.controlArray.removeAt(this.itemaddForm.controls['activeList'][i]);   
        }
        this.itemaddForm.reset();
        this.popup1.hide();
        // this.table=true;
        this.stockBalance();
        this.purchaseItemsList();
      }
      this.selectedItems=[];
    })
  }
  purchaseItemsList() {
    this._apiService.purchaseItemsList().subscribe(pitems => {
      if (pitems) {

        this.purchaseData = pitems.data.data;
        console.log(this.purchaseData);
      }
    })
  }

  popToast() {
    this.toasterService.pop('success', '', 'Successfully submitted your request');
    }
  popToast1() {
    this.toasterService.pop('warning', 'Item Already Existed', 'ERROR');
    }


  submit() {
    console.log(this.newitemaddForm.value);
    this._apiService.addnewitem(this.newitemaddForm.value).subscribe(data2 => {
      console.log(data2);

      if (!data2.data.success) {
        console.log('insert failsed');
        this.popToast1();

      }
      else {
        console.log(data2.data.success)
        // this.data2 = data2;
        console.log('insert');

        this.popToast();
        this.newitemaddForm.reset();
        this.stockBalance();
        this.popup2.hide();

      }
    }
    )

  }

  addnewitem() {
        this.popup.options = {
        header: "Add New Item",
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
    this.popup2.show();
    // this.modal1.show();
  }

  cancel1() {
    this.popup2.hide();
  }
  getnames()
  {
   this._apiService.getnames().subscribe(dat0=>
  {
    this.dat0= dat0.data.data;
    console.log(dat0.data.data);
  })
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
    header: "Add New Item",
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
}
