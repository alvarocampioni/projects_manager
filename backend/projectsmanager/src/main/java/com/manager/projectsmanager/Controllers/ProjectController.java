package com.manager.projectsmanager.Controllers;

import com.manager.projectsmanager.Entities.Project.Project;
import com.manager.projectsmanager.Entities.Project.ProjectDTO;
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
@RequestMapping("/api/v2")
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;
    
    @Autowired
    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping("users/project")
    public ResponseEntity<Project> saveProject(@RequestBody ProjectDTO project, Principal authenticatedPrincipal) {
        Project savedProject = new Project();
        savedProject.setProject_name(project.project_name());
        savedProject.setProject_description(project.project_description());
        int id = userService.getUserIdByEmail(authenticatedPrincipal.getName());
        Optional<User> user = userService.getUserById(id);
        user.ifPresent(savedProject::setUser);
        savedProject.setHours_spent(project.hours_spent());
        projectService.saveProject(savedProject);
        return ResponseEntity.ok(savedProject);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> Projects = projectService.getAllProjects();
        return ResponseEntity.ok(Projects);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProject(@PathVariable int id) {
        Optional<Project> Project = projectService.getProjectById(id);
        return Project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable int id, @RequestBody ProjectDTO project) {
        Project updateProject = projectService.updateProject(id, project);
        return ResponseEntity.ok(updateProject);
    }


    @DeleteMapping("/projects/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable int id) {
        projectService.deleteProjectById(id);
        return ResponseEntity.ok("Deleted Project with id " + id);
    }
}
