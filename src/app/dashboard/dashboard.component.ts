import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IMyOptions, IMyDateModel, IMyDpOptions } from 'mydatepicker';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todaydate=new Date();
  dummy=false;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
  ) { }

  ngOnInit() {
    this._apiService.page = "dashboard";
    setTimeout(function () {
      $(function () {
        $("#sidebar-toggle").click(function (e) {
          e.preventDefault();
          $(".navbar-side").toggleClass("collapsed");
          $("#page-wrapper").toggleClass("collapsed");
        });
      });
    }, 1000);
    this.getlastInsertDate();

  }

  getlastInsertDate(){
    this._apiService.getlastInsertDate().subscribe(date=>{
        console.log(date);
        let date1=date.data.data;
          this._apiService.year= JSON.parse(date1.year);
          this._apiService.month= JSON.parse(date1.month);
          this._apiService.day= JSON.parse(date1.day);       
        
           console.log(this._apiService.year);
       });
  
  }

   public myDatePickerOptions: IMyDpOptions = {
    // other options...   
    //console.log(this._apiService.year,this._apiService.month,this._apiService.day);
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableUntil: {year: this._apiService.year, month: this._apiService.month, day: this._apiService.day},
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate()+1 }

    
  };
}
