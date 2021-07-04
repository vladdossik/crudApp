package com.mentor.crud.controller;

import com.mentor.crud.model.User;
import com.mentor.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/")
public class MainRestController {

    @Autowired
    private UserService userService;


    @GetMapping("/allusers")
    public List<User> list() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getOne(@PathVariable Integer id) {
        return userService.show(id);
    }

    @PostMapping("/newUser")
    public User addUserBd(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/edit")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        userService.delete(id);
    }
}
