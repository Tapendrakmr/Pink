import React, { Component } from "react";
import Navbar from "../components/Navbar";
import user from "../images/user.jpg";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// materialui
import Grid from "@material-ui/core/Grid";
import { Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center",
    margin: "80px"
  },
  image: {
    margin: "20px auto 20px auto",
    height: "70px",

    borderRadius: "40%"
  },
  pageTittle: {
    color: "#616161",
    fontFamily: "-apple-system",

    margin: "10px auto 10px auto"
  },
  customError: {
    color: "Red"
  },
  textField: {
    margin: "5px"
  },
  button: {
    margin: "10px"
  }
};
class newUser extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      interest: "",
      skills: "",
      hobbies: "",
      age: "",
      email: "",
      errors: {},
      loading: false
      // imageInput: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const user = {
      name: this.state.name,
      interest: this.state.interest,
      skills: this.state.skills,
      hobbies: this.state.hobbies,
      age: this.state.age,
      email: this.state.email
    };
    // console.log(user);
    axios
      .post("/user/newUser", user)
      .then(res => {
        this.setState({
          loading: false
        });
        console.log(res);
        this.props.history.push("/user");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
        console.log(err + "error");
      });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <div>
        <Navbar />
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={user} alt="travel" className={classes.image} />
            <Typography variant="h2" className={classes.pageTittle}>
              Add profile
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              {/* <div className={classes.image}>
                <input type="file" id="imageInput" name="imageInput" />
                <Typography variant="body2">
                  <p>Add Image</p>
                </Typography>
              </div> */}

              <TextField
                id="name"
                name="name"
                type="text"
                label="Name"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.name}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="interest"
                name="interest"
                type="text"
                label="Interest"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.interest}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="skills"
                name="skills"
                type="text"
                label="Skills"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.skills}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="hobbies"
                name="hobbies"
                type="text"
                label="Hobbies"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.hobbies}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="age"
                name="age"
                type="number"
                label="Age"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.age}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.name}
                error={errors.name ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add
                {loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
            </form>
          </Grid>

          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(newUser);
