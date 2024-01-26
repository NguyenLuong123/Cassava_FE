import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppContactusComponent} from './pages/app.contactus.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {AppLandingComponent} from './pages/app.landing.component';
import {AppWizardComponent} from './pages/app.wizard.component';
import {HomeComponent} from './component/home/home.component';
import {FieldDetailComponent} from './component/field-detail/field-detail.component';
import {WeatherComponent} from "./component/weather/weather.component";
import {AuthGuard} from "./auth.guard";
import {SimulationComponent} from "./component/simulation/simulation.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: '/Login',
                pathMatch: 'full'
            },
            {
                path: 'Login',
                component: AppLoginComponent
            },
            {
                path: 'Home', component: AppMainComponent,
                children: [
                    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
                    {path: 'DetailField', component: FieldDetailComponent, canActivate: [AuthGuard]},
                    {path: 'WeatherData', component: WeatherComponent, canActivate: [AuthGuard]},
                    {path: 'Simulation', component: SimulationComponent, canActivate: [AuthGuard]}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'contactus', component: AppContactusComponent},
            {path: 'landing', component: AppLandingComponent},
            {path: 'pages/wizard', component: AppWizardComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
