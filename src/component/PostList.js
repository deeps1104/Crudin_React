import React from 'react';  
    
import axios from 'axios';  
    
export default class PostList extends React.Component {  
  state = {  
    posts: []  
  }  
    
  componentDidMount() {  
    axios.get(`http://127.0.0.1:8000/app/profile/`)  
      .then(res => {  
        const posts = res.data;  
        this.setState({ posts });  
      })  
  }  
    
  deleteRow(id, e){  
    axios.delete(`http://127.0.0.1:8000/app/profile/${id}/`)  
      .then(res => {  
        
        console.log(res.data);  
    
        const posts = this.state.posts.filter(item => item.id !== id);  
        this.setState({ posts });  
      })  
    
  }  
    
  render() {  
    return (  
      <div>  
        <h1> Example of React Axios Delete Request </h1>  
    
        <table className="table table-bordered">  
            <thead>  
              <tr>  
                  <th>ID</th>  
                  <th>Title</th>  
                  <th>Body</th>  
                  <th>Action</th>  
              </tr>  
            </thead>  
    
            <tbody>  
              {this.state.posts.map((post) => (  
                <tr>  
                  <td>{post.id}</td>  
                  <td>{post.title}</td>  
                  <td>{post.body}</td>  
                  <td>  
                    <button className="btn btn-danger" onClick={(e) => this.deleteRow(post.id, e)}>Delete</button>  
                  </td>  
                </tr>  
              ))}  
            </tbody>  
    
        </table>  
      </div>  
    )  
  }  
}  