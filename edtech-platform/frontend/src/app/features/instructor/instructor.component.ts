import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService, Course, CourseMaterial } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Instructor Panel</h1>
        
        <!-- Create Course Form -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div class="px-4 py-5 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Create New Course</h3>
          </div>
          <div class="p-6">
            <form [formGroup]="courseForm" (ngSubmit)="createCourse()">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label class="block text-sm font-medium text-gray-700">Course Title</label>
                  <input type="text" formControlName="title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Price (in $)</label>
                  <input type="number" formControlName="price" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Level</label>
                  <select formControlName="level" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Course Image</label>
                  <input type="file" (change)="onCourseImageSelected($event)" accept="image/*" class="mt-1 block w-full text-sm">
                </div>
                <div class="sm:col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Description</label>
                  <textarea formControlName="description" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
              </div>
              <div class="mt-4 flex justify-end">
                <button type="submit" [disabled]="courseForm.invalid" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">Create Course</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Authored Courses -->
        <h3 class="text-xl font-bold text-gray-900 mb-4">Your Courses</h3>
        <div *ngIf="courses.length === 0" class="text-gray-500 mb-8">No courses created yet.</div>
        
        <div *ngFor="let c of courses" class="bg-white shadow sm:rounded-lg mb-6 p-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h4 class="text-lg font-bold">{{ c.title }}</h4>
              <p class="text-sm text-gray-500">Price: $\{{ c.price }} | {{ c.description }}</p>
            </div>
            <button (click)="selectCourse(c)" class="text-indigo-600 hover:text-indigo-900 font-medium text-sm border border-indigo-600 rounded px-3 py-1">Manage Materials</button>
          </div>
          
          <!-- Materials Section (only if selected) -->
          <div *ngIf="selectedCourse?.id === c.id" class="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h5 class="font-medium text-gray-800 mb-3">Course Materials</h5>
            
            <ul class="mb-6 divide-y divide-gray-200">
              <li *ngFor="let m of selectedCourseMaterials" class="py-2 flex justify-between items-center">
                <span class="text-sm text-gray-700">
                  <span class="font-bold border px-1 rounded text-xs bg-gray-200 mr-2">{{ m.type }}</span> {{ m.title }}
                </span>
                <button (click)="deleteMaterial(m.id)" class="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
              </li>
              <li *ngIf="selectedCourseMaterials.length === 0" class="py-2 text-sm text-gray-500">No materials uploaded yet.</li>
            </ul>
            
            <form [formGroup]="materialForm" (ngSubmit)="uploadMaterial()" class="mt-2 bg-white p-4 shadow-sm border border-gray-200 rounded-md">
              <h6 class="text-sm font-medium text-gray-800 mb-3">Upload New Material</h6>
              <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-4 gap-x-4 text-sm">
                <div class="col-span-1">
                  <label class="block text-xs text-gray-500 mb-1">Title</label>
                  <input type="text" formControlName="title" class="w-full border border-gray-300 rounded p-1 focus:outline-none">
                </div>
                <div class="col-span-1">
                  <label class="block text-xs text-gray-500 mb-1">Type</label>
                  <select formControlName="type" class="w-full border border-gray-300 rounded p-1 focus:outline-none">
                    <option value="VIDEO">Video</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                <div class="col-span-1">
                  <label class="block text-xs text-gray-500 mb-1">File</label>
                  <input type="file" (change)="onFileSelected($event)" class="w-full text-xs mt-1">
                </div>
                <div class="flex items-end">
                  <button type="submit" [disabled]="materialForm.invalid || !selectedFile" class="w-full bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 disabled:opacity-50">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  `
})
export class InstructorComponent implements OnInit {
  courses: Course[] = [];
  courseForm: FormGroup;
  materialForm: FormGroup;

  selectedCourse: Course | null = null;
  selectedCourseMaterials: CourseMaterial[] = [];
  selectedFile: File | null = null;
  selectedCourseImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      level: ['Beginner', Validators.required],
      description: ['']
    });

    this.materialForm = this.fb.group({
      title: ['', Validators.required],
      type: ['VIDEO', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const user = this.authService.currentUserValue;
    if (user && user.id) {
      this.courseService.getCoursesByInstructor(user.id).subscribe({
        next: (res) => this.courses = res,
        error: (err) => console.error(err)
      });
    }
  }

  onCourseImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedCourseImage = event.target.files[0];
    }
  }

  createCourse() {
    if (this.courseForm.invalid) return;
    const user = this.authService.currentUserValue;
    if (!user) return;

    const courseData: Course = {
      ...this.courseForm.value,
      instructorId: user.id
    };

    this.courseService.createCourse(courseData).subscribe({
      next: (res) => {
        if (this.selectedCourseImage && res.id) {
          this.courseService.uploadCourseImage(res.id, this.selectedCourseImage).subscribe({
            next: (updatedCourse) => {
              this.courses.push(updatedCourse);
              this.courseForm.reset({ price: 0, level: 'Beginner' });
              this.selectedCourseImage = null;
            },
            error: (err) => console.error(err)
          });
        } else {
          this.courses.push(res);
          this.courseForm.reset({ price: 0, level: 'Beginner' });
        }
      },
      error: (err) => console.error(err)
    });
  }

  selectCourse(course: Course) {
    if (this.selectedCourse?.id === course.id) {
      this.selectedCourse = null; // toggle off
    } else {
      this.selectedCourse = course;
      this.loadMaterials(course.id!);
    }
  }

  loadMaterials(courseId: number) {
    this.courseService.getMaterials(courseId).subscribe({
      next: (res) => this.selectedCourseMaterials = res,
      error: (err) => console.error(err)
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadMaterial() {
    if (this.materialForm.invalid || !this.selectedFile || !this.selectedCourse) return;

    const { title, type } = this.materialForm.value;

    this.courseService.uploadMaterial(this.selectedCourse.id!, title, type, this.selectedFile).subscribe({
      next: (res) => {
        this.selectedCourseMaterials.push(res);
        this.materialForm.reset({ type: 'VIDEO' });
        this.selectedFile = null;
      },
      error: (err) => console.error(err)
    });
  }

  deleteMaterial(materialId: number) {
    this.courseService.deleteMaterial(materialId).subscribe({
      next: () => {
        this.selectedCourseMaterials = this.selectedCourseMaterials.filter(m => m.id !== materialId);
      },
      error: (err) => console.error(err)
    });
  }
}
