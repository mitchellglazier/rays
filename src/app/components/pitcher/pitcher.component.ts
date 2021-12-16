import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pitcher',
  templateUrl: './pitcher.component.html',
  styleUrls: ['./pitcher.component.scss']
})
export class PitcherComponent implements OnInit {
  pitcherSearch = ""
  searchPitchers = []
  $pitchersSub: Subscription;
  pitchers: any[]
  pitcherSelected: any
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.$pitchersSub = this.store.select("playerStat", "stats", "pitchers").subscribe(pitchers => {
      this.pitchers = pitchers;
      this.searchPitchers = pitchers
    })
  }

  search() {
    if (this.pitcherSearch.length > 0) {
      this.searchPitchers = this.pitchers.filter((pitcher: any) => {
        return pitcher.name.toLowerCase().includes(this.pitcherSearch.toLowerCase());
      });
    } else {
      this.searchPitchers = this.pitchers;
    }
  }

  trackByFn(index) {
    return index
  }

  selectRow(pitcher) {
    this.pitcherSelected = pitcher
  }
  clearSearch() {
    this.pitcherSearch = '';
    this.search();
  }

  ngOnDestroy(): void {
    this.$pitchersSub.unsubscribe();
  }

}
