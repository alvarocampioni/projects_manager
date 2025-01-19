package com.manager.projectsmanager.Services;

import com.manager.projectsmanager.Entities.Project.Project;
import com.manager.projectsmanager.Entities.Project.ProjectDTO;
import com.manager.projectsmanager.Repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public void saveProject(Project project) {
        projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(int id) {
        return projectRepository.findById(id);
    }

    public Project updateProject(int id, ProjectDTO project) {
        Optional<Project> projectOptional = projectRepository.findById(id);
        if (projectOptional.isPresent()) {
            Project updatedProject = projectOptional.get();
            updatedProject.setProject_name(project.project_name());
            updatedProject.setProject_description(project.project_description());
            updatedProject.setHours_spent(project.hours_spent());
            return projectRepository.save(updatedProject);
        } else {
            throw new RuntimeException("Project not found");
        }
    }

    public void deleteProjectById(int id) {
        projectRepository.deleteById(id);
    }
}
