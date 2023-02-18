import BookList from "../../components/BookList/BookList";
import PageSection from "../../components/PageSection/PageSection";
import { Book } from "../../models/app.models";

const TestPage = (): JSX.Element => {
    const books: Book[] = [
        {
            id: "123dsadd2d2",
            title: "Pan Tadeusz",
            author: "Adam Mickiewicz",
            description:
                "Lorem ipsum dolor sit amet lorem ipsum dolor opis ksiazki dluzszy niz iles tam slow.",
            numberOfPages: 345,
            publicationYear: 2022,
            userId: "2314",
        },
        {
            id: "123dsdasdffdd2d2",
            title: "Pan Tadeusz",
            author: "Adam Mickiewicz",
            description:
                "Lorem ipsum dolor sit amet lorem ipsum dolor opis ksiazki dluzszy niz iles tam slow.",
            numberOfPages: 345,
            publicationYear: 2022,
            userId: "2314",
        },
        {
            id: "123ds234dadd2d2",
            title: "Pan Tadeusz",
            author: "Adam Mickiewicz",
            description:
                "Lorem ipsum dolor sit amet lorem ipsum dolor opis ksiazki dluzszy niz iles tam slow dv dsvsdfds sd sd sd sd.",
            numberOfPages: 345,
            publicationYear: 2022,
            userId: "2314",
        },
        {
            id: "123dsdaxcdd2d2",
            title: "Pan Tadeusz",
            author: "Adam Mickiewicz",
            description:
                "Lorem ipsum dolor sit amet lorem ipsum dolor opis ksiazki dluzssdfasdf ds fasd fsd fdsfzy niz iles tam slow.",
            numberOfPages: 345,
            publicationYear: 2022,
            userId: "2314",
        },
        {
            id: "123dsdasdfdd2d2",
            title: "Pan Tadeusz",
            author: "Adam Mickiewicz",
            description:
                "Lorem ipsum dolor sit amet lorem ipsum dolor opis ksiazki dluzszy niz iles tam slow.",
            numberOfPages: 345,
            publicationYear: 2022,
            userId: "2314",
        },
    ];

    return (
        <PageSection>
            <BookList books={books} />
        </PageSection>
    );
};

export default TestPage;
