import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";


function UpdateEmployee(){

    const employeeFirstName = useRef("");
    const employeeLastName = useRef("");
    const department = useRef("");
    const emailId = useRef("");
    const doj = useRef("");
    const dob = useRef("");
    const age= useRef("");
    const salary = useRef("");
    const imageUrl = useRef("");

    const {id} =useParams();
    

    useEffect(() =>{

        axios.get(`https://localhost:7163/Employee/${id}`)
        .then((response) =>{
            employeeFirstName.current.value = response.data.employeeFirstName;
            employeeLastName.current.value = response.data.employeeLastName;
            department.current.value = response.data.department;
            emailId.current.value = response.data.emailId;
            doj.current.value = response.data.doj;
            dob.current.value = response.data.dob;
            age.current.value = response.data.age;
            salary.current.value = response.data.salary;
            imageUrl.current.value = response.data.imageUrl;

        });
    },[])

    const navigate = useNavigate();

    function UpdateEmployeeHandler(){

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
            id:id
        }
        axios.put("https://localhost:7163/Employee",payload)
        .then((response) =>{
            navigate("/all-employee");
        });        
    }
    return (<>
    <legend>Update Employee</legend>
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

     

     
      <Button variant="primary" type="button" onClick={UpdateEmployeeHandler}>
        Submit
      </Button>
    </Form>
    </>
    );
}

export default UpdateEmployee;