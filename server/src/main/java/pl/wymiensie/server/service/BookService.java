package pl.wymiensie.server.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.BookStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookService {
    List<Book> findAll();

    Page<Book> findByUserId(UUID userId, int page, int size);

    Page<Book> findByText(String text, UUID userId, int page, int size);

    Optional<Book> findById(UUID id);

    Book saveBook(Book book);

    Book updateBook(Book book);

    Book updateBookStatus(UUID id, BookStatus bookStatus);

    void deleteBook(UUID id);

    long getNumberOfBooks();
}
