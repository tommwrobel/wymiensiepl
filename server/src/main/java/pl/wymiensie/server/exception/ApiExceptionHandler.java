package pl.wymiensie.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {ApiRequestException.class})
    public ResponseEntity<Object> handleApiRequestException(ApiRequestException e) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(e.getMessage(), httpStatus);
    }

    @ExceptionHandler(value = {ResourceNotFoundException.class})
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException e) {
        HttpStatus httpStatus = HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(e.getMessage(), httpStatus);
    }

    @ExceptionHandler(value = {UserAlreadyExistsException.class})
    public ResponseEntity<Object> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        HttpStatus httpStatus = HttpStatus.CONFLICT;
        return new ResponseEntity<>(e.getMessage(), httpStatus);
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    public ResponseEntity<Object> handleAuthenticationException(AuthenticationException e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        String message = "API.BAD_CREDENTIALS";
        return new ResponseEntity<>(message, httpStatus);
    }

    @ExceptionHandler(value = {UserNotPermittedException.class})
    public ResponseEntity<Object> handleUserNotPermittedException(UserNotPermittedException e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        return new ResponseEntity<>(e.getMessage(), httpStatus);
    }
}
