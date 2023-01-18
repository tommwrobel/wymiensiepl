package pl.wymiensie.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.wymiensie.server.model.BookStatus;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String title;

    private String description;

    private long isbn;

    private int publicationYear;

    private int numberOfPages;

    private String coverImg;

    @Enumerated(EnumType.STRING)
    private BookStatus status;
}
