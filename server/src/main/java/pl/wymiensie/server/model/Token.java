package pl.wymiensie.server.model;

public record Token(String body, long expiresIn) {
}
