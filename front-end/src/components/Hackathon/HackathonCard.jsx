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

const styles = {
  card: {
    maxWidth: 345,
    height:  450
  },
  media: {
    height: 140,
  },
  cardActionArea: {
    height: 450 
  },
};

let CardHackathon = (props) => {

  const { classes } = props;
  const description = props.data.description.length < 150 ? props.data.description : props.data.description.slice(0, 150) + '...'
  return (
    <Card className={classes.card}>
      <ButtonBase onClick={() => { navigate(`/hackathons/details/${props.data.id}`) }}>
        <CardActionArea >
          <CardHeader title={
            <Typography gutterBottom variant="h5" component="h2">
              <strong>{props.data.name}</strong>
            </Typography>}
          />
          <CardMedia
            className={classes.media}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N8XJovpunyzfzzKGpx1298XWO2TNUpyNcL98HfEJsEM2OG-1"
            title="Contemplative Reptile"
          />
          <CardContent pt={2}>
            <Typography component="p">
              <strong>Description:</strong>{description}
            </Typography>
          </CardContent>
          <Box fontWeight="fontWeightBold" pb={2} pl={2}>
            Participants: {props.data.participants.length}
          </Box>
        </CardActionArea>
      </ButtonBase>
    </Card>
  );
}

CardHackathon.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user
})
CardHackathon = connect(mapStateToProps, undefined)(CardHackathon);
export default withStyles(styles)(CardHackathon);