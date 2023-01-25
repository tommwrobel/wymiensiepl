package pl.wymiensie.server.controller;

import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    BookService bookService;
    UserService userService;

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping
    public List<Book> getBooks() {
        return bookService.findAll();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String text) {
        return bookService.searchAllBooks(text);
    }
}
