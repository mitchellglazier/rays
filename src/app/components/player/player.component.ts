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
  @Input() itemSize: number;
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
        this.playerSelected = JSON.parse(localStorage.getItem(this.playerType))
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

  selectRow(player) {
    this.playerSelected = player;
    localStorage.setItem(this.playerType, JSON.stringify(player))
  }
  clearSearch() {
    this.playerSearch = '';
    this.search();
  }

  ngOnDestroy(): void {
    this.$playersSub.unsubscribe();
  }

}
