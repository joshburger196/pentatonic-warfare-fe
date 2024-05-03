import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'discovery',
        loadChildren: () => import('../discovery-tab/discovery-tab.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'battle',
        loadChildren: () => import('../battle-tab/battle-tab.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/battle',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/battle',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
