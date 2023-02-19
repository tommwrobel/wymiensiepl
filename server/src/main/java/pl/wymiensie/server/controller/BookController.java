package pl.wymiensie.server.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.PageInfo;
import pl.wymiensie.server.model.PagedResponse;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.UserService;

import java.util.List;
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
}
