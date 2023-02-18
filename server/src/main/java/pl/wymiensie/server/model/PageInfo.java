package pl.wymiensie.server.model;

public record PageInfo(int totalPages, int numberOfElements, int currentPage, long totalElements) {
}
