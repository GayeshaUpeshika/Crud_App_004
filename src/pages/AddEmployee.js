import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

function AddEmployee() {



    const employeeFirstName = useRef("");
    const employeeLastName = useRef("");
    const department = useRef("");
    const emailId = useRef("");
    const doj = useRef("");
    const dob = useRef("");
    const age= useRef("");
    const salary = useRef("");
    const imageUrl = useRef("");

    const navigate = useNavigate();

    function addEmployeeHandler(){

        var payload ={
            employeeFirstName: employeeFirstName.current.value,
            employeeLastName: employeeLastName.current.value,
            department: department.current.value,
            emailId: emailId.current.value,
            doj: doj.current.value,
            dob: dob.current.value,
            age: age.current.value,
            salary: salary.current.value,
            imageUrl: imageUrl.current.value,
        }
        axios.post("https://localhost:7163/Employee",payload)
        .then((response) =>{
               navigate("/all-employee");
        })
    }



    return( <>
    <legend className="hf">Add A New Employee</legend>
        <Form  className="form">
      <Form.Group className="mb-3" controlId="formEmployeeFirstName">
        <Form.Label>Employee First Name</Form.Label>
        <Form.Control type="text" ref={employeeFirstName} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmployeeLastName">
        <Form.Label>Employee Last Name</Form.Label>
        <Form.Control type="text" ref={employeeLastName}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="department">
        <Form.Label>Department</Form.Label>
        <Form.Control type="text" ref={department} />
       
      </Form.Group>


      <Form.Group className="mb-3" controlId="emailId">
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" ref={emailId} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="doj">
        <Form.Label>DOJ</Form.Label>
        <Form.Control type="date" ref={doj} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="dob">
        <Form.Label>DOB</Form.Label>
        <Form.Control type="date" ref={dob} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" ref={age} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="salary">
        <Form.Label>Salary</Form.Label>
        <Form.Control type="number" ref={salary} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="imageUrl">
        <Form.Label>imageUrl</Form.Label>
        <Form.Control type="text" ref={imageUrl}/>
       
      </Form.Group>

     
      <Button variant="primary" type="button" onClick={addEmployeeHandler}>
        Submit
      </Button>
    </Form>
</>
    );
}

export default AddEmployee;