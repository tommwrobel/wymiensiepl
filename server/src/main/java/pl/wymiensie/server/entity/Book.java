package pl.wymiensie.server.entity;

import com.fasterxml.jackson.annotation.*;
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

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("userId")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    private String title;

    private String author;

    private String description;

    private int publicationYear;

    private int numberOfPages;

    private String coverPhoto;

    @Enumerated(EnumType.STRING)
    private BookStatus status;
}
