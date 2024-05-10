import { Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { RoutePaths } from './core/enums/routePaths';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: RoutePaths.ADD, component: AddComponent },
      { path: RoutePaths.LIST, component: ListComponent },
      { path: RoutePaths.FAVORITE, component: ListComponent },
    ],
  },
];
