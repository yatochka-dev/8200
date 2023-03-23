import {AppBar, Box, Button, Toolbar} from "@mui/material";
import {type AppType} from "@/utils/types";
import {type NextRouter, useRouter} from "next/router";
import Link from "next/link";

function isActive(router: NextRouter, name: AppType) {
    return router.pathname === `/${name}`;
}

function getType(router: NextRouter, name: AppType) {
    if (isActive(router, name)) {
        return "contained";
    } else {
        return "outlined";
    }
}

export default function Header() {
    const router = useRouter();

    function handleClick(name: AppType) {

        return () => {
            router.push(`/${name}`).catch(console.log);
        }

    }

    const buttonStyles = {
        textDecoration: "none !important",
    }

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50vw",
                    mx: "auto"
                }}>
                    <Link href={"/picshare"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "picshare")}>
                            PicShare
                        </Button>
                    </Link>
                    <Link href={"/musicbox"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "musicbox")}>
                            MusicBox
                        </Button>
                    </Link>

                    <Link href={"/molegame"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "molegame")}>
                            MoleGame
                        </Button>
                    </Link>

                </Box>
            </Toolbar>
        </AppBar>
    )

}