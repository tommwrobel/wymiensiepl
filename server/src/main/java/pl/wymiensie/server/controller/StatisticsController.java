package pl.wymiensie.server.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.Role;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.exception.UserNotPermittedException;
import pl.wymiensie.server.model.Statistics;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    UserService userService;
    BookService bookService;

    public StatisticsController(UserService userService, BookService bookService) {
        this.userService = userService;
        this.bookService = bookService;
    }

    @GetMapping
    public Statistics getStatistics() {
        int numberOfUsers = userService.getNumberOfUsers();
        int numberOfBooks = bookService.getNumberOfBooks();

        return new Statistics(numberOfUsers, numberOfBooks);
    }

    @PutMapping
    public Book updateBook(@RequestBody Book book, @AuthenticationPrincipal User user) {
        if(bookService.findById(book.getId()).isEmpty())
            throw new ResourceNotFoundException("Book not found.");
        if(!book.getUser().equals(user) && user.getRole() != Role.ADMIN)
            throw new UserNotPermittedException("User not permitted.");

        return bookService.updateBook(book);
    }
}
