import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService, Course } from '../../core/services/course.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 font-sans text-gfg-text">
      
      <!-- Hero Section -->
      <div class="bg-white py-16 text-center border-b border-gray-200">
        <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Hello, What Do You Want To Learn?
        </h1>
        <div class="max-w-2xl mx-auto px-4 mt-8 flex justify-center">
          <div class="relative w-full shadow-sm rounded-full bg-white border border-gray-300 focus-within:ring-2 ring-gfg-green focus-within:border-gfg-green">
            <input type="text" placeholder="Search for courses, tutorials, algorithms, data structures..." 
                   class="w-full py-4 pl-6 pr-16 bg-transparent rounded-full focus:outline-none text-lg">
            <button class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gfg-green hover:bg-gfg-dark text-white p-3 rounded-full transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Links Section -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700">
          <a href="#" class="bg-gfg-light px-6 py-3 rounded-full hover:bg-gfg-green hover:text-white transition-colors">Data Structures</a>
          <a href="#" class="bg-gfg-light px-6 py-3 rounded-full hover:bg-gfg-green hover:text-white transition-colors">Algorithms</a>
          <a href="#" class="bg-gfg-light px-6 py-3 rounded-full hover:bg-gfg-green hover:text-white transition-colors">Interview Preparation</a>
          <a href="#" class="bg-gfg-light px-6 py-3 rounded-full hover:bg-gfg-green hover:text-white transition-colors">Web Development</a>
          <a href="#" class="bg-gfg-light px-6 py-3 rounded-full hover:bg-gfg-green hover:text-white transition-colors">Machine Learning</a>
        </div>
      </div>

      <!-- Main Content / Course Cards -->
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold border-l-4 border-gfg-green pl-3">Popular Courses</h2>
          <a routerLink="/courses" class="text-gfg-green hover:underline font-semibold">View All</a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let course of courses.slice(0, 4)" class="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
            <div class="h-40 bg-gray-200 w-full relative">
              <img [src]="getImageUrl(course.image)" [alt]="course.title" class="w-full h-full object-cover">
            </div>
            <div class="p-5 flex-grow flex flex-col">
              <h3 class="font-bold text-lg mb-2 text-gray-800 line-clamp-2">{{ course.title }}</h3>
              <p class="text-gray-500 mb-4 text-sm line-clamp-3">{{ course.description }}</p>
              <div class="mt-auto">
                <span class="inline-block bg-green-100 text-gfg-dark text-xs px-2 py-1 rounded font-semibold mb-3">{{ course.level || 'Beginner' }}</span>
                <div class="flex items-center justify-between font-bold">
                  <span class="text-xl">₹{{ course.price }}</span>
                  <a [routerLink]="['/courses', course.id]" class="text-gfg-green hover:underline text-sm uppercase">Explore</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Feature Section (Why choose us) -->
      <div class="bg-gray-100 py-16 border-t border-gray-200">
         <div class="max-w-7xl mx-auto px-4">
             <div class="text-center mb-12">
                 <h2 class="text-3xl font-bold mb-4">Why Learning with Us?</h2>
                 <p class="text-gray-600 max-w-2xl mx-auto">Explore premium curated courses structured perfectly for your programming interview prep and tech skills learning journey.</p>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div class="bg-white p-6 rounded shadow text-center">
                     <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gfg-green text-3xl font-bold">💻</div>
                     <h3 class="text-xl font-bold mb-2">Practice Problems</h3>
                     <p class="text-gray-500 text-sm">Solve thousands of algorithm problems spanning easy to expert difficulties to perfect your skills.</p>
                 </div>
                 <div class="bg-white p-6 rounded shadow text-center">
                     <div class="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500 text-3xl font-bold">📚</div>
                     <h3 class="text-xl font-bold mb-2">Read Articles</h3>
                     <p class="text-gray-500 text-sm">Read completely free and thoroughly vetted computer science tutorials and articles.</p>
                 </div>
                 <div class="bg-white p-6 rounded shadow text-center">
                     <div class="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-500 text-3xl font-bold">🏆</div>
                     <h3 class="text-xl font-bold mb-2">Get Certified</h3>
                     <p class="text-gray-500 text-sm">Earn your certificates in popular skills and boost your resume dramatically to stand out.</p>
                 </div>
             </div>
         </div>
      </div>
      
    </div>
  `
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error(err)
    });
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return 'https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-thumbnail.png';
    if (image.startsWith('http')) return image;
    return environment.apiUrl.replace('/api', '') + image;
  }
}
