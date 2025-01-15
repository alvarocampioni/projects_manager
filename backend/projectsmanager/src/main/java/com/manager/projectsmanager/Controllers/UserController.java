package com.manager.projectsmanager.Controllers;

import com.manager.projectsmanager.Entities.Project.Project;
import com.manager.projectsmanager.Entities.User.User;
import com.manager.projectsmanager.Services.ProjectService;
import com.manager.projectsmanager.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/users/{id}/projects")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        Optional<User> user = userService.getUserById(id);
        List<Project> projects = projectService.getAllProjects();
        user.ifPresent(value -> projects.removeIf(project -> project.getUser().getUser_id() != value.getUser_id()));
        return ResponseEntity.ok(projects);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User user, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        User updateUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id, Principal authenticatedPrincipal) {
        int logged_id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        if(logged_id != id) { return ResponseEntity.badRequest().build(); }
        userService.deleteUserById(id);
        return ResponseEntity.ok("Deleted user with id " + id);
    }

}
