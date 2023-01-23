package pl.wymiensie.server.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.exception.UserNotPermittedException;
import pl.wymiensie.server.model.Role;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final BookService bookService;

    public UserController(UserService userService, BookService bookService) {
        this.userService = userService;
        this.bookService = bookService;
    }

    @GetMapping
    public List<User> findAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") UUID id) {
        Optional<User> user = userService.findById(id);
        if (user.isEmpty())
            throw new ResourceNotFoundException("User not found.");
        return user.get();
    }

    @GetMapping("/{id}/books")
    public Collection<Book> getUserBooks(@PathVariable("id") UUID id) {
        Collection<Book> books = bookService.findByUserId(id);
        return books;
    }

    @PostMapping("/{id}/books")
    public Book addBookToUser(
            @PathVariable("id") UUID id,
            @RequestBody Book book,
            @AuthenticationPrincipal User currentUser) {
        if (!currentUser.getId().equals(id))
            throw new UserNotPermittedException();
        User user = userService.findById(id).orElseThrow(() -> new ResourceNotFoundException());
        book.setUser(user);
        return bookService.saveBook(book);
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
