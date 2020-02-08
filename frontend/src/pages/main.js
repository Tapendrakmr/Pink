import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Typography, Button } from "@material-ui/core";
const styles = {
  form: {
    marginTop: "65px",
    textAlign: "center"
  },
  button: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};
class main extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    axios
      .get("/user")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    let userinfo = this.state.users ? (
      this.state.users.map(data => (
        <Profile key={data.userid} userdata={data} />
      ))
    ) : (
      <p>Loading ...</p>
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
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography variant="body2" align="center">
                Add New User
              </Typography>
              <div className={classes.button}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/user/newUser"
                >
                  Add
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {userinfo}
            <p>All user details</p>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(main);
