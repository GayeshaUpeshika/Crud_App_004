import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

function AddDepartment() {



    const departmentName = useRef("");
    const description = useRef("");
    const noOfEmployees = useRef("");
    const imageUrl = useRef("");

    const navigate = useNavigate();

    function addDepartmentHandler(){

        var payload ={
            departmentName: departmentName.current.value,
            description: description.current.value,
            noOfEmployees: noOfEmployees.current.value,
            imageUrl: imageUrl.current.value,
        }
        axios.post("https://localhost:7163/Department",payload)
        .then((response) =>{
               navigate("/all-department");
        })
    }



    return( <>
    <legend>Add A New Department</legend>
        <Form  className="form">
      <Form.Group className="mb-3" controlId="formDepartmentName">
        <Form.Label>Department Name</Form.Label>
        <Form.Control type="text" ref={departmentName} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={description}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="noOfEmployees">
        <Form.Label>NoOFEmployees</Form.Label>
        <Form.Control type="text" ref={noOfEmployees} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label>imageUrl</Form.Label>
        <Form.Control type="text" ref={imageUrl}/>
       
      </Form.Group>

     
      <Button variant="primary" type="button" onClick={addDepartmentHandler}>
        Submit
      </Button>
    </Form>
</>
    );
}

export default AddDepartment;