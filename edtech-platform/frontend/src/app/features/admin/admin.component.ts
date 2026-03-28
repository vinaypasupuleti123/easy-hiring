import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService, Course, CourseMaterial } from '../../core/services/course.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Admin Control Panel</h1>
        
        <!-- Register New User Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div class="px-4 py-5 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Register New User</h3>
            <p class="mt-1 text-sm text-gray-500">Create student or instructor accounts manually.</p>
          </div>
          <div class="p-6">
            <form [formGroup]="userForm" (ngSubmit)="registerUser()">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 mb-4">
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" formControlName="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm">
                </div>
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" formControlName="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm">
                </div>
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" formControlName="password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm">
                </div>
                <div class="sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Role</label>
                  <select formControlName="role" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm bg-white">
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div class="text-green-600 mb-2 text-sm" *ngIf="userMessage">{{userMessage}}</div>
              <div class="text-red-600 mb-2 text-sm" *ngIf="userError">{{userError}}</div>
              
              <div class="flex justify-end">
                <button type="submit" [disabled]="userForm.invalid" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">Register User</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Manage All Courses & Materials Section -->
        <h3 class="text-xl font-bold text-gray-900 mb-4">All Platform Courses</h3>
        <div *ngIf="courses.length === 0" class="text-gray-500 mb-8">No courses available.</div>
        
        <div *ngFor="let c of courses" class="bg-white shadow sm:rounded-lg mb-6 p-4">
          <div class="flex justify-between items-center mb-2">
            <div>
              <h4 class="text-lg font-bold">{{ c.title }}</h4>
              <p class="text-sm text-gray-500">Instructor ID: {{ c.instructorId }} | Price: $\{{ c.price }}</p>
            </div>
            <button (click)="selectCourse(c)" class="text-indigo-600 hover:text-indigo-900 font-medium text-sm border border-indigo-600 rounded px-3 py-1">Manage Course Materials</button>
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
              <h6 class="text-sm font-medium text-gray-800 mb-3">Upload New Material (Admin Override)</h6>
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
export class AdminComponent implements OnInit {
  courses: Course[] = [];
  userForm: FormGroup;
  materialForm: FormGroup;

  userMessage = '';
  userError = '';

  selectedCourse: Course | null = null;
  selectedCourseMaterials: CourseMaterial[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['STUDENT', Validators.required]
    });

    this.materialForm = this.fb.group({
      title: ['', Validators.required],
      type: ['VIDEO', Validators.required]
    });
  }

  ngOnInit() {
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (res) => this.courses = res,
      error: (err) => console.error(err)
    });
  }

  registerUser() {
    if (this.userForm.invalid) return;
    this.userMessage = '';
    this.userError = '';

    this.authService.register(this.userForm.value).subscribe({
      next: (res) => {
        this.userMessage = 'User registered successfully!';
        this.userForm.reset({ role: 'STUDENT' });
      },
      error: (err) => {
        this.userError = err?.error?.message || 'Registration failed';
      }
    });
  }

  selectCourse(course: Course) {
    if (this.selectedCourse?.id === course.id) {
      this.selectedCourse = null;
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
