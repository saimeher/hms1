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
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  report_form: FormGroup;
  from_date;
  end_date;
  data;
  data1;
  dat;
  selection = {};
  p;
  total = '0';
  date1;
  data4;
  @ViewChild('popup1') popup1: Popup
  public toasterService: ToasterService;
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
    private popup: Popup) { }

  ngOnInit() {
    this.report_form = this.fb.group({
      from_date: ['', Validators.required],
      end_date: ['', Validators.required]
      // selectchart:['',Validators.required]

    });
    this.reportdata();
  }
  reportdata() {

    this.selection['from_date'] = this.from_date;
    this.selection['end_date'] = this.end_date;
    console.log(this.selection);

    this._apiService.reports(this.selection).subscribe(data1 => {
      if(data1)
        {
      this.dat = data1.data.data;
      // this.data= data1.data.data1[0].p;
      this.data= data1.data.data1[0].total;
      console.log(this.total);
      console.log(this.dat);
      console.log(this.data);
        }
    })
  }
  details(pdata)
   {
    let d = {};
    this.date1= pdata.edate;
    d['dat'] = this.date1;
    console.log(d);
    this._apiService.details(d).subscribe(data4=>
    {
      this.data4 = data4.data.data;
      console.log(this.data4);
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
     this.popup1.show();
  }
  close1()
  {
    this.popup1.hide();
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    disableWeekends: false,

  };
  public myDatePickerOptions1: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    editableDateField: false,
    disableWeekends: false,

    //  disableDays: this.service.holidays,
    disableUntil: { year: 0, month: 0, day: 0 }
    // disableUntil: {year: , month: 5 , day: 17}

  };
  picker1day;
  picker1month;
  picker1year;

  onDateChanged(event: IMyDateModel) {

    this.from_date = event.formatted;
    this.myDatePickerOptions1.disableUntil.year = event.date.year
    this.myDatePickerOptions1.disableUntil.month = event.date.month
    this.myDatePickerOptions1.disableUntil.day = event.date.day - 1
  }

  onDateChanged1(event: IMyDateModel) {
    console.log(this.end_date, 'from date test');
    this.end_date = event.formatted
  }

  clear() {
    this.report_form.reset();

  }
}
