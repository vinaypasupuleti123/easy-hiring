import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    id: number;
    email: string;
    name: string;
    role: string;
    type: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const userStr = localStorage.getItem('currentUser');
        let user = null;
        if (userStr) {
            try {
                user = JSON.parse(userStr);
            } catch (e) { }
        }
        this.currentUserSubject = new BehaviorSubject<User | null>(user);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    public getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    login(credentials: any): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
            .pipe(tap(response => {
                if (response && response.token) {
                    localStorage.setItem('jwtToken', response.token);
                    const user: User = {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.role
                    };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    // Trigger Login Alert asynchronously
                    this.http.post(`${environment.apiUrl}/notifications/send-login-alert`, {
                        email: user.email,
                        name: user.name
                    }).subscribe({
                        error: (err) => console.error('Failed to trigger login alert email:', err)
                    });
                }
            }));
    }

    register(user: any): Observable<any> {
        return this.http.post(`${environment.apiUrl}/auth/register`, user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
        this.currentUserSubject.next(null);
    }

    hasRole(role: string): boolean {
        return this.currentUserValue?.role === role;
    }
}
