import { ClearOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import classes from "./SearchInput.module.css";

interface Props {
    onSearch: (value: string) => void;
    onClear: () => void;
}

const SearchInput = ({ onSearch, onClear }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [searchText, setSearchTxt] = useState("");

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTxt(event.target.value);
    };

    const handleOnSearch = () => {
        if (searchText.length > 0) onSearch(searchText);
    };
    const handleOnClear = () => {
        setSearchTxt("");
        onClear();
    };

    const ClearSearchInputButton = () => {
        return (
            <InputAdornment position="end">
                <IconButton onClick={handleOnClear} color="error" size="small" disabled={searchText.length === 0}>
                    <ClearOutlined />
                </IconButton>
            </InputAdornment>
        );
    };

    return (
        <Box className={classes.searchContainer}>
            <TextField
                sx={{width: 280}}
                value={searchText}
                size="small"
                onChange={handleOnChange}
                variant="outlined"
                label={undefined}
                placeholder={t("COMMON.SEARCH_BOOKS_PLACEHOLDER").toString()}
                InputProps={{
                    endAdornment: <ClearSearchInputButton />,
                }}
            />
            <Button onClick={handleOnSearch} variant="contained">
                {t("COMMON.SEARCH_ACTION")}
            </Button>
        </Box>
    );
};

export default SearchInput;
