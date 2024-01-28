import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useEffect,useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import calculateAge from "../components/shared/CalculateAge";


function UpdateEmployee(){

    const [age,setAge] = useState(0);
    const [doj,setDOJ] = useState("");
    const [dob,setDOB] = useState("");

    const employeeFirstName = useRef("");
    const employeeLastName = useRef("");
    const department = useRef("");
    const emailId = useRef("");
    const salary = useRef("");
    const imageUrl = useRef("");

    const {id} =useParams();
    

    // Calculate age when Date of Birth changes
    const handleAge = (event) => {
          console.log(event.target.value);
          setDOB(event.target.value);
          const dateOfBirth = new Date(event.target.value);
          const currentDate = new Date();
          let calculatedAge = currentDate.getFullYear() - dateOfBirth.getFullYear();

          // Subtract one from the age if the birthday hasn't occurred yet this year
          if (currentDate < new Date(currentDate.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate())) {
              calculatedAge--;
          }
      
        setAge(calculatedAge);
    };

    const handleDOJ =(event) =>{
             setDOJ(event.target.value);
    }

    useEffect(() =>{

        axios.get(`https://localhost:7163/Employee/${id}`)
        .then((response) =>{
            const res = response.data[0];
            employeeFirstName.current.value = res.employeeFirstName;
            employeeLastName.current.value = res.employeeLastName;
            department.current.value = res.department;
            emailId.current.value = res.emailId;
            setDOJ((res.doj).split("T")[0]);
            setDOB((res.dob).split("T")[0]);
            setAge(res.age);
            salary.current.value = res.salary;
            imageUrl.current.value = res.imageUrl;

        });
    },[])

    const navigate = useNavigate();

    function UpdateEmployeeHandler(){

        var payload ={
            employeeFirstName: employeeFirstName.current.value,
            employeeLastName: employeeLastName.current.value,
            department: department.current.value,
            emailId: emailId.current.value,
            doj: doj,
            dob: dob,
            age: age,
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
        <Form.Control type="date" value={doj} onChange={handleDOJ}/>
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="dob">
        <Form.Label>DOB</Form.Label>
        <Form.Control type="date" value={dob} onChange={handleAge} />
       
      </Form.Group>

     
      <Form.Group className="mb-3" controlId="age">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" value={age} />
       
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