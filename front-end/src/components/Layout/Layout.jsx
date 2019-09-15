import React, { useState } from 'react';
import clsx from 'clsx';
import { styles } from './styles';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { getUserByToken } from '../../graphql/mutations/user'
import { bindActionCreators } from 'redux'
import { checkToken } from '../../duck/actions/authAction'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import { logout } from '../../duck/actions/authAction'
//import { menus, withMenu, textTopMenu } from '../../config/menus';
//import { withAppBar } from '../../config/appBar';

export function Layout(props) {
    const { withAppBar, menus, withMenu, textTopMenu, colors, content, logo, logoStyle, logoTxt, paddinTopMenu, backgroundColor, withLogout } = props;
    const useStyles = makeStyles(theme => styles(theme, withAppBar, colors, logoStyle, paddinTopMenu, backgroundColor));
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState({
        Inbox: false
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }
    const handleSubmenu = (pressed) => {
        setOpenSubmenu({
            ...openSubmenu,
            [pressed]: !openSubmenu[pressed]
        })
        menus.map(menu => {
            if (menu.name == pressed && menu.url !== '' && menu.submenus.length === 0) {
                navigate(menu.url)
            }
        })
        return true;
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            {withAppBar ?
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        {menus.length && withMenu > 0 ?
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            :
                            <React.Fragment />
                        }
                        <Typography variant="h6" noWrap>
                            {logo ? <React.Fragment>
                                <img alt={logoTxt} className={classes.logoStyle} src={logo} />
                            </React.Fragment>
                                : logoTxt}
                        </Typography>
                        {withLogout ?
                            <Button color="inherit" onClick={() => props.logout()}>Logout</Button>
                            :
                            <React.Fragment />
                        }

                    </Toolbar>
                </AppBar>
                :
                <React.Fragment />
            }

            {menus.length && withMenu > 0 ?
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <Typography >{textTopMenu}</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />

                    <List className={classes.paddinTopMenu}>
                        {
                            menus.map((menu, key) => {

                                return (
                                    <React.Fragment key={menu.key}>
                                        <ListItem button onClick={() => { handleSubmenu(menu.name) }} >
                                            <ListItemIcon><Icon>{menu.icon}</Icon></ListItemIcon>
                                            <ListItemText primary={menu.name} />
                                        </ListItem>
                                        <React.Fragment>
                                            {menu.submenus.map((submenu, key) => {
                                                return (
                                                    <Collapse in={openSubmenu[menu.name]} timeout="auto" unmountOnExit key={submenu.name}>
                                                        <List component="div" style={{ paddingLeft: submenu.padding }}>
                                                            <ListItem button onClick={() => { navigate(submenu.url) }} className={classes.nested}>
                                                                <ListItemIcon>
                                                                    <Icon>{submenu.icon}</Icon>
                                                                </ListItemIcon>
                                                                <ListItemText primary={submenu.name} />
                                                            </ListItem>
                                                        </List>
                                                    </Collapse>
                                                );
                                            })
                                            }
                                        </React.Fragment>

                                    </React.Fragment>
                                )
                            })
                        }
                    </List>
                </Drawer>
                :
                <React.Fragment />
            }

            <main className={classes.content}>
                <div className={classes.toolbar} />
                {content}
            </main>
        </div>
    );
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Layout)



