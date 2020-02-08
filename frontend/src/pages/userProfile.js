import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { Card, Paper, Typography } from "@material-ui/core";

const style = {};
class userProfile extends Component {
  state = {
    user: null,
    id: this.props.match.params.email
  };

  componentDidMount() {
    const id = this.state.id;
    axios
      .get(`/user/${id}`)
      .then(res => {
        this.setState({
          user: res.data
        });
        console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    const userProfile = this.state.user ? (
      <Paper className={classes.Paper}>
        <div className="image">
          <img src="" alt="profile" className="imagecls" />
        </div>
        <div className={classes.profile}>
          <Typography>Name : {this.state.user.name}</Typography>
          <Typography>Email : {this.state.user.email}</Typography>
          <Typography>Age : {this.state.user.age}</Typography>
          <Typography>hobbies : {this.state.user.hobbies}</Typography>
          <Typography>Skills : {this.state.user.skills}</Typography>
          <Typography>Interest : {this.state.user.interest}</Typography>
        </div>
      </Paper>
    ) : (
      <p>Loding...</p>
    );
    return (
      <div>
        <Navbar />
        <Grid
          container
          justify="space-evenly"
          className={classes.form}
          spacing={3}
        >
          <Grid item xs />
          <Grid item xs>
            {userProfile}
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    );
  }
}

export default withStyles(style)(userProfile);
