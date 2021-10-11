import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'topchart',
    loadChildren: () => import('./topchart/topchart.module').then( m => m.TopchartPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'saved',
    loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'morelink',
    loadChildren: () => import('./morelink/morelink.module').then( m => m.MorelinkPageModule)
  },
  {
    path: 'imgclick',
    loadChildren: () => import('./imgclick/imgclick.module').then( m => m.ImgclickPageModule)
  },
  {
    path: 'accinformation',
    loadChildren: () => import('./accinformation/accinformation.module').then( m => m.AccinformationPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'askques',
    loadChildren: () => import('./askques/askques.module').then( m => m.AskquesPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'updatepage',
    loadChildren: () => import('./updatepage/updatepage.module').then( m => m.UpdatepagePageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'audiopage',
    loadChildren: () => import('./audiopage/audiopage.module').then( m => m.AudiopagePageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./download/download.module').then( m => m.DownloadPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'invitefrd',
    loadChildren: () => import('./invitefrd/invitefrd.module').then( m => m.InvitefrdPageModule)
  },
  {
    path: 'joined',
    loadChildren: () => import('./joined/joined.module').then( m => m.JoinedPageModule)
  },
  {
    path: 'browsecatg',
    loadChildren: () => import('./browsecatg/browsecatg.module').then( m => m.BrowsecatgPageModule)
  },
  {
    path: 'filterpage',
    loadChildren: () => import('./filterpage/filterpage.module').then( m => m.FilterpagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }