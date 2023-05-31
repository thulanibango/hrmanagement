import React, {useState} from "react";
import Button from "./UiElements/FormElements/Button";
import Card from "./UiElements/Card";
import Modal from "./UiElements/Modal";
import {useHttpClient} from "./hook/http-hook"
import ErrorModal from "./UiElements/ErrorModal"
import LoadingSpinner from "./UiElements/LoadingSpinner"



const UserInfo = props=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [showEdit, setShowEdit]= useState(false);
    const[showConfirm, setShowConfirm] =useState(false);
    const openEditHandler = ()=>setShowEdit(true);

    const closeEditHandler= ()=>setShowEdit(false);
    const showDeleteWarningHandler = ()=>{
        setShowConfirm(true);
    }
    const cancelDeleteHandler = () =>{
        setShowConfirm(false)
    }
    const confirmDeleteHandler =async ()=>{
        setShowConfirm(false);
        try {
            await sendRequest(
              `http://localhost:5001/api/users/${props.id}`,
              'DELETE'
            );
            props.onDelete(props.id);
          } catch (err) {}
    }

    if(props.items.length === 0 ){
        return <div className="info-list canter">
            <Card>
                <h2>Error, info not found </h2>
            </Card>
        </div>
    }
    console.log(props.items)
    let singleUser = props.items

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal show={showEdit}
             onCancel={closeEditHandler} 
             header={"singleUser.name"} 
             contentClass="place-item_modal-content"
             footerClass="place-item_modal-actions"
             footer={<Button onClick={closeEditHandler}>Close</Button>} >
             <div className="info-container">
                <h2>Edit here</h2>
                </div>   
            </Modal>
            <Modal 
            show={showConfirm}
             onCancel={cancelDeleteHandler} 
            //  header={singleUser.name} 
             contentClass="place-item_modal-content"
             footerClass="place-item_modal-actions"
             footer={<React.Fragment><Button inverse onClick={cancelDeleteHandler}>Cancel</Button><Button danger onClick={confirmDeleteHandler}>Delete</Button></React.Fragment>} >
             <div className="info-container">
                <h2>ARE YOU SURE ??</h2>
                <p>Are you sure you want to delete this?</p>
                </div>   
            </Modal>
        <ul className="info-list">
            <li className="info-item">
                <Card className="info-item__content">
                {isLoading && <LoadingSpinner asOverlay />}
                    <div className="info-item__image">
                        <img src={singleUser.image} alt={singleUser.name} />
                        <div className="info-item__info">
                            <h2>{singleUser.name}</h2>
                            <h2>{singleUser.email}</h2>
                            {/* <h3>{singleUser.department}</h3>
                            <p>{singleUser.description}</p> */}
                        </div>
                        <div className="info-item__actions">
                            {/* <Button to={`./user/${singleUser.id}`} inverse onClick={openEditHandler}>Edit</Button> */}
                            <Button inverse to={`/newuser/${singleUser.id}`}>Edit</Button>
                            <Button danger onClick={showDeleteWarningHandler}>Delete</Button>
                            <Button >Message</Button>
                        </div>
                    </div>
                  
                </Card>
            </li>
        </ul>
        </React.Fragment>
    )

}

export default UserInfo;