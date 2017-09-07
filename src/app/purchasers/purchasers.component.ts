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
  selector: 'app-purchasers',
  templateUrl: './purchasers.component.html',
  styleUrls: ['./purchasers.component.css']
})
export class PurchasersComponent implements OnInit {
  dat0;
  purchasernamesForm: FormGroup;
  public toasterService: ToasterService;
  public filterQuery = "";
  public filterQuery1 = "";
  public rowsOnPage = 10;
  public sortBy = "";
  public sortOrder = "asc";
  data;
  id;
  dat;
  name;
  da;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,
    toasterService: ToasterService,
    public popup: Popup) {
    this.toasterService = toasterService;
    }

  ngOnInit() {
    this.purchasernamesForm = this.fb.group({
      // id:['',Validators.required],
      name: ['', Validators.required],
      location:['',Validators.required],
     mobile_no : ['', Validators.required]
    });
   this.getnames();
  }
  getnames()
  {
   this._apiService.getnames().subscribe(dat0=>
  {
    this.dat0= dat0.data.data;
    console.log(dat0.data.data);
  })
  }
  purchaseradd()
  {
    this.popup.options = {
      header: "Add Purchaser",
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
     this.popup1.show();
    }
  purchasernames()
  {
      this._apiService.purchasernames(this.purchasernamesForm.value).subscribe(data=>{

        if (!data.data.success) {
          console.log('insert failsed');
          this.popToast1();
  
        }
        else {
          console.log(data.data.success)
          // this.data2 = data2;
          console.log('insert');
  
          this.popToast();
          this.purchasernamesForm.reset();
          this.getnames();
          this.popup1.hide();
  
        }
      }
    )
  }
  cancel()
  {
    this.popup1.hide();
    this.purchasernamesForm.reset();
  }
  popToast() {
    this.toasterService.pop('success', '', 'Successfully submitted your request');
  }
  popToast1() {
    this.toasterService.pop('warning', 'Name Already Existed', 'ERROR');
  }
  purchaserdetails(pdata)
   {
     this.id= pdata.id
    this.purchasernamesForm.patchValue({
      name: pdata.name,
      location: pdata.location,
      mobile_no: pdata.mobile_no,
    });
    this.popup.options = {
    header: "Purchaser Details Update",
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
  }
  cancel1()
  {
    this.popup2.hide();
    this.purchasernamesForm.reset();
  }
  purchaserupdate()
  {
    let data={};
    data['id'] = this.id;
    data['name'] = this.purchasernamesForm.value.name;
    data['location'] = this.purchasernamesForm.value.location;
    data['mobile_no'] = this.purchasernamesForm.value.mobile_no;


    console.log(data);
     this._apiService.purchaserupdate(data).subscribe(dat=>{
       this.dat= dat;
       this.popToast();
       this.getnames();
       this.purchasernamesForm.reset();
       this.popup2.hide();
     })
    
  }


  popToast3() {
    this.toasterService.pop('success', '', 'Successfully deleted');
  }
  purchaserdetailsdelete(pdata)
  {
    this.name = pdata.name;
    this.id=pdata.id;
    this.popup.options = {
      header: "Purchaser Details Delete",
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
    delete1()
    { 
      let data={}
    data['id']=this.id;
      this._apiService.delete1(data).subscribe(da=>{
        this.da = da;
        this.getnames();
        this.popToast3();
        this.popup3.hide();
      })
    }
    close1()
    {
      this.popup3.hide();
    }
  }
