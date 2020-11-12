import { HomeComponent } from '../home/home.component';
import { UserlistComponent } from '../userlist/userlist.component';

export const routes = [
  {
    path: 'home',
    label: 'How It Works?',
    component: HomeComponent,
  },
  {
    path: 'user-list',
    label: 'User List',
    component: UserlistComponent,
  },
  { path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  }
];