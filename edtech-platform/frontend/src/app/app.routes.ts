import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Public Feature Routes
    { path: 'courses', loadComponent: () => import('./features/courses/courses.component').then(m => m.CoursesComponent) },
    { path: 'courses/:id', loadComponent: () => import('./features/courses/course-detail.component').then(m => m.CourseDetailComponent) },
    { path: 'tutorials', loadComponent: () => import('./features/tutorials/tutorials.component').then(m => m.TutorialsComponent) },

    // Create some basic placeholder routes for the dashboards until we build the full components
    { path: 'student/dashboard', loadComponent: () => import('./features/student/student.component').then(m => m.StudentComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['STUDENT'] } },
    { path: 'instructor/dashboard', loadComponent: () => import('./features/instructor/instructor.component').then(m => m.InstructorComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['INSTRUCTOR'] } },
    { path: 'admin/dashboard', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },

    { path: '**', redirectTo: '' }
];
