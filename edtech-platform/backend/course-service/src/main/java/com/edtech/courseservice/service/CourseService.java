package com.edtech.courseservice.service;

import com.edtech.courseservice.dto.CourseRequest;
import com.edtech.courseservice.entity.Course;
import com.edtech.courseservice.entity.CourseMaterial;
import com.edtech.courseservice.repository.CourseMaterialRepository;
import com.edtech.courseservice.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMaterialRepository materialRepository;

    private final Path fileStorageLocation;

    public CourseService() {
        this.fileStorageLocation = Paths.get("uploads/materials").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public Course createCourse(CourseRequest request) {
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setInstructorId(request.getInstructorId());
        course.setPrice(request.getPrice() != null ? request.getPrice() : 0.0);
        course.setLevel(request.getLevel() != null ? request.getLevel() : "Beginner");
        course.setImage("https://media.geeksforgeeks.org/img-practice/banner/dsa-self-paced-thumbnail.png"); // Default
                                                                                                             // image
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public List<Course> getCoursesByInstructor(Long instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    public CourseMaterial uploadMaterial(Long courseId, String title, String type, MultipartFile file) {
        // Validate course exists
        getCourseById(courseId);

        String originalFileName = org.springframework.util.StringUtils
                .cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            CourseMaterial material = new CourseMaterial();
            material.setCourseId(courseId);
            material.setTitle(title);
            material.setType(type); // VIDEO or PDF
            material.setFilePath(targetLocation.toString());

            return materialRepository.save(material);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Course uploadCourseImage(Long courseId, MultipartFile file) {
        Course course = getCourseById(courseId);

        String originalFileName = org.springframework.util.StringUtils
                .cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.jpg");
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;

        try {
            if (fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // For simplicty in local dev, we use the download endpoint path but modified
            // for images
            String fileDownloadUri = "/api/courses/image/" + fileName;
            course.setImage(fileDownloadUri);
            return courseRepository.save(course);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store image " + fileName, ex);
        }
    }

    public List<CourseMaterial> getMaterialsByCourseId(Long courseId) {
        return materialRepository.findByCourseId(courseId);
    }

    public CourseMaterial getMaterialById(Long materialId) {
        return materialRepository.findById(materialId)
                .orElseThrow(() -> new RuntimeException("Material not found"));
    }

    public void deleteMaterial(Long materialId) {
        CourseMaterial material = getMaterialById(materialId);
        try {
            Files.deleteIfExists(Paths.get(material.getFilePath()));
        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file", ex);
        }
        materialRepository.delete(material);
    }
}
