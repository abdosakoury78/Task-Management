import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Users } from '../../shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';
  isLoggedIn = signal<boolean>(false);
  user = signal<Users | null>(null);

  login(email: string) {

    const params = new HttpParams()
      .set('email', email);

    return this.http.get<Users[]>(this.apiUrl, { params });

  }

}
