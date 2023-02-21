package pl.wymiensie.server.controller;

import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.exception.UserNotPermittedException;
import pl.wymiensie.server.model.BookStatus;
import pl.wymiensie.server.model.PagedResponse;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.List;
import java.util.UUID;

import static pl.wymiensie.server.model.PagedResponse.transformResponse;

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
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        return user;
    }

    @PostMapping("/{id}/books")
    public Book addBookToUser(
            @PathVariable("id") UUID id,
            @RequestBody Book book,
            @AuthenticationPrincipal User currentUser) {
        if (!currentUser.getId().equals(id))
            throw new UserNotPermittedException();
        User user = userService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        book.setUser(user);
        book.setStatus(BookStatus.AVAILABLE);
        return bookService.saveBook(book);
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") UUID id) {
        userService.deleteUser(id);
    }
}
