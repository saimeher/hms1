import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
    }, 1000)
  }

}
