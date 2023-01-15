import { Container } from "@mui/material";

interface PageSectionProps {
    children: React.ReactNode;
    backgroundColor?: string;
    padding?: string;
}

const PageSection = ({children, backgroundColor, padding}: PageSectionProps): JSX.Element => {
    return (
        <Container maxWidth={false} sx={{ padding: padding || "90px 15px", backgroundColor: backgroundColor || "#ffffff" }}>
            <Container fixed>
                {children}
            </Container>
        </Container>
    );
}

export default PageSection;
