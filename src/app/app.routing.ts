import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SemesteryComponent } from './semestery/semestery.component';
import { RegistrationComponent } from './registration/registration.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import {MessinchargeComponent} from './messincharge/messincharge.component';
import { MenulistComponent } from './menulist/menulist.component';
import { PurchaserComponent } from './purchaser/purchaser.component';
import { PurchaseitemsComponent } from './purchaseitems/purchaseitems.component';
import { PurchasersComponent } from './purchasers/purchasers.component';
import { ReportsComponent } from './reports/reports.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'semestery', component: SemesteryComponent, canActivate: [AuthGuard] },
    { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard] },
    { path: 'messincharg', component: MessinchargeComponent, canActivate: [AuthGuard] },
    {path: 'menulist', component:MenulistComponent,canActivate:[AuthGuard]},
    {path: 'purchase', component:PurchaserComponent,canActivate:[AuthGuard]},
    {path: 'purchaseitems', component:PurchaseitemsComponent,canActivate:[AuthGuard]},
    {path: 'purchases', component:PurchasersComponent,canActivate:[AuthGuard]},
    {path :'reports', component:ReportsComponent,canActivate:[AuthGuard]},
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);



