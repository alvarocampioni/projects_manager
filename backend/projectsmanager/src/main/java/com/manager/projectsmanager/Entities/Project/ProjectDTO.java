package com.manager.projectsmanager.Entities.Project;

import java.math.BigDecimal;

public record ProjectDTO(String project_name, String project_description, BigDecimal hours_spent) {
}
