package com.manager.projectsmanager.Services;

import com.manager.projectsmanager.Entities.User.User;
import com.manager.projectsmanager.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User updateUser(int id, User user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User updatedUser = userOptional.get();
            updatedUser.setEmail(user.getEmail());
            updatedUser.setCreated_at(user.getCreated_at());
            return userRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    public int getUserIdByEmail(String email) {
        for(User user : getAllUsers()) {
            if(user.getEmail().equals(email)) {
                return user.getUser_id();
            }
        }
        return -1;
    }
}
