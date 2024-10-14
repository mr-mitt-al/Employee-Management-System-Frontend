// import { Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { LayoutComponent } from './pages/layout/layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { EmployeeComponent } from './pages/employee/employee.component';
// import { VacationComponent } from './pages/vacation/vacation.component';
// import { EmployeeVacationComponent } from './pages/employee-vacation/employee-vacation.component';
// import { authGuard } from './guard/auth.guard';
// import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';

// export const routes: Routes = [
//     {
//         path:'',
//         redirectTo: 'login',
//         pathMatch: 'full'
//     },
//     {
//         path:'login',
//         component:LoginComponent
//     },
//     {
//         path:'',
//         component:LayoutComponent,
//         children:[
//             {
//                 path:'dashboard',
//                 component:DashboardComponent,
//                 canActivate:[authGuard]
//             },
//             {
//                 path:'employee',
//                 component:EmployeeComponent
//             },
//             {
//                 path:'vacation',
//                 component:VacationComponent
//             },
//             {
//                 path:'employee-vacation',
//                 component:EmployeeVacationComponent
//             },
//             {
//                 path:'employee-details',
//                 component:EmployeeDetailsComponent
//             }
//         ]
//     }
// ];
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { VacationComponent } from './pages/vacation/vacation.component';
import { EmployeeVacationComponent } from './pages/employee-vacation/employee-vacation.component';
import { authGuard } from './guard/auth.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [authGuard]
            },
            {
                path: 'employee',
                component: EmployeeComponent
            },
            {
                path: 'vacation',
                component: VacationComponent
            },
            {
                path: 'employee-vacation',
                component: EmployeeVacationComponent
            },
            {
                path:'change-password',
                component:ChangePasswordComponent
            }
        ]
    }
];
