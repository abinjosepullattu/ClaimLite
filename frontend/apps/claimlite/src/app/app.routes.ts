import { Route } from '@angular/router';
import { UserList } from './user-list';
import { UserForm } from './user-form';
import { ClaimList } from './claim-list';
import { ClaimForm } from './claim-form';
import { Landing } from './landing';
export const appRoutes: Route[] = [

     {
    path: 'users',
    component: UserList,
  },
  {
     path: 'add-user',
  component: UserForm,
  },
  {
 path: 'claims',
  component: ClaimList,  
},
{
  path: 'add-claim',
  component: ClaimForm,
},
{
  path: '',
  component: Landing,
}
];
