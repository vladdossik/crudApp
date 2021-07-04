package com.mentor.crud.service;

import com.mentor.crud.model.Role;
import com.mentor.crud.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User save(User user);

    User show(int id);

    User update(User user);

    Role showRole(int id);

    void delete(int id);

    User findByUserName(String userName);
}
