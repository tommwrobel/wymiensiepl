import { Container } from "@mui/material";

interface PageSectionProps {
    children: React.ReactNode;
    backgroundColor?: string;
    padding?: string;
    sectionId?: string;
}

const PageSection = ({children, backgroundColor, padding, sectionId}: PageSectionProps): JSX.Element => {
    return (
        <div id={sectionId}>
            <Container maxWidth={false} sx={{ padding: padding || "90px 15px", backgroundColor: backgroundColor || "#ffffff" }}>
                <Container fixed>
                    {children}
                </Container>
            </Container>
        </div>
    );
}

export default PageSection;
