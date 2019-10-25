import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from './@_modules/modal/modal.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppConfigService } from './@_shared/app-config/app-config.service';

import { AlertModalComponent } from './@_components/modal-windows/alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './@_components/modal-windows/confirm-modal/confirm-modal.component';
import { MapDashboardComponent } from './@_pages/map-dashboard/map-dashboard.component';
import { DefaultComponent } from './@_pages/default/default.component';
import { ValuesFromDevicePipe } from './@_pipes/values-from-device.pipe';
import { PosValueFromSensorsPipe } from './@_pipes/pos-value-from-sensors.pipe';
import { MapKeyModule } from './@_modules/map-key/map-key.module';

@NgModule({
  declarations: [
    AppComponent,
    MapDashboardComponent,
    DefaultComponent,
    AlertModalComponent,
    ConfirmModalComponent,
    ValuesFromDevicePipe,
    PosValueFromSensorsPipe
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    HttpClientModule,
    MapKeyModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    },
  ],
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
