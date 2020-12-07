import React, { Component } from "react";
import TodoList from '../components/TodoList'
import SideNavigation from '../components/SideNavigation'
import Header from "../components/Header"
import AxiosClientProvider from "../services/apiClient";
const ApiRequestClient = new AxiosClientProvider();

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      todoList: []
    };
    this.userSelectCallback = this.userSelectCallback.bind(this);
  }

  componentDidMount() {
    try {
      var authorization = localStorage.getItem("access-token");
      var ApiClient = ApiRequestClient.getClientWithToken(authorization)
      ApiClient.get("admin/admin_list_user").then(response => {
        if (response && response.data) {
          console.log("List all ", response.data);
          this.setState({
            userList: response.data.data
          })
        }
      });

      ApiClient.get("admin/admin_list_all_todo").then(response => {
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

  userSelectCallback(user_id) {
    console.log("Slectect values : ", user_id);
    try {
      var authorization = localStorage.getItem("access-token");
      var ApiClient = ApiRequestClient.getClientWithToken(authorization)
      ApiClient.get("admin/admin_list_todo/" + user_id).then(response => {
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
    const { formErrors } = this.state;
    return (
      <div>
        <header>
          <Header />
        </header>
        <SideNavigation UserList={this.state.userList} buttonClickCallback={this.userSelectCallback} />
        <TodoList todoList={this.state.todoList} />
      </div>
    );
  }
}



export default Admin;