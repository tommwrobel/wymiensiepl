package pl.wymiensie.server.controller;

import jakarta.annotation.security.PermitAll;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/test")
    public String getTest() { return "Test"; };

    @PermitAll
    @GetMapping("/test2")
    public String getTest2() { return "Test2"; };

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable("id") UUID id) {
        return userService.findById(id);
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
    }
}
