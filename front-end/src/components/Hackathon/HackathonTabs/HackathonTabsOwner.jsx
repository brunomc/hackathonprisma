import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import HackathonEdit from '../HackathonEdit/HackathonEdit';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HackathonTermList from '../HackathonTermEdit/HackathonTermList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPanel: {
    width: '70vw'
  }
}));

export default function HackathonTabsOwner() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        fullWidth={true}
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Horizontal tabs example"
        className={classes.tabs}
      >
        <Tab label="Edit" {...a11yProps(0)} />
        <Tab label="Squads" {...a11yProps(1)} />
        <Tab label="Terms" {...a11yProps(2)} />
        <Tab label="Awards" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <HackathonEdit />
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HackathonTermList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Awards
      </TabPanel>
    </div>
  );
}