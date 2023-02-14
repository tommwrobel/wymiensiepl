package pl.wymiensie.server.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public Page<Book> findAllByText(String text, int page, int size) {
        if (text == null || text.length() == 0)
            return bookRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "title")));
        return bookRepository
                .findAllByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(text, text, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "title")));
    };

    @Override
    public Page<Book> findByUserId(UUID userId, int page, int size) {
        return bookRepository.findByUserId(userId, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "title")));
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
