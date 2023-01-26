
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BookResponse, useLazySearchBooksQuery } from "../../api/booksApi";
import PageSection from "../PageSection/PageSection";
import SearchInput from "./SearchInput/SearchInput";
import SearchResults from "./SearchInput/SearchResults/SearchResults";

interface SearchSectionProps {}

const SearchSection = ({}: SearchSectionProps): JSX.Element => {
    const { t } = useTranslation();

    const [text, setText] = useState("");
    const [books, setBooks] = useState<BookResponse[]>([]);

    useEffect(() => {
        const bks = JSON.parse(
            '[{"id":"20e66627-2490-4857-8e72-89411af0097c","title":"Pan Tadeusz","author":"Adam Mickiewicz","description":"Opis","publicationYear":2022,"numberOfPages":500,"coverPhoto":"book-covers/e89276ed-1fd2-4982-ab06-2bfef84e175f","status":"AVAILABLE","userId":"ae744fcd-0cb0-41ce-8f6c-4057cf52ede6"},{"id":"f20101c1-ab86-464f-9821-6e020d4600f6","title":"Chlopi","author":"Adam Mickiewicz","description":"Opisowy opis","publicationYear":2023,"numberOfPages":500,"coverPhoto":"book-covers/24e54eee-e650-4531-92b9-4ac496b5024a","status":"AVAILABLE","userId":"ae744fcd-0cb0-41ce-8f6c-4057cf52ede6"},{"id":"8f933856-bd18-469c-bb50-035f259a4392","title":"Tomek","author":"Tomasz Wróbel","description":"Opisowy opis","publicationYear":2025,"numberOfPages":123,"coverPhoto":"book-covers/2751d723-f0c1-4872-94c2-941de8d93d8b","status":"AVAILABLE","userId":"ae744fcd-0cb0-41ce-8f6c-4057cf52ede6"},{"id":"a57bb243-2527-4238-b62c-227c4aacfa43","title":"Pan Wołodyjowski","author":"Adam Mickiewicz","description":"Książka bardzo fajna, polecam, nowa!","publicationYear":1993,"numberOfPages":244,"coverPhoto":null,"status":"AVAILABLE","userId":"ae744fcd-0cb0-41ce-8f6c-4057cf52ede6"},{"id":"9a0028b7-d963-4c2c-b7aa-4c8c25a7754a","title":"Adrian","author":"adrian","description":"opisowy opis","publicationYear":129,"numberOfPages":193,"coverPhoto":null,"status":"AVAILABLE","userId":"3d60cd48-74eb-431c-bec6-8235f3f99f59"},{"id":"adbc4766-b6d3-4e74-bdde-82cbabd0acd4","title":"Pan Mateusz","author":"Adam Miskiewicz","description":"Opis","publicationYear":null,"numberOfPages":null,"coverPhoto":"book-covers/3895daf3-b7ef-4ecd-889b-f5c705b907e9","status":"AVAILABLE","userId":"3d60cd48-74eb-431c-bec6-8235f3f99f59"},{"id":"2fcb5576-323b-41e4-bfeb-b36662a649f6","title":"Tomek","author":"Adrian i Tomek","description":"Opisowy opis","publicationYear":1993,"numberOfPages":345,"coverPhoto":"book-covers/8a1618a8-92a8-4165-82ce-742f69b6a8d2","status":"AVAILABLE","userId":"ff9cff97-927e-42af-bea4-8ec104c98478"},{"id":"0389a90e-76c4-45cf-9312-f66738d47376","title":"Next","author":"Adrian","description":"Ksiazka o jezyku programowania.","publicationYear":2004,"numberOfPages":123,"coverPhoto":"book-covers/af0b7f9e-94fb-40ec-9ea4-1ae233e474da","status":"AVAILABLE","userId":"ff9cff97-927e-42af-bea4-8ec104c98478"}]'
        );
        setBooks(bks as BookResponse[]);
    }, []);

    const [searchBooks, searchBooksResult] = useLazySearchBooksQuery();

    const deb = useCallback(
        debounce((value) => searchBooks({ text: value }), 200),
        []
    );

    useEffect(() => {
        if (searchBooksResult.isSuccess && searchBooksResult.data) {
            setBooks(searchBooksResult.data);
        }
    }, [searchBooksResult.data, searchBooksResult.isSuccess]);

    const handleOnSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
        if (event.target.value.length > 0) deb(event.target.value);
    };

    const [renderResults, setRenderResults] = useState(false);
    document.body.style.overflow = 'hidden';
    return (
        <PageSection>
                <Box display="flex" flexDirection="column" minWidth="lg">
                <Grid2 container alignContent="center">
                    <Grid2
                        lg={6}
                        md={8}
                        sm={10}
                        xs={12}
                        mdOffset={2}
                        smOffset={1}
                        xsOffset={0}
                        lgOffset={3}
                    >
                        <SearchInput
                            value={text}
                            onFocus={() => {setRenderResults(true)}}
                            onChange={handleOnSearch}
                            numberOfResults={books.length}
                        />
                    </Grid2>
                </Grid2>
                {renderResults && <SearchResults books={books} />}
                </Box>
        </PageSection>
    );
};

export default SearchSection;
