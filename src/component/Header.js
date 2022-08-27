import { AppBar, Toolbar, Typography } from "@mui/material";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import "./Header.scss";

export default function Header(props) {
    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <ThunderstormIcon/>
                <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}
                            className="title">
                    Actual Weather
                </Typography>
            </Toolbar>
        </AppBar>)
}
