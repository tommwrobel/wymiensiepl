import { Backdrop, Container, LinearProgress } from "@mui/material";
import { customColors, themeColor } from "../../config/theme";

interface PageSectionProps {
    children: React.ReactNode;
    background?: themeColor;
    padding?: string;
    sectionId?: string;
    isLoading?: boolean;
}

const PageSection = ({
    children,
    background = "white",
    padding,
    sectionId,
    isLoading,
}: PageSectionProps): JSX.Element => {
    return (
        <div id={sectionId}>
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "rgba(255,255,255,0.7)",
                        zIndex: 999,
                    }}
                >
                    <LinearProgress />
                </div>
            )}
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
