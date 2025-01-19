package com.manager.projectsmanager.Entities.User;

public record LoginResponseDTO(String token, int user_id, String email, String role) {
}
