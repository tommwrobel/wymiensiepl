package pl.wymiensie.server.controller;

import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.Transaction;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.model.TransactionStatus;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.TransactionService;
import pl.wymiensie.server.service.UserService;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    TransactionService transactionService;
    BookService bookService;
    UserService userService;

    public TransactionController(BookService bookService, UserService userService, TransactionService transactionService) {
        this.transactionService = transactionService;
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public Optional<Transaction> getUserTransactions(@PathVariable UUID userId) {
        return transactionService.findByUserId(userId);
    }

    @PatchMapping("/{transactionId}")
    public Transaction updateTransactionStatus(
            @PathVariable UUID transactionId,
            @RequestParam TransactionStatus transactionStatus,
            @RequestParam(required = false) UUID bookId
    ) {
        Transaction transaction = transactionService.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException());

        if (transactionStatus == TransactionStatus.REJECTED)
            transaction.setStatus(TransactionStatus.REJECTED);

        if (transactionStatus == TransactionStatus.ACCEPTED) {
            if (bookId == null) throw new IllegalArgumentException();

            Book acceptedBook = bookService.findById(bookId)
                    .orElseThrow(() -> new ResourceNotFoundException());

            transaction.setAcceptedBook(acceptedBook);
            transaction.setStatus(TransactionStatus.ACCEPTED);
        }

        return transactionService.saveTransaction(transaction);
    }
}
