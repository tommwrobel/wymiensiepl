import { Container } from "@mui/material";
import { customColors, themeColor } from "../../config/theme";

interface PageSectionProps {
    children: React.ReactNode;
    background?: themeColor;
    padding?: string;
    sectionId?: string;
}

const PageSection = ({
    children,
    background = "white",
    padding,
    sectionId,
}: PageSectionProps): JSX.Element => {
    return (
        <div id={sectionId}>
            <Container
                maxWidth={false}
                sx={{
                    padding: padding || "90px 15px",
                    backgroundColor: customColors[background],
                }}
            >
                <Container fixed>{children}</Container>
            </Container>
        </div>
    );
};

export default PageSection;
