package com.manager.projectsmanager.Controllers;

import com.manager.projectsmanager.Entities.User.*;
import com.manager.projectsmanager.Repositories.UserRepository;
import com.manager.projectsmanager.Security.TokenService;
import com.manager.projectsmanager.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO data){
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        if(!data.email().matches(emailRegex)) return ResponseEntity.badRequest().body("Please enter a valid email");
        var userPassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(userPassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());
        int user_id = userService.getUserIdByEmail(data.email());
        return ResponseEntity.ok().body(new LoginResponseDTO(token, user_id, data.email(), ((User) auth.getPrincipal()).getRole().getRole()));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody @Validated RegisterDTO data){
        return register(data, UserRole.USER);
    }

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody @Validated RegisterDTO data){
        return register(data, UserRole.ADMIN);
    }

    private ResponseEntity<String> register(@RequestBody @Validated RegisterDTO data, UserRole role){
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        if(userRepository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().body("User already exists");
        if(data.email().isEmpty() || !data.email().matches(emailRegex)) return ResponseEntity.badRequest().body("Please enter a valid email");
        if(data.password().isEmpty()) return ResponseEntity.badRequest().body("Please enter a password");

        String encryptedPass = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(), encryptedPass, role);
        userRepository.save(newUser);
        return ResponseEntity.ok().body("Registered");
    }
}
