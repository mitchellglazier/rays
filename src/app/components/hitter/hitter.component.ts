import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hitter',
  templateUrl: './hitter.component.html',
  styleUrls: ['./hitter.component.scss']
})
export class HitterComponent implements OnInit, OnDestroy {
  hitterSearch = ""
  searchHitters = []
  $hittersSub: Subscription;
  hitters: any[]
  hitterSelected: any;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.$hittersSub = this.store.select("playerStat", "stats", "hitters").subscribe(hitters => {
      this.hitters = hitters;
      this.searchHitters = hitters
    })
  }

  search() {
    if (this.hitterSearch.length > 0) {
      this.searchHitters = this.hitters.filter((hitter: any) => {
        return hitter.name.toLowerCase().includes(this.hitterSearch.toLowerCase()) || hitter.position.toLowerCase().includes(this.hitterSearch.toLowerCase());
      });
    } else {
      this.searchHitters = this.hitters;
    }
  }

  trackByFn(index) {
    return index
  }

  selectRow(hitter) {
    this.hitterSelected = hitter
  }
  clearSearch() {
    this.hitterSearch = '';
    this.search();
  }

  ngOnDestroy(): void {
    this.$hittersSub.unsubscribe();
  }

}
