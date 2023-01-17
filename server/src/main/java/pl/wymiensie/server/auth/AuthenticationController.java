package pl.wymiensie.server.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
            throw new UserAlreadyExistsException("API.EMAIL_ALREADY_IN_USE");
        if (userService.findByName(request.getName()).isPresent())
            throw new UserAlreadyExistsException("API.NAME_ALREADY_IN_USE");
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody AuthenticationRequest request
    ) {
        if (userService.findByEmail(request.getEmail()).isEmpty())
            throw new ResourceNotFoundException("API.USER_WITH_EMAIL_NOT_FOUND");
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
