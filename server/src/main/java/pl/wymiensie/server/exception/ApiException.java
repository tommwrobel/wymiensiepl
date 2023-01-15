package pl.wymiensie.server.exception;

import org.springframework.http.HttpStatus;

public record ApiException(String message, HttpStatus httpStatus) {
}
