import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-semestery',
  templateUrl: './semestery.component.html',
  styleUrls: ['./semestery.component.css']
})

export class SemesteryComponent implements OnInit {
  roomType: any;
  id : any;
  data1;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup) {

  }

  userForm = new FormGroup({
    type: new FormControl(),
    totalcount: new FormControl(),
    cost: new FormControl(),
    totaldues:new FormControl()
  });


  hide1() {
    this.popup1.hide();
  }

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  ngOnInit() {
    this._apiService.page = "addRoomType";
    this.getRoomType();
  }

  addRoomType(value) {
    console.log(value, 'value');
    this._apiService.addRoomType(value).subscribe(update => {
      this.popup1.hide();
    });
  }

  getRoomType() {
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);
      // if (data.data)
        this.roomType = data.data;
      // console.log(data.data, this.roomType);
    });
  }

  ClickButton() {
    // this.popup.show();
    this.popup1.options = {
      header: "Add Room Type",
      color: "#2c3e50", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Submit", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-default btn-square", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square", // you class for styling the cancel button 
      animation: "fadeInDown", // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }
  // YourConfirmEvent() {
  //   alert('You cliked confirm');
  // }

  // delete(td)
  // {
  //   this.id=td.id;
  //   this._apiService.delete(this.id).subscribe(data1=>{
  //     this.data1=data1;
  //   })
  // }

}
