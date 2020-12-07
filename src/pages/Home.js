import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ProTip from './ProTip';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Todo App
                    </Typography>
                    <Button component={Link} to="/signin" color="inherit">Signin</Button>
                    <Button component={Link} to="/signup" color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
            <Paper style={classes.paperContainer}>
                <Container maxWidth="sm">
                    <Box my={4}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Create Your todo list
                        </Typography>
                        <ProTip />
                    </Box>
                </Container>
            </Paper>
        </div>
    );
}