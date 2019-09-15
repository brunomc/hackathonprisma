import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import { navigate } from 'hookrouter';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

const styles = {

};

let CardHackathonTerm = (props) => {
  const { classes } = props;
  const content = props.termProps.content.length < 150 ? props.termProps.content : props.termProps.content.slice(0, 150) + '...'
  return (
    <React.Fragment>
        <Box component="div" display="flex" flexDirection="row" justifyContent="space-between"  m={2} >
          <Box display="flex"  justifyContent="center" m={2} >
          </Box>
          <Box display="flex"  justifyContent="center" m={2}>
            <h1>{props.termProps.name}</h1>
          </Box>
          <Box display="flex"  justifyContent="center" m={2} >
            <IconButton color="inherit" onClick={() => { 
                props.setTerm(props.termProps);
                props.setViewTerm('edit');
            }}><EditOutlinedIcon fontSize="large"/></IconButton>
            <IconButton color="inherit" onClick={()=>{}} >
              <DeleteOutlineOutlinedIcon fontSize="large"/>
            </IconButton>
        </Box>
        </Box>
        <Divider /> 
   </React.Fragment>
  );
}

CardHackathonTerm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user
})
CardHackathonTerm = connect(mapStateToProps, undefined)(CardHackathonTerm);
export default withStyles(styles)(CardHackathonTerm);