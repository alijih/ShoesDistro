import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { BarrablackComponent } from './components/barrablack/barrablack/barrablack.component';
import { BoxesComponent } from './components/boxes/boxes/boxes.component';
import { TiendasComponent } from './components/tiendas/tiendas/tiendas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BarrablackComponent,
    BoxesComponent,
    TiendasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
