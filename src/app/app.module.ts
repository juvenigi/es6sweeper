import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SweeperBoardComponent} from './components/sweeper-board/sweeper-board.component';
import {SweeperCellComponent} from './components/sweeper-cell/sweeper-cell.component';
import {SweeperMenuComponent} from './components/sweeper-menu/sweeper-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SweeperBoardComponent,
    SweeperCellComponent,
    SweeperMenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
