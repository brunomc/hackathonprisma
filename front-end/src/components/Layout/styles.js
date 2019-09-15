const drawerWidth = 240;
export const styles = (theme, withMenu, colors, logoStyle, paddinTopMenu, backgroundColor) => {
    return {
        root: {
            display: 'flex',
            backgroundColor: backgroundColor,
            height: '100vh'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: colors.appBar
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
            color: colors.menuButton
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: !withMenu ? 0 : drawerWidth,
            paddingLeft: theme.spacing(1),
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: colors.menu,
            color: colors.textMenuOnDrawerOpen
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: !withMenu ? '0px' : theme.spacing(9) + 1,
            },
            paddingLeft: !withMenu ? '0px' : theme.spacing(1),
            backgroundColor: colors.menu,
            color: colors.textMenuOnDrawerClose
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            paddingTop: paddinTopMenu
        },
        logoStyle: logoStyle,
        paddinTopMenu: {
            paddingTop: paddinTopMenu
        }
    }
}
