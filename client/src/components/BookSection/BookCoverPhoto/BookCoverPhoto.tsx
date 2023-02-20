import { getAwsS3Url } from "../../../api/utils/getApiUrl";
import classes from "./BookCoverPhoto.module.css";

interface Props {
    coverPhoto?: string;
}

const BookCoverPhoto = ({ coverPhoto }: Props): JSX.Element => {
    const coverPhotoSrc = coverPhoto
        ? getAwsS3Url() + coverPhoto
        : "/book-img-placeholder.png";

    return (
        <img
            className={classes.coverPhoto}
            src={coverPhotoSrc}
            alt={coverPhotoSrc}
        />
    );
};

export default BookCoverPhoto;
