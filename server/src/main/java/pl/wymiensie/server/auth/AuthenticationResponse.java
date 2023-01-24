package pl.wymiensie.server.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.wymiensie.server.entity.User;
import pl.wymiensie.server.model.Token;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private User user;
    private Token token;
}
