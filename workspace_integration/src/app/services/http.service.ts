import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TestResponse } from '../models/testResponse.model';
import { WorkspaceResponse } from '../models/workspaceResponse.model';

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

  public createWorkspace(
    token: string,
    project_id: string
  ): Observable<WorkspaceResponse> {
    return this.httpClient.post<WorkspaceResponse>(
      `https://containers.sphere-engine.com/api/v1/workspaces?access_token=${token}`,
      { project_id }
    );
  }
}
