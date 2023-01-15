import Grid2 from "@mui/material/Unstable_Grid2";
import { translationPl } from "../../common/constants";
import PageSection from "../PageSection/PageSection";
import InstructionItem from "./InstructionItem/InstructionItem";

const instructionItems = translationPl.instructions;

const InstructionsSection = (): JSX.Element => {
    
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
