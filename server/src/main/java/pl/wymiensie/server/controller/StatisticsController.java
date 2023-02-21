package pl.wymiensie.server.controller;

import org.springframework.web.bind.annotation.*;
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
        long numberOfUsers = userService.getNumberOfUsers();
        long numberOfBooks = bookService.getNumberOfBooks();

        return new Statistics(numberOfUsers, numberOfBooks);
    }
}
