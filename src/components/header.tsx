import {AppBar, Box, Button, Toolbar, useMediaQuery} from "@mui/material";
import {type AppType} from "@/utils/types";
import {type NextRouter, useRouter} from "next/router";
import Link from "next/link";
import {useMemo} from "react";

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

    const isSmOrLower = useMediaQuery(theme => {
        return theme.breakpoints.down("sm");
    })

    const buttonSize = useMemo(() => {
        if (isSmOrLower) {
            return "small";
        } else {
            return "medium";
        }
    }, [isSmOrLower])

    return (
        <AppBar>
            <Toolbar>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: {
                        xl: "50svw",
                        lg: "50svw",
                        md: "60svw",
                        sm: "90svw",
                        xs: "100svw",
                    },
                    mx: "auto",
                    gap: 2
                }}>
                    <Link href={"/picshare"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "picshare")} size={buttonSize}>
                            PicShare
                        </Button>
                    </Link>
                    <Link href={"/musicbox"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "musicbox")} size={buttonSize}>
                            MusicBox
                        </Button>
                    </Link>

                    <Link href={"/molegame"} style={{textDecoration: "none"}}>
                        <Button variant={getType(router, "molegame")} size={buttonSize}>
                            MoleGame
                        </Button>
                    </Link>

                </Box>
            </Toolbar>
        </AppBar>
    )

}