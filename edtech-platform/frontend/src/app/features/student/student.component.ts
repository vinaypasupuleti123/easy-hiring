import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../../environments/environment';
import { CourseService, Course } from '../../core/services/course.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Student Dashboard</h1>
        
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Enrollments Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">My Courses</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">Browse & Learning</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <div class="text-sm text-indigo-600 hover:text-indigo-900 cursor-pointer font-medium">View all enrollments</div>
            </div>
          </div>

          <!-- Assessments Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Quizzes</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">Pending Actions</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <div class="text-sm text-green-600 hover:text-green-900 cursor-pointer font-medium">Take Assessments</div>
            </div>
          </div>

          <!-- Placements Card -->
          <div class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Placement Portal</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">Job Board</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <div class="text-sm text-yellow-600 hover:text-yellow-900 cursor-pointer font-medium">Explore Opportunities</div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-lg leading-6 font-medium text-gray-900 mb-4">My Enrolled Courses</h2>
          <div *ngIf="loading" class="text-gray-500 p-4">Loading enrollments...</div>
          <div *ngIf="!loading && enrolledCourses.length === 0" class="bg-white p-6 rounded-md shadow text-center text-gray-500">
            You have not enrolled in any courses yet. 
            <a routerLink="/courses" class="text-indigo-600 hover:underline">Browse Courses</a>
          </div>
          <div *ngIf="!loading && enrolledCourses.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li *ngFor="let item of enrolledCourses">
                <div class="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer" [routerLink]="['/courses', item.course.id]">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-indigo-600 truncate">{{ item.course.title }}</p>
                    <div class="ml-2 flex-shrink-0 flex">
                      <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                         [ngClass]="{'bg-green-100 text-green-800': item.enrollment.progressPercentage === 100, 'bg-yellow-100 text-yellow-800': item.enrollment.progressPercentage < 100}">
                        Progress: {{ item.enrollment.progressPercentage || 0 }}%
                      </p>
                    </div>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p class="flex items-center text-sm text-gray-500 line-clamp-1">
                        {{ item.course.description }}
                      </p>
                    </div>
                    <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Enrolled on {{ item.enrollment.enrolledAt | date }}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StudentComponent implements OnInit {
  loading: boolean = true;
  enrolledCourses: any[] = [];
  allCourses: Course[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private courseService: CourseService) { }

  ngOnInit(): void {
    const user = this.authService.currentUserValue;
    if (user && user.id) {
      this.courseService.getAllCourses().subscribe((courses) => {
        this.allCourses = courses;

        this.http.get<any[]>(`${environment.apiUrl}/enrollments/student/${user.id}`).subscribe({
          next: (enrollments) => {
            this.enrolledCourses = enrollments.map(enrollment => {
              const course = this.allCourses.find(c => c.id === enrollment.courseId);
              return { enrollment, course };
            }).filter(item => item.course); // Handle case where course might not be found
            this.loading = false;
          },
          error: (err) => {
            console.error('Failed to load enrollments', err);
            this.loading = false;
          }
        });
      });
    } else {
      this.loading = false;
    }
  }
}
