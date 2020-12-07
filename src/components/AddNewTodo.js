import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import AxiosClientProvider from "../services/apiClient";
const ApiRequestClient = new AxiosClientProvider();

const useStyles = makeStyles({
    root: {
        marginTop: 16,
        marginBottom: 16,
        padding: 16,
        boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
    },
    button: {
        marginTop: 16,
        width: '100%'
    }
});

const Form = ({ }) => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");

    const AddTodoEvent = (event) => {
        var authorization = localStorage.getItem("access-token");
        var ApiClient = ApiRequestClient.getClientWithToken(authorization);
        try {
            let addTask = {
                text: title
            }
            ApiClient.post("todo/additem", addTask).then(response => {
                console.log("new updated", response);
                alert(" Added sucessfully");
                window.location.reload();
            })
        } catch (err) {
            console.log(err);
            alert(" Some error occured! Try again.")
        }
    };

    return (
        <Grid container alignItems="center">
            <Grid item md={12} sm={12} >
                <TextField value={title} onChange={(event) => { setTitle(event.target.value) }}
                    id="outlined-basic" fullWidth label="Enter Title" multiline variant="outlined" />
            </Grid>
            <Grid item md={12} sm={12}>
                <Button className={classes.button} variant="contained" color="primary" type="submit"
                    onClick={event => { AddTodoEvent(event) }}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
    )
}

export default Form;