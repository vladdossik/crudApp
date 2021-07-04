package com.mentor.crud.service;

import com.mentor.crud.model.Role;
import com.mentor.crud.model.User;
import com.mentor.crud.repo.RoleRepository;
import com.mentor.crud.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public User show(int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.get();
    }

    @Override
    public Role showRole(int id) {
        Optional<Role> optionalUser = roleRepository.findById(id);
        return optionalUser.get();
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }
}
