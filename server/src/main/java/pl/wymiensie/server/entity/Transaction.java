package pl.wymiensie.server.entity;

        import com.fasterxml.jackson.annotation.*;
        import jakarta.persistence.*;
        import jakarta.validation.constraints.NotNull;
        import lombok.AllArgsConstructor;
        import lombok.Builder;
        import lombok.Data;
        import lombok.NoArgsConstructor;
        import pl.wymiensie.server.model.TransactionStatus;

        import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="transactions")
public class Transaction {
    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "proposal_book_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("proposalBookId")
    @JsonIdentityReference(alwaysAsId = true)
    private Book proposalBook;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "proposal_user_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("proposalUserId")
    @JsonIdentityReference(alwaysAsId = true)
    private User proposalUser;

    @ManyToOne
    @JoinColumn(name = "accepted_book_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("acceptedBookId")
    @JsonIdentityReference(alwaysAsId = true)
    private Book acceptedBook;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "accepted_user_id", referencedColumnName = "id")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonProperty("acceptedUserId")
    @JsonIdentityReference(alwaysAsId = true)
    private User acceptedUser;

    @NotNull
    private TransactionStatus status;
}

