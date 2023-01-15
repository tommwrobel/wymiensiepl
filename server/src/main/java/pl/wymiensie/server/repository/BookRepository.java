package pl.wymiensie.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.wymiensie.server.entity.Book;

import java.util.Collection;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Collection<Book> findByUserId(UUID userId);
}
