import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService, Course } from '../../core/services/course.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Expand Your Skills with <span class="text-gfg-green">Easy Hiring</span> Courses</h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">Browse our comprehensive list of courses ranging from Data Structures and Algorithms to Full-stack Development.</p>
        </div>

        <!-- Course Category Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 border-b border-gray-200 pb-6">
          <button class="px-5 py-2 rounded-full border border-gfg-green bg-gfg-green text-white font-medium shadow-sm transition-all focus:outline-none">All Courses</button>
          <button class="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:border-gfg-green hover:text-gfg-green transition-all focus:outline-none">Data Structures</button>
          <button class="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:border-gfg-green hover:text-gfg-green transition-all focus:outline-none">Interview Prep</button>
          <button class="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:border-gfg-green hover:text-gfg-green transition-all focus:outline-none">Web Development</button>
          <button class="px-5 py-2 rounded-full border border-gray-300 bg-white text-gray-700 font-medium hover:border-gfg-green hover:text-gfg-green transition-all focus:outline-none">System Design</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div *ngFor="let course of courses" class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div class="h-44 w-full relative group">
              <img [src]="getImageUrl(course.image)" [alt]="course.title" class="w-full h-full object-cover">
              <!-- Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button [routerLink]="['/courses', course.id]" class="bg-gfg-green text-white px-6 py-2 rounded-md font-bold text-sm shadow cursor-pointer">View Details</button>
              </div>
            </div>
            <div class="p-6 flex-grow flex flex-col">
              <div class="flex items-center justify-between mb-2 hidden">
                <div class="flex items-center text-yellow-500 text-xs">
                   ⭐ {{ course.rating }}
                </div>
              </div>
              <h3 [routerLink]="['/courses', course.id]" class="font-bold text-lg mb-2 text-gray-900 line-clamp-2 hover:text-gfg-green cursor-pointer">{{ course.title }}</h3>
              <p class="text-gray-500 mb-4 text-sm line-clamp-3 leading-relaxed">{{ course.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100">
                <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded font-semibold mb-4">{{ course.level }}</span>
                <div class="flex items-center justify-between font-extrabold">
                  <span class="text-xl text-gray-900">₹{{ course.price }}</span>
                  <a [routerLink]="['/courses', course.id]" class="text-gfg-green hover:underline text-sm uppercase flex items-center">Explore <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.courseService.getAllCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    });
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return 'https://media.geeksforgeeks.org/img-practice/banner/complete-interview-preparation-thumbnail.png';
    if (image.startsWith('http')) return image;
    // In local dev, prepend host since API returns absolute path /api/...
    const baseUrl = environment.apiUrl.replace('/api', '');
    return baseUrl + image;
  }
}
