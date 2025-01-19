package com.manager.projectsmanager.Controllers;

import com.manager.projectsmanager.Entities.Project.Project;
import com.manager.projectsmanager.Entities.User.RegisterDTO;
import com.manager.projectsmanager.Entities.User.User;
import com.manager.projectsmanager.Services.ProjectService;
import com.manager.projectsmanager.Services.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;
    private final ProjectService projectService;

    @Autowired
    public UserController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @PostMapping("/user")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/get/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{id}/projects")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        Optional<User> user = userService.getUserById(id);
        List<Project> projects = projectService.getAllProjects();
        user.ifPresent(value -> projects.removeIf(project -> project.getUser().getUser_id() != value.getUser_id()));
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<User> updateUserPassword(@PathVariable int id, @RequestParam String password, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        User updateUser = userService.updateUser(id, password);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/user/{id}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        userService.deleteUserById(id);
        return ResponseEntity.ok("Deleted user with id " + id);
    }

    @DeleteMapping("/user/admin/{id}")
    public ResponseEntity<String> adminDeleteUser(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id == id) { return ResponseEntity.badRequest().build(); }
        userService.deleteUserById(id);
        return ResponseEntity.ok("Deleted user with id " + id);
    }
}
