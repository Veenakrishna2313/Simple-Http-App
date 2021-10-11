import React, { Component } from "react";
import "./App.css";
import httpServices from "./Services/httpServices";
import config from "./config.json"
import {ToastContainer} from react-toastify;
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await httpServices.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    console.log("Add");

    const obj = { title: "a", body: "b" };
    const { data: post } = await httpServices.post(config.apiEndPoint, obj);

    const posts=[post,...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async(post) => {
   post.title="UPDATED";

   await httpServices.put(config.apiEndPoint + '/' +post.id,post);
   const posts = [post, ...this.state.posts];
   const index=posts.indexOf(post);
   posts[index]={...post};
    this.setState({ posts });

  
  };

  handleDelete =async (post) => {
    const originalpost=this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try{
      await httpServices.delete( "s" +config.apiEndPoint + "/" + post.id);
      
    }
    catch(ex)
{
  if(ex.response && ex.response.status===404)
    alert("This post is already deleted");
 
 
  this.setState({ posts:
    originalpost });

}
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
