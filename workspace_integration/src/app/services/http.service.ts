import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestResponse } from '../models/testResponse.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public testToken(token: string): Observable<TestResponse> {
    return this.httpClient.get<TestResponse>(
      `https://containers.sphere-engine.com/api/v1/test?access_token=${token}`
    );
  }
}
