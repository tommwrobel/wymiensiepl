package pl.wymiensie.server.service;

import org.springframework.stereotype.Service;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.model.BookStatus;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.repository.BookRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }
    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findByUserId(UUID userId) {
        return bookRepository.findByUserId(userId);
    }

    @Override
    public List<Book> searchAllBooks(String text) {
        return bookRepository.searchAllBooks(text);
    }

    @Override
    public Optional<Book> findById(UUID id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBookStatus(UUID id, BookStatus bookStatus) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("API.BOOK_WITH_ID_NOT_FOUND"));
        book.setStatus(bookStatus);
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(UUID id) {
        bookRepository.deleteById(id);
    }

    @Override
    public long getNumberOfBooks() {
        return bookRepository.count();
    }
}
