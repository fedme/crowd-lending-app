import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Project } from '../models/project';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = 'https://localhost:44342';
  public accessToken: string;
  public loggedIn: boolean;
  public userProfile: UserProfile;

  constructor(private http: HttpClient) {
    this.checkIfAlreadyLoggedIn();
  }

  private async checkIfAlreadyLoggedIn() {

    // retrieve access token from session storage
    if (sessionStorage.getItem('access_token') == null) {
      return;
    }
    this.accessToken = sessionStorage.getItem('access_token');

    // try to use token and check if it is still valid
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accessToken}`
      })
    };

    try {
      const res: any = await this.http.get(`${this.apiUrl}/userinfo`, httpOptions).toPromise();
      this.loggedIn = true;
      this.userProfile = new UserProfile(res);

    } catch (error) {
      console.log(error);
      this.logOut();
    }
  }

  public async getAccessToken(username: string, password: string) {
    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        username,
        password
      }
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    try {
      const res: any = await this.http.post(`${this.apiUrl}/token`, params, httpOptions).toPromise();
      console.log('login response', res);

      sessionStorage.setItem('access_token', res.access_token);
      this.accessToken = res.access_token;
      this.loggedIn = true;
      this.getUserProfile();
    } catch (error) {
      console.log(error);
    }

  }

  public logOut() {
    this.loggedIn = false;
    this.accessToken = '';
    this.userProfile = null;
    sessionStorage.removeItem('access_token');
  }

  private async getUserProfile() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accessToken}`
      })
    };

    try {
      const res: any = await this.http.get(`${this.apiUrl}/userinfo`, httpOptions).toPromise();
      console.log('userinfo response', res);
      this.userProfile = new UserProfile(res);
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllProjects(): Promise<Project[]> {
    const projectsRaw = await this.http.get<Project[]>(`${this.apiUrl}/projects`).toPromise();
    return projectsRaw.map(p => new Project(p));
  }

  public async getProjectById(id: string): Promise<Project> {
    const projectRaw = await this.http.get<Project>(`${this.apiUrl}/projects/${id}`).toPromise();
    return new Project(projectRaw);
  }

  public async investInProject(projectId: string, amount: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.accessToken}`
      })
    };

    const body = { amount };

    const res: any = await this.http.post(`${this.apiUrl}/projects/${projectId}/investments`, body, httpOptions).toPromise();
    console.log('invest in project response', res);
  }
}
