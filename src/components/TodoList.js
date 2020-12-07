import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import AxiosClientProvider from "../services/apiClient";
const ApiRequestClient = new AxiosClientProvider();


function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 100,
        width: 400,
        marginLeft: "40%",
        marginTop: "10%"
    },
    button: {
        marginTop: 16
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function TodoList({ todoList, setTitle, setItem, setEdit, deleteItem }) {
    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [modelText, setModelText] = React.useState('');
    const [modelItemId, setModelItemId] = React.useState('');
    const [task, setTask] = React.useState(todoList);
    console.log("task list : ", todoList);
    const [complete, setComplete] = React.useState(false);

    const handleOpen = (item) => {
        setModelText(item.text);
        setModelItemId(item.id);
        setOpen(true);
    };

    const modelTextUpdated = (textValue) => {
        console.log("Text values  : ", textValue)
        setModelText(textValue);
    }

    const modelTextUpdatedClick = () => {
        try {
            var authorization = localStorage.getItem("access-token");
            var ApiClient = ApiRequestClient.getClientWithToken(authorization);

            if (modelItemId) {
                let updateData = {
                    text: modelText
                }
                ApiClient.put("todo/update/" + modelItemId, updateData).then(response => {
                    if (response && response.data) {
                        alert("Task Updated!");
                        window.location.reload();
                    }
                });
            }
        } catch (err) {
            console.log(err);
            alert("Some error occured! Please try again.");
            window.location.reload();
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (item_id) => {
        try {
            var authorization = localStorage.getItem("access-token");
            var ApiClient = ApiRequestClient.getClientWithToken(authorization);

            if (item_id) {
                ApiClient.delete("todo/delete/" + item_id).then(response => {
                    if (response && response.data) {
                        alert("Task Deleted!");
                        window.location.reload();
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    const markTaskCompleted = (values, item_id) => {
        try {
            var authorization = localStorage.getItem("access-token");
            var ApiClient = ApiRequestClient.getClientWithToken(authorization);

            if (values == true) {
                ApiClient.put("todo/complete/" + item_id).then(response => {
                    if (response && response.data) {
                        alert("Task Completed");
                        window.location.reload();
                    }
                });
            } else {
                ApiClient.put("todo/uncomplete/" + item_id).then(response => {
                    if (response && response.data) {
                        alert("Task Removed from complete list");
                        window.location.reload();
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container className={classes.container} maxWidth="sm">
            {!todoList.length
                ?
                <Typography variant="h6" color="error">No Task Today!!!</Typography>
                :
                (<List>
                    {todoList.map(item => {
                        return (
                            <ListItem key={item.id} button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    className={classes.modal}
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={open}>
                                        <Grid container alignItems="center" className={classes.paper}>
                                            <Grid item md={12}>
                                                <TextField
                                                    value={modelText}
                                                    onChange={e => { modelTextUpdated(e.target.value) }}
                                                    id="outlined-basic"
                                                    fullWidth label="Rename Task" multiline variant="outlined" />
                                            </Grid>
                                            <Grid item md={12}>
                                                <Button className={classes.button} variant="contained" color="primary"
                                                    onClick={e => { modelTextUpdatedClick() }}
                                                >
                                                    {/* {edit ? "Edit" : "Add"} */}
                                                    Update
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Fade>
                                </Modal>
                                {item.isCompleted == false ?
                                    <ListItemIcon>
                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                            onChange={e => {
                                                console.log(e.target.checked);
                                                markTaskCompleted(e.target.checked, item.id);
                                            }}
                                        /></ListItemIcon>

                                    : <ListItemIcon>

                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                            checked={true}
                                            onChange={e => {
                                                console.log(e.target.checked);
                                                markTaskCompleted(e.target.checked, item.id);
                                            }}
                                        />
                                    </ListItemIcon>
                                }

                                <ListItemText primary={item.text} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(item)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>)
            }
        </Container>
    )

}


export default TodoList;