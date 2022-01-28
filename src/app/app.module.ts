import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { PageService, VirtualScrollService, SortService, RowDDService, FilterService, EditService, ContextMenuService } from '@syncfusion/ej2-angular-treegrid';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TreeGridModule,
    HttpClientModule
  ],
  providers: [PageService,
    SortService,
    FilterService,
    ContextMenuService,
    EditService,
    VirtualScrollService,
    RowDDService],
  bootstrap: [AppComponent]
})
export class AppModule { }
