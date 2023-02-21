package pl.wymiensie.server.controller;

import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.exception.UserNotPermittedException;
import pl.wymiensie.server.model.PagedResponse;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.UUID;

import static pl.wymiensie.server.model.PagedResponse.transformResponse;

@RestController
@RequestMapping("/books")
public class BookController {

    private final int DEFAULT_RECORDS_PER_PAGE = 8;
    BookService bookService;
    UserService userService;

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping
    public PagedResponse<Book> getAllBooks(
            @RequestParam(required = false) String searchText,
            @RequestParam(required = false) UUID userId,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        int pageNumber = (page != null && page >= 0) ? page.intValue() : 0;
        int recordsPerPage = (size != null && size > 0) ? size.intValue() : DEFAULT_RECORDS_PER_PAGE;
        Page<Book> response = bookService.findByText(searchText, userId, pageNumber, recordsPerPage);

        return transformResponse(response);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable("id") UUID id) {
        return bookService.findById(id).orElseThrow(() -> new ResourceNotFoundException());
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable("id") UUID id, @AuthenticationPrincipal User currentUser) {
        Book book = bookService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException());
        if (!currentUser.getId().equals(book.getUser().getId()))
            throw new UserNotPermittedException();
        bookService.deleteBook(id);
    }
}
