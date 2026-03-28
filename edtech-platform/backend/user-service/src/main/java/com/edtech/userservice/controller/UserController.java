package com.edtech.userservice.controller;

import com.edtech.userservice.entity.User;
import com.edtech.userservice.repository.UserRepository;
import com.edtech.userservice.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElse(null);
        if (user != null) {
            user.setPassword(null); // Do not send back password
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    // Additional Profile Management endpoints could go here
}
