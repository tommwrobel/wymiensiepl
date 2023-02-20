import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useGetBookQuery } from "../../api/booksApi";
import { useLazyGetUserQuery } from "../../api/usersApi";
import { customColors } from "../../config/theme";
import { Book, Maybe, User } from "../../models/app.models";
import PageSection from "../PageSection/PageSection";
import BookActions from "./BookActions/BookActions";
import BookCoverPhoto from "./BookCoverPhoto/BookCoverPhoto";
import BookInfo from "./BookInfo/BookInfo";

const BookSection = (): JSX.Element => {
    const { bookId } = useParams();
    const [book, setBook] = useState<Maybe<Book>>();
    const [bookUser, setBookUser] = useState<Maybe<User>>();

    const getBookQuery = useGetBookQuery({ bookId: bookId as string });
    const [getUserTrigger, getUserQuery] = useLazyGetUserQuery();

    useEffect(() => {
        if (getBookQuery.isSuccess && getBookQuery.data) {
            setBook(getBookQuery.data);
            getUserTrigger({ userId: getBookQuery.data.userId });
        }
    }, [getBookQuery.data, getBookQuery.isSuccess, getUserTrigger]);

    useEffect(() => {
        if (getUserQuery.isSuccess && getUserQuery.data) {
            setBookUser(getUserQuery.data);
        }
    }, [getUserQuery.data, getUserQuery.isSuccess]);

    return (
        <PageSection background="darkGrey">
            {book && bookUser && (
                <Grid container spacing={5}>
                    <Grid md={false}>
                        <BookCoverPhoto coverPhoto={book.coverPhoto} />
                    </Grid>
                    <Grid md={5}>
                        <BookInfo book={book} />
                    </Grid>
                    <Grid md={1}>
                        <Box
                            style={{
                                width: 1,
                                height: "100%",
                                background: "#555",
                            }}
                        ></Box>
                    </Grid>
                    <Grid md={true}>
                        <BookActions user={bookUser} bookId={book.id} />
                    </Grid>
                </Grid>
            )}
        </PageSection>
    );
};

export default BookSection;
