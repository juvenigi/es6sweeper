import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sweeper-board',
  templateUrl: './sweeper-board.component.html',
  styleUrls: ['./sweeper-board.component.css']
})
export class SweeperBoardComponent implements OnInit {
  protected value: string = "test";

  constructor() {
  }

  ngOnInit(): void {

  }
}
