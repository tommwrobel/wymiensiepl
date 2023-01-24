package pl.wymiensie.server.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
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

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("userId")
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @NotNull
    private String title;

    @NotNull
    private String author;

    private String description;

    private Integer publicationYear;

    private Integer numberOfPages;

    private String coverPhoto;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BookStatus status;
}
