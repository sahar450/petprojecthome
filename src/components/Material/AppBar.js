import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import Txt from './Typo';
import { Notification, menu, cost, chart, calendar, info, pet, user, home } from '../../assets/Icon/Icon';
import userImage from '../../assets/image/83a0089e75cdbd7b546b5d540419337b9f0455bc.png';
import { Link } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
    { text: 'خانه', icon: home, href: '/Veterinarian' },
    { text: ' کاربران', icon: user, href: '/Editversion' },
    { text: 'پت ها', icon: pet, href: '/Supervisor' },
    { text: 'نسخه ها', icon: info, href: '/Petfriend' },
    { text: 'ملاقات ها', icon: calendar, href: '/MeetingsPage' },
    { text: 'گزارشات مالی', icon: chart, href: '/MeetingsPage' },
    { text: 'تعرفه', icon: cost, href: '/admin' },
];

const HeaderMain = styled(AppBar)(({ theme }) => ({
    backgroundColor: "#FBFBFB",
    borderRadius: "20px",

    boxShadow: "none",
    display: "flex",
    justifyContent: "space-between",
    direction: "rtl",
    padding: "16px 0",
    right: "auto",
    position: "relative !important",
}));

const Tolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    direction: "rtl",
    padding: "0 16px",
    minHeight: '0 !important',
    height: 'auto',
}));

const ProfileIconBox = styled(Box)(({ theme }) => ({
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#CDDDE0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

function DrawerAppBar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(prev => !prev);
    };

    const drawer = (
        <Box sx={{
            textAlign: 'center',
            position: "relative",
            height: "100%",
            bgcolor: "#00796B",
            color: "#fff",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            p: 2
        }}>
            <IconButton
                onClick={handleDrawerToggle}
                sx={{ position: "absolute", left: 8, top: 8, color: "#fff" }}
            >
                <CloseIcon />
            </IconButton>



            <List sx={{ marginTop: "56px" }}
            >
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={Link}        
                            to={item.href}          
                            onClick={handleDrawerToggle}
                            sx={{
                                borderRadius: "12px",
                                px: 2,
                                py: 1.5,
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    color: "#E0F2F1",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                {item.icon}
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: "15px", fontWeight: 500 }}
                                />
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', direction: "rtl" }}>
            <CssBaseline />
            <HeaderMain >
                <Tolbar disableGutters>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' }, color: "#000", p: "0px" }}
                    >
                        {menu || <MenuIcon />}
                    </IconButton>

                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center" }}>
                        <ProfileIconBox>
                            <Txt mypadding="10px">لوگو</Txt>
                        </ProfileIconBox>
                        <Txt mycolor="#889FA0" mymargin="0px 8px 0px 0px" mysize="16px">
                            اسمارت وت
                        </Txt>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {Notification}
                        <Box sx={{
                            width: "1px",
                            height: "24px",
                            backgroundColor: "#CDDDE0",
                            mx: 2
                        }} />
                        <Box sx={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            ml: "8px"
                        }}>
                            <img src={userImage} alt="user" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Box>
                        <Box>
                            <Txt mycolor="#627B7C" mysize="14px" myweight="500">
                                امین جعفرزاده
                            </Txt>
                            <Box>
                                <Txt mycolor="#AFC1C4" mysize="12px" myweight="300">
                                    مدیر
                                </Txt>
                            </Box>
                        </Box>
                    </Box>
                </Tolbar>
            </HeaderMain>

            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    anchor="right"
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: "transparent",
                            overflow: "hidden",
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
