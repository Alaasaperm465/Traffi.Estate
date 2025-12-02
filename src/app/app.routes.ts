import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { AddProperty } from './component/add-property/add-property';
import { Login } from './component/login/login';
import { Message } from './component/message/message';
import { MyProperties } from './component/my-properties/my-properties';
import { Profile } from './component/profile/profile';
import Properties from './component/properties/properties';
import { PropertyDetails } from './component/property-details/property-details';
import { Register } from './component/register/register';

export const routes: Routes = [
    { path: '', redirectTo: '/properties', pathMatch: 'full' },
    // { path: 'home', component: Home, title: 'Home Page' },
    { path: 'addProperty', component: AddProperty, title: 'Add Property' },
    { path: 'login' , component:Login, title:'Login Page'},
    { path: 'message', component: Message, title: 'message Page'},
    { path: 'myProperties', component: MyProperties, title: ' My properties' },
    { path: 'profile', component: Profile, title: ' My profile' },
    { path: 'properties', component: Properties, title: ' Properties' },
    { path: 'propertyDetails', component: PropertyDetails, title: ' Property Details' },
    { path: 'Register', component: Register, title: 'Register' },
];
