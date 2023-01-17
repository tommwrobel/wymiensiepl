package pl.wymiensie.server.service;

import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.BookStatus;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookService {
    List<Book> findAllBooks();

    Collection<Book> findByUserId(UUID userId);

    Optional<Book> findById(UUID id);

    Book saveBook(Book book);

    Book updateBook(Book book);

    Book updateBookStatus(UUID id, BookStatus bookStatus);

    void deleteBook(UUID id);

    int getNumberOfBooks();
}
