// import React from 'react';  
    
// import axios from 'axios';  
    
// export default class PostList extends React.Component {  
//   state = {  
//     posts: []  
//   }  
    
//   componentDidMount() {  
//     axios.get(`http://127.0.0.1:8000/typeid/post/`)  
//       .then(res => {  
//         const posts = res.data;  
//         this.setState({ posts });  
//       })  
//   }  
    
//   deleteRow(id, e){  
//     axios.delete(`http://127.0.0.1:8000/app/profile/${id}/`)  
//       .then(res => {  
        
//         console.log(res.data);  
    
//         const posts = this.state.posts.filter(item => item.id !== id);  
//         this.setState({ posts });  
//       })  
    
//   }  
    
//   render() {  
//     return (  
//       <div>  
//         <h1> Example of React Axios Delete Request </h1>  
//         <table className="table table-bordered">  
//             <thead>  
//               <tr>  
//                   <th>ID</th>  
//                   <th>Title</th>  
//                   <th>Body</th>  
//                   <th>Action</th>  
//               </tr>  
//             </thead>  
    
//             <tbody>  
//               {this.state.posts.map((post) => (  
//                 <tr>  
//                   <td>{post.id}</td>  
//                   <td>{post.title}</td>  
//                   <td>{post.body}</td>  
//                   <td>  
//                     <button className="btn btn-danger" onClick={(e) => this.deleteRow(post.id, e)}>Delete</button>  
//                   </td>  
//                 </tr>  
//               ))}  
//             </tbody>  
    
//         </table>  
//       </div>  
//     )  
//   }  
// }  

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Create.css'
import { Form } from 'semantic-ui-react'

let id;
let newdata;
export default function PostList() {

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [Email ,setEmail] = useState("");
  const [phonenumber,setPhoneNumber] = useState("");
  const [address1 ,setAddress1] = useState("");
  const [address2 ,setAddress2] = useState("");
  const [city,setCity] = useState("");
  const [country, setCountry] =useState("");
  const [state,setState] = useState("");
  const [pincode,setPinCode] = useState("");
  const [data1, setData1] = useState([])
  const [user, setUser] = useState({
    first_name: "",
    middle_name: "",
    last_name: ""
  })

  const {
    first_name, middle_name, last_name
  } = user;



  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });

  };




  const deleteUserData = (id) => {
    axios.delete(`http://127.0.0.1:8000/app/profile/${id}/ `)
      .then((response) => {
      }).catch((err) => {
        console.log(err)
      })

  }

  const EditUser = (event) => {
    id = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
    axios.get(`http://127.0.0.1:8000/app/profile/${id}/`)
      .then(response => {
        setUser(response.data)
      }).catch(error => {
        console.error('Something went wrong!', error);
      });
  }

  const CreatePost = (e) => {




  }






  const AddUser = (e) => {
    let data = new FormData()
    data.append("first_name", firstName)
    data.append("middle_name", middleName)
    data.append("last_name", lastName)
    data.append("email", Email)
    data.append("phone_number", phonenumber)
    data.append("address_line1", address1)
    data.append("address_line2", address2)
    data.append("city", city)
    data.append("state", state)
    data.append("country", country)

    data.append("pin_code", pincode)

    axios.post(`http://127.0.0.1:8000/app/profile/`, data)
      .then((response) => {
        debugger
        postData()
      }).catch(error => {
        console.log('There was an error!', error);
      })
  }





  const updateUser = (e) => {
    let updateFirstName = user.first_name
    let updatedMiddleName = user.middle_name
    let updatedLastName = user.last_name
    let data = new FormData()
    data.append("first_name", updateFirstName)
    data.append("middle_name", updatedMiddleName)
    data.append("last_name", updatedLastName)
    axios.patch(`http://127.0.0.1:8000/app/profile/${id}/`, data)
      .then(response => {
        postData()
        let n = response.data
        console.log(n)
      }).catch(error => {
        console.error('Something went wrong!', error);
      });
  }
  const postData = (e) => {
    axios.get("http://127.0.0.1:8000/app/profile/")
      .then((response) => {
        setData1(response.data)
      }).catch(error => {
        console.log('There was an error!', error);
      })

  }

  useEffect(() => {
    postData()
  }, [])

  










  return (
    <div className='container-fluid'>
      <h2 className="main-header text-center py-3 fs-1 text-white" id='heading1'> React Axios Crud Operations</h2>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title" id="exampleModalLabel">Update User Details</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body ">
              <Form className="create-form" >
                <Form.Field className='form-group '>
                  <label for="message-text" class="col-form-label ">FirstName</label>
                  <input placeholder='First Name' class="form-control" onChange={e => onInputChange(e)} value={first_name} name="first_name" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" className="col-form-label ">MiddleName</label>
                  <input placeholder='Middle Name' class="form-control" onChange={e => onInputChange(e)} value={middle_name} name="middle_name" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label">Last Name</label>
                  <input placeholder='Last Name' class="form-control" onChange={e => onInputChange(e)} value={last_name} name="last_name" />
                </Form.Field>
              </Form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={updateUser}>Update</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" >Cancel</button>
            </div>
          </div>
        </div>
      </div>





      <table class="table text-center mt-2">
        <thead class="table table-dark">
          <tr>
            <th scope="col">FirstName</th>
            <th scope="col">MiddleName</th>
            <th scope="col">LastName</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Address1</th>
            <th scope="col">Address2</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Country</th>
            <th scope="col">PinCode</th>
            <th scope="col" >Action</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item) => {
            return (
              <tr>
                <td>{item.first_name}</td>
                <td>{item.middle_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone_number}</td>
                <td>{item.address_line1}</td>
                <td>{item.address_line2}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.country}</td>
                <td>{item.pin_code}</td>

                <td>
                  <button className='btn btn-success px-4' data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="" id='#exampleModal' onClick={EditUser} >Edit</button> &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-danger' onClick={(e) => deleteUserData(item.id, e)} >Delete</button>
                </td>
              </tr>
            )
          })
          }

        </tbody>
      </table>
      









      <button className='btn btn-warning px-5' data-bs-toggle="modal" data-bs-target="#addmodal" data-whatever="" id='#addmodal' onClick={CreatePost}>Add Users</button>

      
      <div class="modal fade" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title" id="exampleModalLabel">Add User Details</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body ">
              <Form className="create-form" >
                <div className='row'>
                 <div className='col-lg-4 col-md-4 col-sm-12'>
                 <Form.Field className='form-group '>
                  <label for="message-text" class="col-form-label ">FirstName</label>
                  <input placeholder='First Name' class="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" className="col-form-label ">MiddleName</label>
                  <input placeholder='Middle Name' class="form-control" value={middleName} onChange={(e) => setMiddleName(e.target.value)} name="middleName" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label ">Last Name</label>
                  <input placeholder='Last Name' class="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" />
                </Form.Field>
                 </div>


                 <div className='col-lg-4 col-md-4 col-sm-12'>
                 <Form.Field className='form-group '>
                  <label for="message-text" class="col-form-label ">EMAIL</label>
                  <input placeholder='Email' class="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} name="Email" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" className="col-form-label ">Contact</label>
                  <input placeholder='Contact' class="form-control" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} name="phonenumber" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label">Address1</label>
                  <input placeholder='Address1' class="form-control" value={address1} onChange={(e) => setAddress1(e.target.value)} name="address1" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label">Address2</label>
                  <input placeholder='Address2' class="form-control" value={address2} onChange={(e) => setAddress2(e.target.value)} name="lastName" />
                </Form.Field>
                 </div>

                 <div className='col-lg-4 col-md-4 col-sm-12'>
                 <Form.Field className='form-group '>
                  <label for="message-text" class="col-form-label ">City</label>
                  <input placeholder='City' class="form-control" value={city} onChange={(e) => setCity(e.target.value)} name="city" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" className="col-form-label ">State</label>
                  <input placeholder='State' class="form-control" value={state} onChange={(e) => setState(e.target.value)} name="state" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label">Country</label>
                  <input placeholder='Country' class="form-control" value={country} onChange={(e) => setCountry(e.target.value)} name="country" />
                </Form.Field>
                <Form.Field>
                  <label for="message-text" class="col-form-label">PinCode</label>
                  <input placeholder='PinCode' class="form-control" value={pincode} onChange={(e) => setPinCode(e.target.value)} name="pincode" />
                </Form.Field>
                 </div>
                </div>
              </Form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={AddUser}>ADD</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" >CANCEL</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}