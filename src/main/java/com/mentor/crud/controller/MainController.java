package com.mentor.crud.controller;

import com.mentor.crud.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("")
public class MainController {
    @GetMapping(value = "/admin")
    public String showAllUsers(ModelMap model) {
        return "users";
    }

    @GetMapping(value = "/user")
    public String user() {
        return "userPage";
    }


    @PatchMapping(value = "/{id}")
    public String update(@ModelAttribute("user") User user,
                         @RequestParam(value = "select_roles", required = false) String[] role) {
        return "redirect:/admin";
    }
}
