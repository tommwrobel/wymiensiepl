package pl.wymiensie.server.exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
    public ResourceNotFoundException() {
        super("API.RESOURCE_NOT_FOUND");
    }
}
