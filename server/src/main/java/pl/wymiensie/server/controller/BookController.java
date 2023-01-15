package pl.wymiensie.server.controller;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.Role;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.exception.UserNotPermittedException;
import pl.wymiensie.server.service.BookService;

import java.util.UUID;

@RestController
@RequestMapping("/book")
public class BookController {

    BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public Book saveBook(@RequestBody Book book, @AuthenticationPrincipal User user) {
        book.setUser(user);
        return bookService.saveBook(book);
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
