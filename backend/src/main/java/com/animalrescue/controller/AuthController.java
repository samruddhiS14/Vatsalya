package com.animalrescue.controller;

import com.animalrescue.dto.LoginRequest;
import com.animalrescue.dto.RegisterRequest;
import com.animalrescue.model.User;
import com.animalrescue.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) { this.userRepository = userRepository; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase(Locale.ROOT);
        if (email.isBlank() || request.getPassword() == null || request.getPassword().length() < 6 || request.getName() == null || request.getName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name, email and a password of at least 6 characters are required."));
        }
        if (userRepository.existsByEmailIgnoreCase(email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "An account with this email already exists."));
        }
        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPhone(request.getPhone() == null ? "" : request.getPhone().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() == null ? User.Role.CITIZEN : request.getRole());
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Account created successfully.", "role", user.getRole().name()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase(Locale.ROOT);
        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid email or password");
        User user = userOpt.get();
        if (request.getPassword() == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        String stored = user.getPassword() == null ? "" : user.getPassword();
        boolean valid = stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$")
                ? passwordEncoder.matches(request.getPassword(), stored)
                : stored.equals(request.getPassword());
        if (!valid) return ResponseEntity.status(401).body("Invalid email or password");
        if (!stored.startsWith("$2")) { user.setPassword(passwordEncoder.encode(request.getPassword())); userRepository.save(user); }
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
