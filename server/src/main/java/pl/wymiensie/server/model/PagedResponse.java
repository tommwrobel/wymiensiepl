package pl.wymiensie.server.model;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public class PagedResponse<T> extends ResponseEntity<PagedResponseBody<T>> {

    public PagedResponse(T body, PageInfo pageInfo, HttpStatusCode status) {
        super(new PagedResponseBody<T>(body, pageInfo), status);
    }
}
