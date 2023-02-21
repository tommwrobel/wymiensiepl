package pl.wymiensie.server.exception;

public class UserNotPermittedException extends RuntimeException {

    public UserNotPermittedException() {
        super("API.USER_NOT_PERMITTED");
    }
}
