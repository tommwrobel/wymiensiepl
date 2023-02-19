package pl.wymiensie.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.wymiensie.server.entity.Book;

import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Page<Book> findByUserId(UUID userId, Pageable pageable);

    @Query(value = "SELECT * FROM books WHERE user_id = ?1 AND (title ILIKE %?2% OR author ILIKE %?2%)",
            countQuery = "SELECT count(*) FROM books WHERE user_id = ?1 AND (title ILIKE %?2% OR author ILIKE %?2%)",
            nativeQuery = true)
    Page<Book> findByUserIdAndText(UUID userId, String text, Pageable pageable);

    @Query(value = "SELECT * FROM books WHERE title ILIKE %?1% OR author ILIKE %?1%",
            countQuery = "SELECT count(*) FROM books WHERE title ILIKE %?1% OR author ILIKE %?1%",
            nativeQuery = true)
    Page<Book> findByText(String text, Pageable pageable);
}
