import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";


function UpdateDepartment(){

    const departmentName = useRef("");
    const description = useRef("");
    const noOfEmployees = useRef("");
    const imageUrl = useRef("");

    const {id} =useParams();
    

    useEffect(() =>{

        axios.get(`https://localhost:7163/Department/${id}`)
        .then((response) =>{
            console.log(response.data.noOfEmployees); 
            departmentName.current.value = response.data.departmentName;
            description.current.value = response.data.description;
            noOfEmployees.current.value = response.data.noOfEmployees;
            imageUrl.current.value = response.data.imageUrl;

        });
    },[])

    const navigate = useNavigate();

    function UpdateDepartmentHandler(){

        var payload ={
            departmentName: departmentName.current.value,
            description: description.current.value,
            noOfEmployees: noOfEmployees.current.value,
            imageUrl: imageUrl.current.value,
            id:id
        }
        axios.put("https://localhost:7163/Department",payload)
        .then((response) =>{
            navigate("/all-department");
        });        
    }
    return (<>
    <legend>Update Department</legend>
    <Form  className="form">
      <Form.Group className="mb-3" controlId="formDepartmentName">
        <Form.Label>Department Name</Form.Label>
        <Form.Control type="text" ref={departmentName} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={description}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="noOFEmployees">
        <Form.Label>NoOFEmployees</Form.Label>
        <Form.Control type="number" ref={noOfEmployees} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label>imageUrl</Form.Label>
        <Form.Control type="text" ref={imageUrl}/>
       
      </Form.Group>

     
      <Button variant="primary" type="button" onClick={UpdateDepartmentHandler}>
        Submit
      </Button>
    </Form>
    </>
    );
}

export default UpdateDepartment;