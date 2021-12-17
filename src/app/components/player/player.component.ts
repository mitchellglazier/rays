import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input() playerType: string;
  playerSearch = ""
  searchPlayers = []
  $playersSub: Subscription;
  players: any[]
  playerSelected: any;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
      this.$playersSub = this.store.select("playerStat", "stats", this.playerType).subscribe(players => {
        this.players = players;
        this.searchPlayers = players
      })
  }

  search() {
    if (this.playerSearch.length > 0) {
      this.searchPlayers = this.players.filter((player: any) => {
        return player.name.toLowerCase().includes(this.playerSearch.toLowerCase()) || player.position.toLowerCase().includes(this.playerSearch.toLowerCase());
      });
    } else {
      this.searchPlayers = this.players;
    }
  }

  trackByFn(index) {
    return index
  }

  selectRow(hitter) {
    this.playerSelected = hitter
  }
  clearSearch() {
    this.playerSearch = '';
    this.search();
  }

  ngOnDestroy(): void {
    this.$playersSub.unsubscribe();
  }

}
