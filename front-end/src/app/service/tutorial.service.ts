import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Tutorial} from "../models/tutorial.model";
import {Page} from "../models/page";

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private readonly baseUrl = 'http://localhost:8080/api/v0';

  constructor(private http: HttpClient) {}

  getAllTutorials(page: number, size: number): Observable<Page> {
    return this.http.get<Page>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getTutorialById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createTutorial(data: Tutorial ): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateTutorial(id: number, data: Tutorial): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  deleteAllTutorial(): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
  deleteTutorial(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getPublishedTutorials(): Observable<any> {
    return this.http.get(`${this.baseUrl}/published`);
  }
  getTutorialsByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.baseUrl}/titles?title=${title}`);
  }
}
