package com.edtech.courseservice.controller;

import com.edtech.courseservice.dto.CourseRequest;
import com.edtech.courseservice.entity.Course;
import com.edtech.courseservice.entity.CourseMaterial;
import com.edtech.courseservice.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody @Valid CourseRequest request) {
        return ResponseEntity.ok(courseService.createCourse(request));
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Course>> getCoursesByInstructor(@PathVariable Long instructorId) {
        return ResponseEntity.ok(courseService.getCoursesByInstructor(instructorId));
    }

    @PostMapping("/{id}/materials")
    public ResponseEntity<CourseMaterial> uploadMaterial(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("type") String type,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(courseService.uploadMaterial(id, title, type, file));
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<Course> uploadCourseImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(courseService.uploadCourseImage(id, file));
    }

    @GetMapping("/image/{imageName:.+}")
    public ResponseEntity<Resource> getCourseImage(@PathVariable String imageName) throws Exception {
        Path path = Paths.get("uploads/materials/" + imageName).toAbsolutePath().normalize();
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    // Without attachment to show inline if browser supports
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new RuntimeException("Could not read image file");
        }
    }

    @GetMapping("/{id}/materials")
    public ResponseEntity<List<CourseMaterial>> getMaterials(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getMaterialsByCourseId(id));
    }

    @GetMapping("/materials/{materialId}/download")
    public ResponseEntity<Resource> downloadMaterial(@PathVariable Long materialId) throws Exception {
        CourseMaterial material = courseService.getMaterialById(materialId);
        Path path = Paths.get(material.getFilePath()).toAbsolutePath().normalize();
        Resource resource = new UrlResource(path.toUri());

        if (resource.exists() || resource.isReadable()) {
            String contentType = Files.probeContentType(path);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            String disposition = "VIDEO".equalsIgnoreCase(material.getType()) ? "inline" : "attachment";

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            disposition + "; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new RuntimeException("Could not read file");
        }
    }

    @DeleteMapping("/materials/{materialId}")
    public ResponseEntity<?> deleteMaterial(@PathVariable Long materialId) {
        courseService.deleteMaterial(materialId);
        return ResponseEntity.ok(Map.of("message", "Material deleted successfully!"));
    }
}
