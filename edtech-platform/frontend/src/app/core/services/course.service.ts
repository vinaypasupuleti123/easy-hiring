import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Course {
    id?: number;
    title: string;
    description: string;
    instructorId: number;
    price: number;
    level?: string;
    image?: string;
    rating?: number;
}

export interface CourseMaterial {
    id: number;
    courseId: number;
    title: string;
    type: string;
    filePath: string;
}

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient) { }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.apiUrl, course);
    }

    uploadCourseImage(courseId: number, file: File): Observable<Course> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Course>(`${this.apiUrl}/${courseId}/image`, formData);
    }

    getAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }

    getCourseById(id: number): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    getCoursesByInstructor(instructorId: number): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}/instructor/${instructorId}`);
    }

    // Material methods
    uploadMaterial(courseId: number, title: string, type: string, file: File): Observable<CourseMaterial> {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', type);
        formData.append('file', file);
        return this.http.post<CourseMaterial>(`${this.apiUrl}/${courseId}/materials`, formData);
    }

    getMaterials(courseId: number): Observable<CourseMaterial[]> {
        return this.http.get<CourseMaterial[]>(`${this.apiUrl}/${courseId}/materials`);
    }

    deleteMaterial(materialId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/materials/${materialId}`);
    }

    getMaterialDownloadUrl(materialId: number): string {
        return `${this.apiUrl}/materials/${materialId}/download`;
    }
}
