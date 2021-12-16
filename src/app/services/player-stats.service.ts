import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlayerStatsService {
  baseUrl = 'https://milbtracker.com/api/rays/yearly/2021';

  constructor(private http: HttpClient) {}

  getPlayerStats() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
