package pl.wymiensie.server.model;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class PagedResponse<T> extends ResponseEntity<PagedResponseBody<T>> {

    public PagedResponse(T body, PageInfo pageInfo, HttpStatusCode status) {
        super(new PagedResponseBody<T>(body, pageInfo), status);
    }

    public static <T> PagedResponse<T> transformResponse(Page<T> page) {
        PageInfo pageInfo = new PageInfo(page.getTotalPages(), page.getNumberOfElements(), page.getNumber(), page.getTotalElements());
        List<T> pageContent = page.getContent();
        return new PagedResponse(pageContent, pageInfo, HttpStatus.OK);
    }
}
