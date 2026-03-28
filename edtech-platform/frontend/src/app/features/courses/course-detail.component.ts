import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { CourseService, CourseMaterial, Course } from '../../core/services/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="bg-gray-50 min-h-screen pb-16">
      <!-- Breadcrumb -->
      <div class="bg-white border-b border-gray-200 py-3">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <nav class="flex text-sm font-medium text-gray-500" aria-label="Breadcrumb">
             <ol class="flex items-center space-x-2">
               <li><a routerLink="/" class="hover:text-gfg-green">Home</a></li>
               <li><span class="px-2">›</span></li>
               <li><a routerLink="/courses" class="hover:text-gfg-green">Courses</a></li>
               <li><span class="px-2">›</span></li>
               <li class="text-gray-900 font-bold max-w-[200px] sm:max-w-none truncate" aria-current="page">{{ getCourse()?.title || 'Loading' }}</li>
             </ol>
           </nav>
        </div>
      </div>

      <div *ngIf="getCourse() as course; else notFound" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div class="flex flex-col lg:flex-row gap-8">
          
          <!-- Left Main Content -->
          <div class="lg:w-2/3 space-y-8">
            <div class="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-8">
              <span class="inline-block bg-green-50 text-gfg-green text-sm font-bold px-3 py-1 rounded-full mb-4">{{ course.level }}</span>
              <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">{{ course.title }}</h1>
               <div class="flex items-center text-sm text-gray-500 mb-6 space-x-6 border-b border-gray-100 pb-6">
                 <div class="flex items-center"><span class="text-yellow-400 text-lg mr-1">★</span> <span class="font-bold text-gray-700 mr-1">{{ course.rating }}</span> (1200+ Reviews)</div>
                 <div class="flex items-center"><svg class="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> <span class="font-bold text-gray-700 mr-1">50k+</span> Students Enrolled</div>
              </div>
              
              <h2 class="text-2xl font-bold mb-3 text-gray-900">About this Course</h2>
              <p class="text-gray-600 text-lg leading-relaxed mb-6">{{ course.description }}</p>
              
              <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 relative rounded-r-lg">
                <p class="text-blue-800 text-sm font-semibold">Self-paced learning tailored specifically to your needs. Access content 24/7 forever.</p>
              </div>

              <h2 class="text-2xl font-bold mb-4 mt-8 text-gray-900 border-l-4 border-gfg-green pl-3">What you will learn</h2>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mt-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-gfg-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>In-depth theoretical concepts with rich visual explanations.</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-gfg-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Over 150+ coding challenges to polish your problem-solving.</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-gfg-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Build complete real-world scalable applications.</span>
                </li>
                <li class="flex items-start">
                  <svg class="h-6 w-6 text-gfg-green mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced tech stack methodologies matching strict industry standards.</span>
                </li>
              </ul>
            </div>
            
            <div class="bg-white shadow-sm rounded-xl border border-gray-100 p-8">
              <h2 class="text-2xl font-bold mb-4 text-gray-900">Course Syllabus</h2>
              <div class="border-t border-gray-200 pt-4">
                <details class="group py-4 border-b border-gray-100 focus:outline-none cursor-pointer">
                  <summary class="flex justify-between items-center font-bold text-gray-800 text-lg focus:outline-none">
                    <div class="flex items-center">
                       <span class="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">1</span>
                       Introduction & Setup
                    </div>
                    <span class="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p class="text-gray-600 mt-4 pl-11 mb-2 leading-relaxed">Understanding fundamentals, configuring the environment, installing necessary software dependencies, and creating the first basic application.</p>
                </details>
                <details class="group py-4 border-b border-gray-100 focus:outline-none cursor-pointer">
                  <summary class="flex justify-between items-center font-bold text-gray-800 text-lg focus:outline-none">
                     <div class="flex items-center">
                       <span class="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">2</span>
                       Core Principles & Architecure
                    </div>
                    <span class="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p class="text-gray-600 mt-4 pl-11 mb-2 leading-relaxed">Detailed immersion into how systems fundamentally handle the data structures conceptually and practically with deep code walkthroughs.</p>
                </details>
                <details class="group py-4 border-b border-gray-100 focus:outline-none cursor-pointer">
                  <summary class="flex justify-between items-center font-bold text-gray-800 text-lg focus:outline-none">
                     <div class="flex items-center">
                       <span class="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">3</span>
                       Advanced Concepts & Optimization
                    </div>
                    <span class="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p class="text-gray-600 mt-4 pl-11 mb-2 leading-relaxed">Handling incredibly large datasets, learning exactly how to reduce algorithms to O(1) or O(log N) time complexities. Caching and caching eviction logic strategies discussed heavily.</p>
                </details>
                 <details class="group py-4 focus:outline-none cursor-pointer">
                  <summary class="flex justify-between items-center font-bold text-gray-800 text-lg focus:outline-none">
                     <div class="flex items-center">
                       <span class="bg-gray-100 text-gray-600 w-8 h-8 rounded-full flex justify-center items-center text-sm mr-3">4</span>
                       Interview Prep Guide
                    </div>
                    <span class="transition group-open:rotate-180">
                      <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p class="text-gray-600 mt-4 pl-11 mb-2 leading-relaxed">Simulated whiteboard interview sessions for top product-based software companies.</p>
                </details>
              </div>
            </div>
          </div>
          
          <!-- Student Materials Section -->
          <div *ngIf="isEnrolled" class="bg-white shadow-sm rounded-xl border border-gray-100 p-8 mt-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-900">Course Materials</h2>
            <div *ngIf="materialsLoading" class="text-gray-500">Loading materials...</div>
            <div *ngIf="!materialsLoading && materials.length === 0" class="text-gray-500">No materials available yet.</div>
            <ul class="divide-y divide-gray-200">
              <li *ngFor="let m of materials" class="py-4 flex justify-between items-center">
                <div class="flex items-center">
                  <span class="bg-gray-100 text-gray-600 font-bold px-2 py-1 rounded text-xs mr-3">{{ m.type }}</span>
                  <span class="text-gray-800 font-medium">{{ m.title }}</span>
                </div>
                <div>
                  <ng-container *ngIf="m.type === 'PDF'">
                    <a [href]="getDownloadUrl(m.id)" target="_blank" class="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded text-sm font-bold">Download PDF</a>
                  </ng-container>
                  <ng-container *ngIf="m.type === 'VIDEO'">
                     <button (click)="playVideo(m)" class="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded text-sm font-bold">Watch Video</button>
                  </ng-container>
                </div>
              </li>
            </ul>
             <!-- Video Player Modal -->
            <div *ngIf="activeVideo" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
              <div class="bg-white p-4 rounded-lg max-w-4xl w-full">
                <div class="flex justify-between items-center mb-4">
                  <h3 class="text-lg font-bold">{{ activeVideo.title }}</h3>
                  <button (click)="closeVideo()" class="text-gray-500 hover:text-black font-bold">Close</button>
                </div>
                <!-- HTML5 Video Player with controlsList="nodownload" to block downloads -->
                <video controls controlsList="nodownload" class="w-full" [src]="getDownloadUrl(activeVideo.id)">
                   Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <!-- Sticky Side Panel -->
          <div class="lg:w-1/3">
             <div class="bg-white shadow-xl rounded-xl border border-gray-100 sticky top-24 overflow-hidden">
                <div class="h-56 relative w-full">
                   <img [src]="getImageUrl(course.image)" [alt]="course.title" class="w-full h-full object-cover">
                   <div class="absolute inset-0 bg-black bg-opacity-30 mix-blend-multiply flex items-center justify-center">
                       <div class="w-16 h-16 bg-white rounded-full bg-opacity-80 flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all shadow-xl">
                            <svg class="w-8 h-8 text-gfg-green ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"></path></svg>
                       </div>
                   </div>
                </div>
                <div class="p-6">
                   <div class="text-4xl font-extrabold text-gray-900 mb-2">₹{{ course.price }}</div>
                   <div class="text-green-600 font-semibold text-sm mb-6 flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> 100% Secure Checkout Guarantee
                   </div>
                   <div *ngIf="!loadingEnrollmentStatus">
                     <ng-container *ngIf="!isEnrolled">
                       <button (click)="enrollCourse(course)" class="w-full bg-gfg-green hover:bg-gfg-dark text-white font-bold py-4 px-4 rounded-lg shadow transition-colors text-lg mb-4">
                         Enroll Now
                       </button>
                       <button class="w-full bg-white border-2 border-gfg-green text-gfg-green hover:bg-green-50 font-bold py-3 px-4 rounded-lg transition-colors text-md">
                         Try for Free
                       </button>
                     </ng-container>
                     
                     <ng-container *ngIf="isEnrolled">
                       <button [routerLink]="['/student/dashboard']" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-lg shadow transition-colors text-lg mb-4">
                         Go to Dashboard
                       </button>
                       <div class="text-center text-sm text-green-600 font-semibold mb-2">You are already enrolled in this course.</div>
                     </ng-container>
                   </div>
                   <div *ngIf="loadingEnrollmentStatus" class="w-full h-24 bg-gray-100 animate-pulse rounded-lg mb-4 flex items-center justify-center text-gray-400 font-semibold">
                      Checking status...
                   </div>
                   
                   <div class="mt-8">
                     <h4 class="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Course Includes:</h4>
                     <ul class="space-y-3 text-sm text-gray-600 font-medium">
                        <li class="flex items-center"><svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> 60 hours on-demand video</li>
                        <li class="flex items-center"><svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg> 15 Articles & Worksheets</li>
                        <li class="flex items-center"><svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Full Source Code Access</li>
                        <li class="flex items-center"><svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> Access on mobile and TV</li>
                        <li class="flex items-center"><svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Certificate of completion</li>
                     </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <ng-template #notFound>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
           <div class="text-6xl mb-4">🔍</div>
           <h2 class="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h2>
           <p class="text-gray-500 mb-8 max-w-md mx-auto">The course you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
           <a routerLink="/courses" class="inline-block bg-gfg-green text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gfg-dark transition-colors text-lg">Back to All Courses</a>
        </div>
      </ng-template>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {
  courseId: number | null = null;
  currentCourse: Course | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private courseService: CourseService
  ) { }

  isEnrolled: boolean = false;
  loadingEnrollmentStatus: boolean = true;
  materials: CourseMaterial[] = [];
  materialsLoading: boolean = true;
  activeVideo: any = null;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = parseInt(id, 10);
        this.courseService.getCourseById(this.courseId).subscribe({
          next: (res) => {
            this.currentCourse = res;
            this.checkEnrollmentStatus();
            this.fetchMaterials();
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  checkEnrollmentStatus() {
    const user = this.authService.currentUserValue;
    if (user && user.id && this.courseId) {
      this.http.get<any[]>(`${environment.apiUrl}/enrollments/student/${user.id}`).subscribe({
        next: (enrollments) => {
          this.isEnrolled = enrollments.some(e => e.courseId === this.courseId);
          this.loadingEnrollmentStatus = false;
        },
        error: (err) => {
          console.error('Failed to check enrollment status', err);
          this.loadingEnrollmentStatus = false;
        }
      });
    } else {
      this.loadingEnrollmentStatus = false;
    }
  }

  fetchMaterials() {
    if (!this.courseId) return;
    this.materialsLoading = true;
    this.courseService.getMaterials(this.courseId).subscribe({
      next: (res) => {
        this.materials = res;
        this.materialsLoading = false;
      },
      error: (err) => {
        console.error('Failed to load materials', err);
        this.materialsLoading = false;
      }
    });
  }

  getDownloadUrl(materialId: number): string {
    return this.courseService.getMaterialDownloadUrl(materialId);
  }

  playVideo(material: CourseMaterial) {
    this.activeVideo = material;
  }

  closeVideo() {
    this.activeVideo = null;
  }


  getCourse() {
    return this.currentCourse;
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return 'https://media.geeksforgeeks.org/img-practice/banner/complete-interview-preparation-thumbnail.png';
    if (image.startsWith('http')) return image;
    return environment.apiUrl.replace('/api', '') + image;
  }

  async enrollCourse(course: any) {
    const user = this.authService.currentUserValue;
    if (!user) {
      Swal.fire({
        title: 'Not Logged In!',
        text: 'Please login or register to enroll in courses.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        confirmButtonColor: '#2f8D46'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    // Show loading and initiate OTP send
    Swal.fire({
      title: 'Sending Verification Code...',
      text: 'Please wait while we send an OTP to your email.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post(`${environment.apiUrl}/notifications/send-otp`, {
      email: user.email,
      action: 'COURSE_ENROLLMENT'
    }).subscribe({
      next: async () => {
        // Close loading and prompt for OTP
        const { value: otp } = await Swal.fire({
          title: 'Enter Verification Code',
          input: 'text',
          inputLabel: `An OTP was sent to ${user.email}. Enter it below to confirm enrollment.`,
          inputPlaceholder: 'Enter 6-digit OTP',
          showCancelButton: true,
          confirmButtonText: 'Verify & Enroll',
          confirmButtonColor: '#2f8D46',
          inputValidator: (value) => {
            if (!value) {
              return 'You need to enter the OTP!';
            }
            return null;
          }
        });

        if (otp) {
          // Verify OTP
          Swal.fire({
            title: 'Verifying...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          this.http.post(`${environment.apiUrl}/notifications/verify-otp`, {
            email: user.email,
            otp: otp,
            action: 'COURSE_ENROLLMENT'
          }).subscribe({
            next: () => {
              // OTP Validated! 
              this.http.post(`${environment.apiUrl}/enrollments`, {
                studentId: user.id,
                courseId: course.id,
                progress: 0
              }).subscribe({
                next: () => {
                  Swal.fire('Enrolled!', `Successfully enrolled in ${course.title}!`, 'success').then(() => {
                    this.router.navigate(['/student/dashboard']);
                  });
                },
                error: (err) => {
                  console.error('Enrollment error:', err);
                  let errorMsg = '';
                  if (err.error) {
                    errorMsg = typeof err.error === 'string' ? err.error : (err.error.message || '');
                  }

                  if (errorMsg.includes('already enrolled')) {
                    Swal.fire('Already Enrolled', 'You have already enrolled in this course.', 'info').then(() => {
                      this.router.navigate(['/student/dashboard']);
                    });
                  } else {
                    Swal.fire('Oops...', 'Successfully verified, but failed to create enrollment record. ' + errorMsg, 'error');
                  }
                }
              });
            },
            error: (err) => {
              console.error('OTP Verification error:', err);
              Swal.fire('Invalid OTP', 'The code you entered is incorrect or expired.', 'error');
            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to send OTP:', err);
        Swal.fire('Error', 'Failed to send verification email. Please try again later.', 'error');
      }
    });
  }
}
