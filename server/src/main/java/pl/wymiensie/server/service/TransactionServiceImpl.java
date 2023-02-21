package pl.wymiensie.server.service;

import pl.wymiensie.server.entity.Transaction;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.model.TransactionStatus;
import pl.wymiensie.server.repository.BookRepository;
import pl.wymiensie.server.repository.TransactionRepository;
import pl.wymiensie.server.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final BookRepository bookRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository, BookRepository bookRepository) {
        this.transactionRepository = transactionRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    @Override
    public Optional<Transaction> findById(UUID id) {
        return transactionRepository.findById(id);
    }

    @Override
    public Optional<Transaction> findByUserId(UUID id) {
        return transactionRepository.findByProposalUserIdOrAcceptedUserId(id, id);
    }

    @Override
    public Optional<Transaction> findByProposalUserId(UUID userId) {
        return transactionRepository.findByProposalUserId(userId);
    }

    @Override
    public Optional<Transaction> findByAcceptedUserId(UUID userId) {
        return transactionRepository.findByAcceptedUserId(userId);
    }

    @Override
    public Optional<Transaction> findByBookId(UUID bookId) {
        return transactionRepository.findByBookId(bookId);
    }

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction updateTransaction(UUID id, Transaction transaction) {
        transaction.setId(id);
        return transactionRepository.save(transaction);
    }

    @Override
    public void deleteTransaction(UUID id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public long getNumberOfTransactions() {
        return 0;
    }
}
