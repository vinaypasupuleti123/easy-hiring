import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { AuthService, User } from './core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
      <!-- Navigation -->
      <nav class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <!-- Logo Replacement -->
              <span class="text-gfg-green text-2xl font-black cursor-pointer tracking-tighter" routerLink="/">
                Easy<span class="text-gray-800">Hiring</span>
              </span>
              <div class="ml-10 hidden md:flex items-baseline space-x-4">
                <a routerLink="/" class="text-gray-600 hover:text-gfg-green px-3 py-2 rounded-md font-semibold transition-colors">Home</a>
                <a routerLink="/courses" class="text-gray-600 hover:text-gfg-green px-3 py-2 rounded-md font-semibold transition-colors">Courses</a>
                <a routerLink="/tutorials" class="text-gray-600 hover:text-gfg-green px-3 py-2 rounded-md font-semibold transition-colors">Tutorials</a>
                <a routerLink="/practice" class="text-gray-600 hover:text-gfg-green px-3 py-2 rounded-md font-semibold transition-colors">Practice</a>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <!-- Search Icon -->
              <button class="text-gray-500 hover:text-gfg-green p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <ng-container *ngIf="(currentUser$ | async) as user; else loggedOut">
                <!-- User dropdown stuff -->
                <a *ngIf="user.role === 'STUDENT'" routerLink="/student/dashboard" class="text-sm font-semibold text-gray-700 hover:text-gfg-green">Dashboard</a>
                <a *ngIf="user.role === 'INSTRUCTOR'" routerLink="/instructor/dashboard" class="text-sm font-semibold text-gray-700 hover:text-gfg-green">Instructor Panel</a>
                <a *ngIf="user.role === 'ADMIN'" routerLink="/admin/dashboard" class="text-sm font-semibold text-gray-700 hover:text-gfg-green">Admin Panel</a>
                
                <span class="text-gray-500 text-sm font-medium border-l border-gray-300 pl-4 ml-2">Hi, {{ user.name }}</span>
                <button (click)="logout()" class="text-white bg-gray-800 hover:bg-black px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm">Logout</button>
              </ng-container>
              
              <ng-template #loggedOut>
                <div class="flex items-center space-x-3 border-l border-gray-300 pl-4 ml-2">
                  <a routerLink="/login" class="text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-bold transition-colors">Sign In</a>
                  <a routerLink="/register" class="text-white bg-gfg-green hover:bg-gfg-dark px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-sm">Sign Up</a>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer -->
      <footer class="bg-gray-800 border-t border-gray-700 mt-auto text-gray-300">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
               <span class="text-white text-2xl font-black tracking-tighter">Easy<span class="text-gfg-green">Hiring</span></span>
               <p class="text-sm mt-2 max-w-sm">A comprehensive ed-tech platform. It contains top-tier courses, tutorials, and materials to ace your career.</p>
            </div>
            <div class="flex space-x-6 text-sm font-medium">
              <a href="#" class="hover:text-white transition-colors">About Us</a>
              <a href="#" class="hover:text-white transition-colors">Contact</a>
              <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
          <p class="text-center text-xs text-gray-500 mt-8 pt-8 border-t border-gray-700">&copy; 2026 Easy Hiring. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  currentUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
