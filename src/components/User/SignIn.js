import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux'
import { loginUser, clearIsUserLoading } from '../../actions/users'
import { clearErrors } from '../../actions/errors'
import { Redirect } from "react-router";
import Copyright from '../Layout/Copyright'
import Errors from '../Layout/Errors'
import SignInImage from '../../assets/images/sign in open.jpeg'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
            marginTop: "-2em"
        }
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    loader: {
        margin: 'auto',
        padding: '5em',
    },
    header: {
        padding: '1em'
    },
    progressBar: {
        margin: "auto",
        width: "15em",
        height: "1.5em",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        [theme.breakpoints.down('xs')]: {
            width: "10em"
        },
    }
}));

function SignIn(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearErrors())
        dispatch(clearIsUserLoading())
    }, [dispatch])

    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        props.loginUser(user)
        setUsername('')
        setPassword('')
    }

    if (props.loggedIn === true) {
        return (
            <Redirect to="/" />
        )
    } else if (props.errors) {
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={7} className={classes.image} style={{ backgroundImage: `url("${SignInImage}")` }} />
                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Have an account? Sign in below
                        </Typography>
                        <Errors />
                    </div>
                </Grid>
            </Grid>
        )
    } else if (props.loadingUser) {
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={7} className={classes.image} style={{ backgroundImage: `url("${SignInImage}")` }} />
                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Have an account? Sign in below
                        </Typography>
                        <div className={classes.loader}>
                            <Typography className={classes.header}>
                                Logging in...
                            </Typography>
                            <LinearProgress className={classes.progressBar} color="secondary" />
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    } else {
        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={12} md={7} className={classes.image} style={{ backgroundImage: `url("${SignInImage}")` }} />
                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Have an account? Sign in below
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={e => handleLogin(e)}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={handleUsername}
                                value={username}
                            // autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePassword}
                                value={password}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link component={RouterLink} to="/Signup">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    errors: state.errors.errors,
    loggedIn: state.users.loggedIn,
    loadingUser: state.users.loadingUser
})

export default connect(mapStateToProps, { loginUser, clearErrors, clearIsUserLoading })(SignIn)