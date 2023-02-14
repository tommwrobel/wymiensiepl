package pl.wymiensie.server.model;

public record PagedResponseBody<T>(T body, PageInfo pageInfo) {
}
