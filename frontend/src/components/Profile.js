import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import { CardHeader, CardContent, Typography } from "@material-ui/core";
const style = {};
class Profile extends Component {
  render() {
    const {
      userdata: { name, age, email, hobbies, interest, skills },
      classes
    } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography varint="h5" component={Link} to={`user/${email}`}>
              {name}
            </Typography>
            <Typography varint="body1" color="textSecondary">
              {email}
            </Typography>
            <Card>
              <Typography variant="body2">Age :{age}</Typography>
              <Typography variant="body2">Hobbies :{hobbies}</Typography>
              <Typography variant="body2">Skills : {skills}</Typography>
              <Typography variant="body2">Interset :{interest}</Typography>
            </Card>
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default withStyles(style)(Profile);
