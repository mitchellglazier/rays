import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadPlayerStats } from './store/playerStat.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadPlayerStats());
  }
}
