import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './autenticacion/interceptors/auth.interceptor';

import { CompartidoModule } from './compartido/compartido.module';
import { SpinnerCargandoInterceptor } from './compartido/componentes/spinner-cargando/interceptors/spinner-cargando.interceptor';
import { FORMATO_FECHA_HORA_SIN_SEG_COMUN, FORMATO_REGIONAL_ES } from './compartido/constantes/constantes';
import { MaterialModulosModule } from './compartido/material-modulos/material-modulos.module';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

registerLocaleData(localeEs, FORMATO_REGIONAL_ES);

const FORMATO_FECHA_PERSONALIZADO: NgxMatDateFormats = {
  parse: {
    dateInput: FORMATO_FECHA_HORA_SIN_SEG_COMUN,
  },
  display: {
    dateInput: FORMATO_FECHA_HORA_SIN_SEG_COMUN,
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, //Sirve para el interceptor de autenticacion helpers/autenticacion
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerCargandoInterceptor, multi: true }, //Sirve para que muestre cargando durante una peticion http
    { provide: LOCALE_ID, useValue: FORMATO_REGIONAL_ES }, // Configura el LOCALE_ID a 'es' para usar el español como idioma
    { provide: NGX_MAT_DATE_FORMATS, useValue: FORMATO_FECHA_PERSONALIZADO },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
