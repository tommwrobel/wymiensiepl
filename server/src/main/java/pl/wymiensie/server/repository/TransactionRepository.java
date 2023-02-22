package pl.wymiensie.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wymiensie.server.entity.Transaction;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByProposalUserIdOrAcceptedUserId(UUID proposalUserId, UUID acceptedUserId);

    Optional<Transaction> findByProposalUserId(UUID userId);

    Optional<Transaction> findByAcceptedUserId(UUID userId);

    long countByAcceptedUserId(UUID id);
}
