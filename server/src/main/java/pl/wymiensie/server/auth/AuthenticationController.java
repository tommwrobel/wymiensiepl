package pl.wymiensie.server.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wymiensie.server.exception.UserAlreadyExistsException;
import pl.wymiensie.server.exception.ResourceNotFoundException;
import pl.wymiensie.server.service.UserService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        if (userService.findByEmail(request.getEmail()).isPresent())
            throw new UserAlreadyExistsException("User with given e-mail address already exists.");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ) {
        if (userService.findByEmail(request.getEmail()).isEmpty())
            throw new ResourceNotFoundException("User with given e-mail address not found.");
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
