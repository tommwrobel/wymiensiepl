import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { BookResponse, useGetUserBooksQuery } from "../../api/booksApi";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";
import { AuthContext } from "../../context/AuthContext";

const MyLibraryPage = (): JSX.Element => {
    const { isLoggedUser, user } = useContext(AuthContext);

    const books = useGetUserBooksQuery(
        { userId: user?.id || "" },
        {
            skip:!isLoggedUser(),
        }
    );

    const awsUrl = process.env.REACT_APP_AWS_IMG_URL;

    const printBook = (book: BookResponse) => {
        return (
            <Box padding={2} marginBottom={2} style={{ border: "solid 1px #888"}} display="flex" justifyContent="space-between">
                <div>
                <Typography variant="h5">{book.title}</Typography>
                <Typography paddingBottom={2} variant="body2">{book.author}</Typography>
                <Typography paddingBottom={2} variant="body2">{book.description}</Typography>
                </div>
                <div>
                {book.coverPhoto && <img width={100} height={100} src={awsUrl + book.coverPhoto} alt="d" />}
                </div>
            </Box>
        );
    };

    return (
        <>
        <ApplicationBar openLoginModal={function (): void {
          throw new Error("Function not implemented.");
        } } openRegistrationModal={function (): void {
          throw new Error("Function not implemented.");
        } } openAddBookModal={function (): void {
          throw new Error("Function not implemented.");
        } } />
            <Box padding={10}>
                {books &&
                    books.data &&
                    books.data?.map((book) => printBook(book))}
            </Box>
        </>
    );
};

export default MyLibraryPage;
