import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router";
import validator from "validator";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://FoodHub.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root1: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [status, registerStatus] = useState();
  const [success, setSuccess] = useState(false);

  const validateEmail = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      if (password === conPassword) {
        register(e);
      } else {
        registerStatus("Pasword should Match");
        window.scrollTo(0, 0);
      }
    } else {
      window.scrollTo(0, 0);
      registerStatus("Enter valid Email!");
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("dateee", date);
    try {
      Axios.post("http://localhost:4000/", {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Password: password,
        Date: date,
      })
        .then((response) => {
          window.scrollTo(0, 0);

          setSuccess(true);
        })
        .catch((error) => {
          window.scrollTo(0, 0);

          registerStatus(error.response.data.msg);
        });
    } catch (error) {
      window.scrollTo(0, 0);

      registerStatus(error.reponse.data.msg);
    }
  };

  return (
    <>
      {localStorage.getItem("user-auth-token") ? (
        <Redirect to="/dashboard" />
      ) : null}
      {success ? <Redirect to="/login" /> : null}

      <div className={classes.root1}>
        {status ? <Alert severity="error">{status}</Alert> : null}
      </div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastnamename"
                  label="Last Name"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="date"
                  id="firstname"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    setConPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={validateEmail}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
