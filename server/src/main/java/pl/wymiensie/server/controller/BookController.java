package pl.wymiensie.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.List;
import java.util.UUID;

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
    public List<Book> getBooks(
            @RequestParam(required = false) String searchTxt,
            @RequestParam(required = false) UUID userId) {
        //if (searchTxt != null && userId != null) return bookService.searchAllUserBooks(searchTxt, userId);
        //if (searchTxt != null && userId == null) return bookService.searchAllBooks(searchTxt);
        //if (searchTxt == null && userId != null) return bookService.findByUserId(userId);
        //return bookService.findAll();
        return bookService.findAllByText(searchTxt, 1, 2);
    }
}
