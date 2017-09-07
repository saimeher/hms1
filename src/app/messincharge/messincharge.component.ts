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
  selector: 'app-messincharge',
  templateUrl: './messincharge.component.html',
  styleUrls: ['./messincharge.component.css']
})
export class MessinchargeComponent implements OnInit {
  objectKeys = Object.keys;
  newitemaddForm : FormGroup;
  itemaddForm: FormGroup;
  itemoutForm: FormGroup;
  addmore_length;
  insert_date;
  out_date;
  data1;
  dat1=[];
  mid;
  data2;
  stock_data;
  stock_balance;
  error = false;
  errorMessage = '';
  rem_length;
  data;
  insert = {};
  item;
  value1;
  array;
 data3;
  todaydate=new Date();
  rowscount:string='10';
  rowscount1 :string='10';
 
  public toasterconfig: ToasterConfig = 
  new ToasterConfig({
      timeout        : 5000
  });

  db_date =JSON.parse(localStorage.getItem('date'));
  db_month=JSON.parse(localStorage.getItem('month'));
  db_year=JSON.parse(localStorage.getItem('year'));
  public toasterService: ToasterService;
  @ViewChild('modal1') modal1: ModalComponent;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;
  @ViewChild('popup5') popup5: Popup;
  // public data;
  public filterQuery = "";
  public filterQuery1 = "";
  public rowsOnPage = 15;
  public sortBy = "name";
  public sortOrder = "asc";
 
 

    constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    public fb: FormBuilder,
    toasterService: ToasterService,
    private popup:Popup)
     {
      
      
      this.toasterService = toasterService;
     

    this.stockRegister();
    this.stockBalance();
    this.getlists();
     
    //  this._apiService.getlastInsertDate().subscribe(date=>{
    //     console.log(date);
    //     let date1=date.data.data;
    //       this._apiService.year= JSON.parse(date1.year);
    //       this._apiService.month= JSON.parse(date1.month);
    //       this._apiService.day= JSON.parse(date1.day);       
     
    
    //        console.log(this.year1,this.month1,this.day1);
    //   })
    console.log(this._apiService.year,this._apiService.month,this._apiService.day);
    
    }

  slots: Array<any> = [

    { name: 'Breakfast' },
    { name: 'Lunch' },
    { name: 'Snacks' },
    { name: 'Dinner' },
  ];
  units: Array<any> = [
    
        { u: 'kgs' },
        { u: 'litres'},
        { u: 'packets'},
        { u: 'gms'},
      ];
  messes: Array<any> = [

    { boys: 'Boys Mess' },
    { boys: 'Girls Mess' },
    
  ];    
 a: any;
 events={};

  ngOnInit() {
   
   //  this.temploading!=!this.loading;
    this.itemaddForm = this.fb.group({
      insert_date: ['', Validators.required],
      receipt_no:[''],
      discount : [''],
      purchaser:['',Validators.required],
      activeList: this.fb.array([]),
      
    });
    this.itemoutForm = this.fb.group({
      out_date: ['', Validators.required],
      slot: ['', Validators.required],
      towhom: ['', Validators.required],
      activeList1: this.fb.array([]),
    });
    this.newitemaddForm = this.fb.group({
      item1: ['', Validators.required],
      item_type:['', Validators.required],
      units1: ['', Validators.required],
      minvalue : ['',Validators.required]
    });
    this.addactiveList1();
    
    this.addactiveList();

    
     this.getunits(this.events,this.a)
     this.getCategories();
     this.getnames()
   
  }
  addactiveList() {

    const control = <FormArray>this.itemaddForm.controls['activeList'];
    const addrCtrl = this.initLink();
    control.push(addrCtrl);

    console.log(control.length);
    this.addmore_length = (control.length);

  }

  removeList(i: any) {
    console.log(i);
    const control = <FormArray>this.itemaddForm.controls['activeList'];
    this.rem_length = ((<FormArray>this.itemaddForm.controls['activeList']).length);
    console.log(this.rem_length);
    control.removeAt(i);
    this.addmore_length = this.rem_length - 1;
    console.log(this.addmore_length);
  }
  


  initLink() {
    return this.fb.group({
      name: ['', Validators.required],
      brand:[''],
      quantity: ['', Validators.required],
      units:['',Validators.required],
      price: ['', Validators.required],
      unitsarray :this.fb.array([]),
      categoreis:['',Validators.required],
      catsarray :this.fb.array([]),
      // insert_date:['',Validators.required],
      

    });
  }
  itemaddform() {
    this.insert['type'] = "IN";
    this.insert['reg_no'] = localStorage.getItem('reg_no');
    this.insert['insert_date1'] =this.insert_date;
    const p = Object.assign({}, this.insert, this.itemaddForm.value);
    console.log(p);

    console.log(this.itemaddForm.value);
    this._apiService.insertlist(p).subscribe(data => {
    this.onSaveComplete(data)
    },
    (error: any) => this.errorMessage = <any>error
  );
  }
  onSaveComplete(data): void {
    console.log(data);
    if (!data.success)
    {
        console.error('Savign failed');
        this.error = true;
        this.errorMessage = data.error;
    }
     else 
    {
        console.log('Saving successful');
        this.popToast();
        this.itemaddForm.reset();
        this.getnames();
        this.getCategories();
        this.ngOnInit();
        this.stockBalance();
        this.stockRegister();  
    }

}

    addactiveList1() {
  
      const control = <FormArray>this.itemoutForm.controls['activeList1'];
      const addrCtrl = this.initLink1();
      control.push(addrCtrl);
      console.log(control.length);
      this.addmore_length = (control.length);
  
    }
    removeList1(i: any) {
      console.log(i);
      const control = <FormArray>this.itemoutForm.controls['activeList1'];
      this.rem_length = ((<FormArray>this.itemoutForm.controls['activeList1']).length);
      console.log(this.rem_length);
      control.removeAt(i);
      this.addmore_length = this.rem_length - 1;
      console.log(this.addmore_length);
    }
    initLink1() {
     return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],

      units: ['',Validators.required],
       unitsarray :this.fb.array([]),
       categoreis:['',Validators.required],
      catsarray :this.fb.array([]),
    });
   }
   balance;
   itemoutform() {
     console.log(this.out_date);
    this.insert['type'] = "Out",
    this.insert['reg_no'] = localStorage.getItem('reg_no'),
    this.insert['out_date1'] = this.out_date;
    const p = Object.assign({}, this.insert, this.itemoutForm.value);
    console.log(p,'test1');

    this._apiService.itemoutlist(p).subscribe(data => {
      
      this.outForm(data)
    },
    (error: any) => this.errorMessage = <any>error
    );
    }

   outForm(data): void {
    console.log(data);
    
    if (!data.data.success)
    {
        console.error('Saving failed');
        this.balance = data.data.data;
        console.log(data.data.data);
        // this.stock_data.forEach(element => {
        //   let i=0;
        //   if(element.id==this.balance[i]){
        //     console.log(this.balance[i]);
            
        //   }
        //   i++;
        // });
         this.goPopup2();
        //  this.popToast1();
        this.error = true;
        this.errorMessage = data.error;
    }
     else 
    {
        console.log('Saving successful');
        this.popToast();
        this.itemoutForm.reset();
        this.stockBalance();
        this.stockRegister(); 
        this.itemoutForm.patchValue({
        out_date: [''],
        slot: [''],
        activeList1: this.fb.array([]),
        })
       
        
    }

}

  public myDatePickerOptions: IMyDpOptions = {
    // other options...   
    //console.log(this._apiService.year,this._apiService.month,this._apiService.day);
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableUntil: {year: this.db_year, month: this.db_month, day: this.db_date},
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate()+1 }

    
  };
    
  public myDatePickerOptions2: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mmm-dd',
    editableDateField: false,
    disableWeekends: false,
    disableUntil: {year: this.db_year, month: this.db_month, day: this.db_date},
    disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth()+1, day: this.todaydate.getDate()+1 }
  };
  picker1day;
  picker1month;
  picker1year;
  

  onDateChanged(event: IMyDateModel) {
  //   this.myDatePickerOptions.disableUntil = {year: this.year1, month: this.month1, day: this.day1},
    this.insert_date = event.date.year+'-'+event.date.month+'-'+event.date.day;
    console.log(this.insert_date,'dtae test');
    // this.insert_date = event.formatted;
    // this.myDatePickerOptions2.disableUntil.year = event.date.year
    // this.myDatePickerOptions2.disableUntil.month = event.date.month
    // this.myDatePickerOptions2.disableUntil.day = event.date.day - 1
  }
  onDateChanged2(event: IMyDateModel) {
    this.out_date = event.date.year+'-'+event.date.month+'-'+event.date.day;
    console.log(this.out_date, 'from date test');
    // this.out_date = event.formatted
  }
 
    

  stockRegister() {
    
    this._apiService.stockRegister().subscribe(stockdata => {
      if (stockdata) {


        this.stock_data = stockdata.data.data;
        console.log(this.stock_data);
        this.rowscount = this.stock_data.length;
      }
    })
  }


  stockBalance() {
    this._apiService.stockBalance().subscribe(stockbalance => {
      if (stockbalance) {
       
        for(var i=0;i<stockbalance.data.data.length;i++){
          stockbalance.data.data[i].total_balance= parseInt(stockbalance.data.data[i].total_balance);
          stockbalance.data.data[i].minvalue= parseInt(stockbalance.data.data[i].minvalue);
        }
        this.stock_balance = stockbalance.data.data;
        this.rowscount1=this.stock_balance.length;
        console.log(this.stock_balance,this.rowscount1);
      }
    })
  }

  addnewitem() {
    this.getCategoriesfornewItem();
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
this.popup1.show();
   // this.modal1.show();
  }
  
  // submit() {
  //   console.log(this.newitemaddForm.value);
  //   this._apiService.addnewitem(this.newitemaddForm.value).subscribe(data2 => {
  //     this.data2 = data2;
  //     this.getlists();
  //   })
  //   this.modal1.hide();
  // }
  submit() {
    console.log(this.newitemaddForm.value);
    this._apiService.addnewitem(this.newitemaddForm.value).subscribe(data2 => {
      console.log(data2);
      
      if(!data2.data.success){
          console.log('insert failsed');
           this.popToast1();
     
    }
    else{
      console.log(data2.data.success)
      // this.data2 = data2;
      console.log('insert');
      
     
      this.popToast();
      this.newitemaddForm.reset();
      this.popup1.hide();
       this.getlists();
    }
    }
   )
    
  }

  close() {
    //this.modal1.hide();
    this.popup1.hide();
  }
  Kitchen=[];
  PowdersandOils=[];
  SpicseandNuts=[];
  Miscelleneous=[];
  Pulses_Dals=[];
  getlists() {
    this._apiService.getlist().subscribe(data1 => {
      this.data1 = data1.data;
      console.log(this.data1[0]);
      //console.log(this.data1[0][Kitchen]);
      this.data1.forEach(element => {
        if(element.item_type=='Kitchen'){
          this.Kitchen.push(element);
        }
        if(element.item_type=='PowdersandOils'){
          this.PowdersandOils.push(element);
        }
        if(element.item_type=='SpicseandNuts'){
          this.SpicseandNuts.push(element);
        }
        if(element.item_type=='Miscelleneous'){
          this.Miscelleneous.push(element);
        }
        if(element.item_type=='PulsesandDals'){
          this.Pulses_Dals.push(element);
        }
      });
    })
  } 
  popToast() {
    this.toasterService.pop('success', '', 'Successfully submitted your request');
  }
  popToast1() {
    this.toasterService.pop('warning', 'Item Already Existed', 'ERROR');
  }
  goPopup2() {
        //myModal.open()    
        this.popup2.options = {
            header           : "Warning!",
            color            : "#34495e",        // red, blue.... 
            widthProsentage  : 50,               // The with of the popou measured by browser width 
            animationDuration: 1,
            showButtons      : false,            // You can hide this in case you want to use custom buttons 
            animation        : "bounceInDown",   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
        };
        this.popup2.show(this.popup2.options);
        //this.popup1.show();
  }
    ok() {
      console.log('hello');
      this.popup2.hide();
      this.balance='';
    }
   
     v:any
   // units:any;
   test:any;
   temp=[];

    getunits(event,p)
    {
      console.log(p);
      this.v='';
      
      if(p== '' || p==null) {
        this.temp=[];
        console.log(p,'dfgdgd');
        this.v= 1;
        let val={
        'units' : this.v
      }
      console.log(val);
       this._apiService.getunits(val).subscribe(dat=>
      {
         this.dat1=dat.data.data;
       //  console.log(dat.data.data.units);
         this.test=this.dat1;
         console.log(this.test,'jjjjj');
         
      //  this.test.forEach(element => {
          // this.temp.push({'units':dat.data.data.units});
      //  });
        console.log(dat,'dat test');
        //  this.test=dat.data.data.units.split(",") 
      })
      }
     if(p>=0){
       console.log(p);
       
       this.temp=[];
         this.v=event.target.value;
      let val={
        'units' : this.v
      }
      console.log(val);
      
       this._apiService.getunits(val).subscribe(dat=>
      {
        console.log(dat);
       
        
        
        this.dat1=dat.data.data;
         console.log(dat.data.units);
         this.test = this.dat1;
        // this.test.forEach(element => {
        //  this.temp.push(element);
      //  });
        console.log(dat,'dat test');
         this.test=dat.data.data.units.split(",")
        console.log(dat,'dat test');
       // this.test=dat1.data[0].units.split(",")
       console.log(this.itemaddForm.controls.activeList);
       console.log(this.itemaddForm.controls.activeList.value[p].unitsarray);
       
      //  console.log(this.itemaddForm.controls.activeList[0].controls);
             // this.itemaddForm.controls.activeList.value[p].unitsarray= [];
              this.itemaddForm.controls.activeList.value[p].unitsarray.splice(-1,1)
        this.itemaddForm.controls.activeList.value[p].unitsarray.push(this.test);
       //  this.temp.push(this.test);
   //this.itemaddForm.controls.activeList.value[p].unitsarray=[];
        // this.itemaddForm.value.activeList[p].units =  dat1.data[0].units.split(",");
        console.log(this.itemaddForm.controls.activeList.value[p].unitsarray);
        //
      })
     }
  
    }

  Update() {
    let insert = {};
    insert['mid'] = this.mid;
    insert['units1'] = this.newitemaddForm.value.units1;
    insert['item_type'] = this.newitemaddForm.value.item_type;
    insert['item1'] = this.newitemaddForm.value.item1;
    insert['minvalue'] = this.newitemaddForm.value.minvalue;
    console.log(insert);

    this._apiService.updatemateriallist(insert).subscribe(data3 => {
      if (data3.data.success) {
        this.data3 = data3;
        this.newitemaddForm.reset();
        this.popup4.hide();
        this.popToast();
        this.stockBalance();
      }
      else {
        this.popToast1();
      }
    });
  }

   delete1()
  {
    let data={}
    data['mid']=this.mid;
    console.log(data);
  this._apiService.deleteitem(data).subscribe(det=>{
      console.log(det);
      this.stockBalance();
      this.popup3.hide();
      this.popToast3();
       
    })
  }
  delete(its) {
    let data={}
    this.mid=its.mid;
    this.item=its.item;

    this.popup.options = {
      header: "Success!",
      color: "#34495e", // red, blue.... 
      widthProsentage: 50, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: false, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "ok", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-info", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    console.log(its);

    this.popup3.show();
  }
  close1()
  {
    this.popup3.hide();
  }

  popToast3() {
    this.toasterService.pop('success', '', 'Successfully deleted'  +  this.item );
  }

  details(its) {
    this.mid = its.mid;

    this.newitemaddForm.patchValue({
      item1: its.item,
      units1: its.units,
      minvalue: its.minvalue,
      item_type:its.item_type
    });

    this.popup.options = {
      header: "Update",
      color: "#34495e", // red, blue.... 
      widthProsentage: 50, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: false, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "ok", // The text on your confirm button 
      cancleBtnContent: "Cancel", // the text on your cancel button 
      confirmBtnClass: "btn btn-info", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
    console.log(its);

    this.popup4.show();
  }
  close4()
  {
    this.popup4.hide();
  }

  getunits1(event,p)
    {
      console.log(p);
      this.v='';
      
      if(p== '' || p==null) {
        this.temp=[];
        console.log(p,'dfgdgd');
        this.v= 1;
        let val={
        'units' : this.v
      }
      console.log(val);
      

      this._apiService.getunits(val).subscribe(dat=>
      {
         this.dat1=dat.data.data;
       //  console.log(dat.data.data.units);
         this.test=this.dat1;
         console.log(this.test,'jjjjj');
         
      //  this.test.forEach(element => {
          this.temp.push({'units':dat.data.data.units});
      //  });
        console.log(dat,'dat test');
         this.test=dat.data.data.units.split(",")
         console.log(this.itemoutForm.controls.activeList1);
      })
      }
     if(p>=0){
       console.log(p);
       
       this.temp=[];
         this.v=event.target.value;
      let val={
        'units' : this.v
      }
      console.log(val);
      
       this._apiService.getunits(val).subscribe(dat=>
      {
        console.log(dat);
       
        
        
        this.dat1=dat.data.data;
         console.log(dat.data.units);
         this.test = this.dat1;
        // this.test.forEach(element => {
        //  this.temp.push(element);
      //  });
        console.log(dat,'dat test');
         this.test=dat.data.data.units.split(",")
        console.log(dat,'dat test');
       // this.test=dat1.data[0].units.split(",")
       console.log(this.itemoutForm.controls.activeList1);
       console.log(this.itemoutForm.controls.activeList1.value[p].unitsarray);
       
      //  console.log(this.itemaddForm.controls.activeList[0].controls);
             // this.itemaddForm.controls.activeList.value[p].unitsarray= [];
        this.itemoutForm.controls.activeList1.value[p].unitsarray.splice(-1,1);
        this.itemoutForm.controls.activeList1.value[p].unitsarray.push(this.test);
       //  this.temp.push(this.test);
   //this.itemaddForm.controls.activeList.value[p].unitsarray=[];
        // this.itemaddForm.value.activeList[p].units =  dat1.data[0].units.split(",");
        console.log(this.itemoutForm.controls.activeList1.value[p].unitsarray);
        //
      })
     }
  
    }

categories;
    getCategories(){
      this._apiService.getCategories().subscribe(Data=>{
        console.log(Data);
        this.categories=Data.data.data;
         console.log(this.categories);
      })
    }


     getItemsbyCategory(event,p)
    {
      console.log(p);
      this.v='';
      
      
     if(p>=0){
       console.log(p);
       
       this.temp=[];
         this.v=event.target.value;
      let val={
        'category' : this.v
      }
      console.log(val);
      
       this._apiService.getItemsbyCategory(val).subscribe(dat=>
      {
        console.log(dat);       
        this.dat1=dat.data.data;
         console.log(this.dat1);
         this.test = this.dat1;
         this.test.forEach(element => {
           this.itemaddForm.controls.activeList.value[p].catsarray.splice(0,this.itemaddForm.controls.activeList.value[p].catsarray.length)
        //this.itemaddForm.controls.activeList.value[p].catsarray.push({'mid':element.mid,'item':element.item});
       });
        this.test.forEach(element => {
        //   this.itemaddForm.controls.activeList.value[p].catsarray.splice(1,this.itemaddForm.controls.activeList.value[p].catsarray.length)
         this.itemaddForm.controls.activeList.value[p].catsarray.push({'mid':element.mid,'item':element.item});
       });
      console.log( this.itemaddForm.controls.activeList.value[p].catsarray.length);
      
       console.log(this.itemaddForm.controls.activeList.value[p].catsarray);
      })
     }
  
    }

     getItemsbyCategory1(event,p)
    {
     this.v='';
      if(p>=0){
      this.temp=[];
         this.v=event.target.value;
      let val={
        'category' : this.v
      }
      this._apiService.getItemsbyCategory(val).subscribe(dat=>
      {
        console.log(dat);       
        this.dat1=dat.data.data;
         console.log(this.dat1);
         this.test = this.dat1;
         this.test.forEach(element => {
           this.itemoutForm.controls.activeList1.value[p].catsarray.splice(0,this.itemoutForm.controls.activeList1.value[p].catsarray.length)
        //this.itemaddForm.controls.activeList.value[p].catsarray.push({'mid':element.mid,'item':element.item});
       });
        this.test.forEach(element => {
        //   this.itemaddForm.controls.activeList.value[p].catsarray.splice(1,this.itemaddForm.controls.activeList.value[p].catsarray.length)
         this.itemoutForm.controls.activeList1.value[p].catsarray.push({'mid':element.mid,'item':element.item});
       });
       
      })
     }
  
    }

dat0;
  getnames()
  {
   this._apiService.getnames().subscribe(data=>
  {
    this.dat0= data.data.data;
    console.log(data.data.data);
  })
}

category;
addnewcategory()
    {
      this.popup.options = {
        header: "Add Category",
        color: "#34495e", // red, blue.... 
        widthProsentage: 40, // The with of the popou measured by browser width 
        animationDuration: 1, // in seconds, 0 = no animation 
        showButtons: false, // You can hide this in case you want to use custom buttons 
        confirmBtnContent: "ok", // The text on your confirm button 
        cancleBtnContent: "Cancel", // the text on your cancel button 
        confirmBtnClass: "btn btn-info", // your class for styling the confirm button 
        cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
        animation: "fadeInDown",// 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
      };

      this.popup5.show();
    }
    close5()
    {
      this.popup5.hide();
      this.category = '';
    }
    addcategory()
     {
      console.log(this.category);
      let b={}
      b['category']= this.category;
      this._apiService.addcategory(b).subscribe(data8=>{
        if(!data8.data.success){
          console.log('insert failsed');
           this.popToast1();
       }
        else{
          console.log(data8.data.success)
          // this.data2 = data2;
          console.log('insert');
          
        
          this.popToast();
          this.getCategories();
          this.category = '';
          this.popup5.hide();
          this.getlists();
        }
    }
   )
  }

getItemCategory;
  getCategoriesfornewItem(){
    this._apiService.getCategoriesfornewItem().subscribe(Data=>{
        console.log(Data);
        this.getItemCategory=Data.data.data;
         console.log(this.getItemCategory);
      })
  } 
}
