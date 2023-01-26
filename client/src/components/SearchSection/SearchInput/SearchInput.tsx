import { SearchRounded } from "@mui/icons-material";
import {
    Chip,
    InputAdornment,
    StandardTextFieldProps,
    TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface SearchInputProps extends StandardTextFieldProps {
    numberOfResults: number;
}

const SearchInput = ({
    numberOfResults,
    ...props
}: SearchInputProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <TextField
            {...props}
            size="medium"
            type="text"
            variant="outlined"
            placeholder={t("COMMON.SEARCH_BOOKS_ACTION").toString()}
            InputProps={{
                notched: false,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchRounded />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Chip
                            size="small"
                            color={numberOfResults > 0 ? "primary" : "default"}
                            label={t("COMMON.RESULTS_NUMBER", {
                                number: numberOfResults,
                            })}
                        />
                    </InputAdornment>
                ),
            }}
            fullWidth
            style={{ zIndex: 99 }}
        />
    );
};

export default SearchInput;
