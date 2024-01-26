import axios from "axios";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";
import '../App.css';

function AllDepartment(){

    const [departments, setDepartments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(0);

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("https://localhost:7163/Department")
        .then((response) =>{
            setDepartments((existingData) =>{
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
          axios.delete(`https://localhost:7163/Department/${itemToDelete}`)
          .then((response) =>{ 
            setDepartments((existingData)=>{
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
        <Button variant="primary" type="button" onClick={()=>{navigate("/add-department")}}>
        Add A Department
      </Button>

        </Col>
    </Row>
    <Row xs={1} md={3} className="g-4 mt-1">
        {
            departments.map((sv) => (
        <Col key={sv.id}>
          <Card className="taf03">
            <Card.Img variant="top" src={sv.imageUrl} />
            <Card.Body className="taf02">
              <Card.Title className="taf01">{sv.departmentName}</Card.Title>
              <Card.Text>
               <b>Department Code:</b>{sv.id}
              </Card.Text>
              <Card.Text>
               <b>Description:</b>{sv.description}
              </Card.Text>
              <Card.Text>
               <b>NoOFEmployees:</b>{sv.noOfEmployees}
              </Card.Text>
              <Button variant="primary" type="button" onClick={()=>{navigate(`/update-department/${sv.id}`)}}>
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


export default AllDepartment;