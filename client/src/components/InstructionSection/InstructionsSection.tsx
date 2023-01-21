import Grid2 from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";
import PageSection from "../PageSection/PageSection";
import InstructionItem from "./InstructionItem/InstructionItem";

const InstructionsSection = (): JSX.Element => {

    const { t } = useTranslation();

    const instructionItems = [
        t("SECTIONS.INSTRUCTIONS.STEP_1"),
        t("SECTIONS.INSTRUCTIONS.STEP_2"),
        t("SECTIONS.INSTRUCTIONS.STEP_3"),
        t("SECTIONS.INSTRUCTIONS.STEP_4"),
    ];
    
    return (
        <PageSection backgroundColor="#f3f3f3">
            <Grid2 container spacing={2}>
                {instructionItems.map((instructionItem, index) => (
                    <InstructionItem
                        key={index}
                        number={index + 1}
                        text={instructionItem}
                    />
                ))}
            </Grid2>
        </PageSection>
    );
};

export default InstructionsSection;
