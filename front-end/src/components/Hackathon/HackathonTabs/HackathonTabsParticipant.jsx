import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import HackathonInfo from '../HackathonInfo'
import TermsCollapseList from '../../Terms/TermsCollapseList';
import AwardsCollapseList from '../../Awards/AwardsCollapseList';
import Hidden from '../../hidden'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const checkUserIsInSquad = ({ user, hackathon }) => {
  return user.squads.filter(squad => squad.hackathon.id === hackathon.id).length > 0
}

const HackathonTabsParticipant = (props) => {
  let isInSquad = false;
  if (props.hackathon) isInSquad = checkUserIsInSquad(props)
  let disableAward = props.hackathon.award.length === 0
  let disableTerm = props.hackathon.terms.length === 0
  let isSubscribe = props.hackathon.participants.filter(participant => participant.id === props.user.id).length > 0
  useEffect(() => {
    isSubscribe = props.hackathon.participants.filter(participant => participant.id === props.user.id).length > 0
    disableAward = props.hackathon.award.length === 0
    disableTerm = props.hackathon.terms.length === 0
    if (props.hackathon) isInSquad = checkUserIsInSquad(props)
  }, [props.hackathon])
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label=""
        >
          <Tab label="info" {...a11yProps(0)} />
          <Tab disabled={!isSubscribe} label="Squad" {...a11yProps(1)} />
          <Tab label="Score" {...a11yProps(2)} />
          <Tab disabled={disableTerm} label="Terms" {...a11yProps(3)} />
          <Tab disabled={disableAward} label="Awards" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HackathonInfo {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Hidden hidden={!isInSquad}>
          isInQuad
        </Hidden>
        <Hidden hidden={isInSquad}>
          Squad
        </Hidden>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Score
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TermsCollapseList {...props} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AwardsCollapseList {...props} />
      </TabPanel>
    </div>
  );
}

const mapStateToProps = state => ({
  hackathon: state.hackathon.hackathon,
  user: state.user.user
})
export default connect(mapStateToProps, undefined)(HackathonTabsParticipant)
