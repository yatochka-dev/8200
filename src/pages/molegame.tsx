import {Box} from "@mui/material";
import {TextEmbed} from "@/components/TextEmbed";


export default function Molegame() {


    return (
        <Box sx={{
            width: "100%",
            height: "calc(100svh - 64px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <TextEmbed text={"Mole Game"}/>
        </Box>
    )

}