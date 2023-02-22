package pl.wymiensie.server.service;

import pl.wymiensie.server.entity.Transaction;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionService {
    List<Transaction> findAll();

    Optional<Transaction> findById(UUID id);

    List<Transaction> findByUserId(UUID id);

    Optional<Transaction> findByProposalUserId(UUID userId);

    Optional<Transaction> findByAcceptedUserId(UUID userId);

    Transaction saveTransaction(Transaction transaction);

    Transaction updateTransaction(UUID id, Transaction transaction);

    void deleteTransaction(UUID id);

    long getNumberOfTransactions(UUID id);
}
