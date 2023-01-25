package pl.wymiensie.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.wymiensie.server.entity.Book;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    List<Book> findByUserId(UUID userId);

    @Query(value = "SELECT * FROM books WHERE title ILIKE %?1% OR author ILIKE %?1% OR description ILIKE %?1%", nativeQuery = true)
    List<Book> searchAllBooks(String text);
}
