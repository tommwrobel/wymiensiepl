package pl.wymiensie.server.exception;

public class UserNotPermittedException extends RuntimeException {

    public UserNotPermittedException(String message) {
        super(message);
    }
}
