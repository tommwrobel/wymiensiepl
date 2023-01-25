package pl.wymiensie.server.service;

import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.BookStatus;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookService {
    List<Book> findAll();

    List<Book> findByUserId(UUID userId);

    List<Book> searchAllBooks(String text);

    Optional<Book> findById(UUID id);

    Book saveBook(Book book);

    Book updateBook(Book book);

    Book updateBookStatus(UUID id, BookStatus bookStatus);

    void deleteBook(UUID id);

    long getNumberOfBooks();
}
