
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Form } from 'semantic-ui-react'

let id;
export default function Test() {
  const [data, setData] = useState([])
  const [user, setUser] = useState({})

  const getUsers = (e) => {
    axios.get("http://127.0.0.1:8000/app/profile/")
      .then((response) => {
        const newData = response.data
        setData(newData)
      }).catch(error => {
        console.log('There was an error!', error);
      })
  }

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const EditUser = (event) => {
    id = event.target.parentElement.previousElementSibling.innerHTML
    axios.get(`http://127.0.0.1:8000/app/profile/${id}/`)
      .then(response => {
        setUser(response.data)
        getUsers()
      }).catch(error => {
        console.error('Something went wrong!', error);
      });
  }

  const updateUser = (e) => {
    axios.patch(`http://127.0.0.1:8000/app/profile/${id}/`, user)
      .then(response => {
        let n = response.data
        getUsers()
        console.log(n)
      }).catch(error => {
        console.error('Something went wrong!', error);
      });
  }

  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:8000/app/profile/${id}/`)
      .then((response) => {
        getUsers()
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container-fluid para1'>
      <h2 className="main-header text-center py-3 fs-1 text-white" id='heading1'> React Axios Crud Operations</h2>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content ">
            <div class="modal-header ">
              <h5 class="modal-title text-white" id="exampleModalLabel">Update User Details</h5>
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
                      <input placeholder='First Name' class="form-control" onChange={onInputChange} value={user.first_name} name="first_name" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" className="col-form-label ">MiddleName</label>
                      <input placeholder='Middle Name' class="form-control" onChange={onInputChange} value={user.middle_name} name="middle_name" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Last Name</label>
                      <input placeholder='Last Name' class="form-control" onChange={onInputChange} value={user.last_name} name="last_name" />
                    </Form.Field>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-12'>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Email</label>
                      <input placeholder='Email' class="form-control" onChange={onInputChange} value={user.email} name="email" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Contact</label>
                      <input placeholder='ContactNo.' class="form-control" onChange={onInputChange} value={user.phone_number} name="phone_number" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Addresss1</label>
                      <input placeholder='Addresss1' class="form-control" onChange={onInputChange} value={user.address_line1} name="address_line1" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Addresss2</label>
                      <input placeholder='Addresss2' class="form-control" onChange={onInputChange} value={user.address_line2} name="address_line2" />
                    </Form.Field>
                  </div>
                  <div className='col-lg-4 col-md-4 col-sm-12'>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">Country</label>
                      <input placeholder='Country' class="form-control" onChange={onInputChange} value={user.country} name="country" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">State</label>
                      <input placeholder='State' class="form-control" onChange={onInputChange} value={user.state} name="state" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">City</label>
                      <input placeholder='City' class="form-control" onChange={onInputChange} value={user.city} name="city" />
                    </Form.Field>
                    <Form.Field>
                      <label for="message-text" class="col-form-label">PinCode</label>
                      <input placeholder='PinCode' class="form-control" onChange={onInputChange} value={user.pin_code} name="pin_code" />
                    </Form.Field>
                  </div>
                </div>
              </Form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success m-3" data-bs-dismiss="modal" onClick={updateUser}>Update</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" >Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <table class="table text-center mt-2">
        <thead class="table bg-white">
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
            <th scope="col" style={{ display: "none" }}>ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr className='text-white'>
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
                <td style={{ display: "none" }}>{item.id}</td>
                <td>
                  <button className='btn btn-success px-4' data-bs-toggle="modal" data-bs-target="#exampleModal" data-whatever="" id='#exampleModal' onClick={EditUser} >Edit</button> &nbsp;&nbsp;&nbsp;
                  <button className='btn btn-danger' onClick={(e) => deleteUser(item.id, e)} >Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}