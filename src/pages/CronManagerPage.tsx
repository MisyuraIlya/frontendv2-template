import { Box } from "@mui/material";
import CronManager from "../components/CronManager";
const CronManagerPage = () => {
    return (
        <Box>
            <CronManager.Options/>
            <CronManager.List/>
        </Box>
    );
};

export default CronManagerPage;