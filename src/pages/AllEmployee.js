import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import '../App.css';

function AllEmployee(){

    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(0);

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("https://localhost:7163/Employee")
        .then((response) =>{
            setEmployees((existingData) =>{
                 return response.data;
            });
        });
    },[]);

    function showConfirmPopupHandler(id){
        setShowModal(true);
        setItemToDelete(id);
    }

    function closeConfirmPopupHandler(){
        setShowModal(false);
        setItemToDelete(0);
    }

    function deleteConfirmHandler(){
          axios.delete(`https://localhost:7163/Employee/${itemToDelete}`)
          .then((response) =>{ 
            setEmployees((existingData)=>{
                 return existingData.filter(_ => _.id !== itemToDelete);
            })
            setItemToDelete(0);
            setShowModal(false);
          })
    }

   
    return (<>
        <DeleteConfirmation
        showModal={showModal}
        title = "Delete Confirmation!"
        body = "Are Sure to Delete the item?"
        closeConfirmPopupHandler = {closeConfirmPopupHandler}
        deleteConfirmHandler = {deleteConfirmHandler}
        >


        </DeleteConfirmation>
    <Row className="mt-2">
        <Col md={{ span: 4, offset: 4}}>
        <Button variant="primary" type="button" onClick={()=>{navigate("/add-employee")}}>
        Add A Employee
      </Button>

        </Col>
    </Row>
    <Row xs={1} md={3} className="g-4 mt-1">
        {
            employees.map((sv) => (
        <Col key={sv.id}>
          <Card className="taf">
            <Card.Img variant="top" src={sv.imageUrl} />
            <Card.Body>
              <Card.Title className="taf01">{sv.employeeFirstName} {sv.employeeLastName}</Card.Title>
              <Card.Text>
               <b>Employee Code:</b>{sv.id}
              </Card.Text>
              <Card.Text>
               <b>Department:</b>{sv.department}
              </Card.Text>
              <Card.Text>
               <b>Email Id:</b>{sv.emailId}
              </Card.Text>
              <Card.Text>
               <b>DOJ:</b>{sv.doj}
              </Card.Text>
              <Card.Text>
               <b>DOB:</b>{sv.dob}
              </Card.Text>
              <Card.Text>
               <b>Age:</b>{sv.age}
              </Card.Text>
              <Card.Text>
               <b>Salary:</b>{sv.salary}
              </Card.Text>
             
              <Button variant="primary" type="button" onClick={()=>{navigate(`/update-employee/${sv.id}`)}}>
        Edit
      </Button>

      <Button variant="danger" type="button" onClick={() =>{showConfirmPopupHandler(sv.id);}}>
        Delete
      </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </>
    );
}


export default AllEmployee;