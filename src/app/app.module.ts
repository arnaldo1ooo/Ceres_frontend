import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './autenticacion/interceptors/auth.interceptor';
import { CompartidoModule } from './compartido/compartido.module';
import { FORMATO_FECHA } from './compartido/constantes/constantes';
import { MaterialModulosModule } from './compartido/material-modulos/material-modulos.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    CompartidoModule,
    MaterialModulosModule
  ],
  providers: [
    { //Sirve para el interceptor de autenticacion helpers/autenticacion
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { //Para que el formato de las fechas este en dd/mm/yyyy
      provide: MAT_DATE_LOCALE,
      useValue: FORMATO_FECHA
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
