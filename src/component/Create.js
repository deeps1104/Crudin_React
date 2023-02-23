import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Create.css'
import { Form } from 'semantic-ui-react'
let id;
export default function Create() {
  // const [firstName, setFirstName] = useState('');
  // const [middleName, setMiddleName] = useState('');
  // const [lastName, setLastName] = useState('');
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
    <div className='container'>
      <h2 className="main-header text-center py-3 fs-1 text-white" id='heading1'> React Axios Crud Operations</h2>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title  " id="exampleModalLabel">Update User Details</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body ">
              <Form className="create-form ">
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
            <th scope="col">id</th>
            <th scope="col">FirstName</th>
            <th scope="col">MiddleName</th>
            <th scope="col">LastName</th>
            <th scope="col" >Action</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.middle_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button  className='btn btn-success px-4' data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="" id='#exampleModal' onClick={EditUser} >Edit</button> &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-danger' onClick={(e) => deleteUserData(item.id, e)} >Delete</button>
                   </td>
              </tr>
            )
          })
          }

        </tbody>
      </table>
      {/* <Button onClick={postData} type='submit' className='btn btn-primary w-25 rounded-pill fs-5'>Get Data</Button> 
      <a data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="" id='#exampleModal' onClick={EditUser}><i class="fa fa-pencil-square"  style={{fontSize:"24px",color:"green"}}></i></a>&nbsp;
      */ 
      }
    </div>
  )
}