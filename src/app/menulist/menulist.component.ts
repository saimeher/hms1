import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { ModalComponent } from '../modal.component';
import { ReactiveFormsModule, FormsModule, Form, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Popup } from 'ng2-opd-popup';
@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.css']
})
export class MenulistComponent implements OnInit {
  menulist_form: FormGroup;
  menulistitems_form: FormGroup;
  @ViewChild('popup1') popup1: Popup;
 @ViewChild('modal1') modal1: ModalComponent;
  public data;
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "name";
  public sortOrder = "asc";
  id;
  day: string;
  data2;
  users: Array<any> = [

    { username: 'Sunday' },
    { username: 'Monday' },
    { username: 'Tuesday' },
    { username: 'wednesday' },
    { username: 'Thursday' },
    { username: 'Friday' },
    { username: 'Saturday' },
  ];
 
  data1;
 
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService, public fb: FormBuilder, private popup: Popup) {
    this.menulist_form = this.fb.group({
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      snacks: ['', Validators.required],
      dinner: ['', Validators.required],
      day: ['', Validators.required]

    })
    this.menulistitems_form = this.fb.group({
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      snacks: ['', Validators.required],
      dinner: ['', Validators.required],
      dinner1:['', Validators.required],
      id: this.id

    })

  };
 

  ngOnInit() {
    this.getmenulist();

  }
  menulistitems() {

    this._apiService.menulist(this.menulist_form.value).subscribe(data1 => {
      this.data1 = data1;
      this.menulist_form.reset();
      this.getmenulist();
    })
  }
  editmenulist(project) {
    this.id = project.id;
    this.day = project.mday;
    this.menulistitems_form.patchValue(project);
    this.popup.options = {
      header: this.day,
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
    // this.modal1.show();

  }
  updatemenulist() {
    this._apiService.updatelist(this.menulistitems_form.value).subscribe(data2 => {
      this.data2 = data2;
      this.getmenulist();
    })
    this.popup1.hide();
  }
  close() {
    this.popup1.hide();

  }
  getmenulist() {
    this._apiService.getmenulist().subscribe(data => {
      this.data = data.data;
      console.log(data.data);
    })
  }
 
 

}
