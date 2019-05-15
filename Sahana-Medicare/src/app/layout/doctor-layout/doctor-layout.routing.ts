import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { PdashboardComponent } from 'src/app/pages/pdashboard/pdashboard.component';

export const DoctorLayoutRoutes: Routes = [
    { path: 'doctordashboard',      component: PdashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent }
];
