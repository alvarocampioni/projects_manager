package com.manager.projectsmanager.Repositories;

import com.manager.projectsmanager.Entities.Project.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
