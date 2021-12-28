import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Hitter } from 'src/app/models/hitter';
import { Pitcher } from 'src/app/models/pitcher';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input() playerType: string;
  @Input() itemSize: number;
  playerSearch = ""
  searchPlayers: Hitter[] | Pitcher[] = []
  $playersSub: Subscription;
  players: any[] = [];
  playerSelected: any
  levels: string[];
  level: string;
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
      this.$playersSub = this.store.select("playerStat", "stats", this.playerType).subscribe((players: Hitter[] | Pitcher[]) => {
        this.players = players;
        this.searchPlayers = players
        if (this.players) {
          const levels = this.players.map(player => {
            return player.level
          })
          this.levels = [... new Set(levels)]
        }
        this.playerSelected = JSON.parse(localStorage.getItem(this.playerType))
      }) 
  }

  search() {
    if (this.playerSearch.length > 0) {
      this.searchPlayers = this.players.filter((player: Hitter | Pitcher) => {
        return  player.name.toLowerCase().includes(
                this.playerSearch.toLowerCase())
      });
    } else {
      this.searchPlayers = this.players;
    }
  }

  trackByFn(index) {
    return index
  }

  selectRow(player: Hitter | Pitcher) {
    this.playerSelected = player;
    localStorage.setItem(this.playerType, JSON.stringify(player))
  }

  clearSearch() {
    this.playerSearch = '';
    this.search();
  }

  filterLevel() {
    if (this.level) {
      this.searchPlayers = this.players.filter((player: Hitter | Pitcher) => {
        return player.level === this.level
          
      })
    } else {
      this.searchPlayers = this.players;
    }
  }

  ngOnDestroy(): void {
    this.$playersSub.unsubscribe();
  }

}
