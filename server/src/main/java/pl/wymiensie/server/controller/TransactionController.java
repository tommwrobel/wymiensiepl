package pl.wymiensie.server.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import pl.wymiensie.server.entity.Book;
import pl.wymiensie.server.entity.Transaction;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.model.TransactionStatus;
import pl.wymiensie.server.service.BookService;
import pl.wymiensie.server.service.TransactionService;
import pl.wymiensie.server.service.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    TransactionService transactionService;
    BookService bookService;
    UserService userService;

    public TransactionController(TransactionService transactionService, BookService bookService, UserService userService) {
        this.transactionService = transactionService;
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable UUID userId) {
        return transactionService.findByUserId(userId);
    }

    @GetMapping("/{userId}/count")
    public long getNumberOfTransactions(@PathVariable UUID userId) {
        return transactionService.getNumberOfTransactions(userId);
    }

    @PostMapping
    public Transaction createTransaction(@RequestParam UUID bookId, @AuthenticationPrincipal User currentUser) {
        Book proposalBook = bookService.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException());

        User proposalUser = userService.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException());

        User acceptedUser = userService.findById(proposalBook.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException());

        if (proposalUser.getId().equals(acceptedUser.getId()))
            throw new IllegalArgumentException();

        Transaction transaction = Transaction.builder()
                .proposalBook(proposalBook)
                .proposalUser(proposalUser)
                .acceptedUser(acceptedUser)
                .status(TransactionStatus.PENDING)
                .build();

        return transactionService.saveTransaction(transaction);
    }

    @PatchMapping("/{transactionId}")
    public Transaction updateTransactionStatus(
            @PathVariable UUID transactionId,
            @RequestBody TransactionStatus transactionStatus,
            @RequestBody(required = false) UUID bookId
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
