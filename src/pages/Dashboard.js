import React, { Component } from "react";
// import "./App.css";
import Form from '../components/AddNewTodo'
import TodoList from '../components/TodoList'
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Header from "../components/Header"
import AxiosClientProvider from "../services/apiClient";
const ApiRequestClient = new AxiosClientProvider();

const styles = theme => ({
  root: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  button: {
    marginTop: 16
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
  }

  componentDidMount() {
    try {
      var authorization = localStorage.getItem("access-token");
      var ApiClient = ApiRequestClient.getClientWithToken(authorization)
      ApiClient.get("todo/listall").then(response => {
        if (response && response.data) {
          console.log("List all ", response.data);
          this.setState({
            todoList: response.data.data
          })
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <header>
          <Header />
        </header>
        <Container maxWidth="sm" className={classes.root}>
          <Form />
          <hr></hr>
          <TodoList
            todoList={this.state.todoList}
          />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Dashboard);