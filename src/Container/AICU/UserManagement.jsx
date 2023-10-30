import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button } from '@windmill/react-ui'
import { Alert, Spinner } from "../../services/NotiflixService";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import UserService from "../../services/UserService";
import UserGrid from "../../Components/AICU/User/UserGrid";

const UserManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(ZoneSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createUserModal, setCreateUserModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  

  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }

  const onSubmit = async (_formData) => {
    Spinner.show();
    let data = {
     
      "userName": _formData.username,
      "email": _formData.email,
    }
    console.log(data.username);
    console.log(data.email);
    if(data){
      let response = await UserService.createUser(data);
      reset();
      setIsModalOpen(false)
      setRefreshKey(oldKey => oldKey + 1);
      Alert.success(response);
      Spinner.hide();
  
    }
    else{
      Alert.error("Not able to add user")
    }
    Spinner.hide();
    setCreateUserModal(!createUserModal);

  }

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 class="mb-0">User Management</h5>
              <div className="d-flex align-items-center">                
                <Button className="btn btn-primary" layout="outline" onClick={openModal}> <i className="fa-solid fa-plus mr-1"></i>Create New User</Button>
              </div>
            </div>
          </div>    
          <UserGrid />

        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New User</ModalHeader>
          <ModalBody>
            <Label>
              <span>User Name <span className="text-red-700">*</span> </span>
              <Input
                className="form-control"
                type="text"
                placeholder="User Name"
                {...register("userName")}
                autoComplete="off"
              />
            </Label>
            <Label>
              <span>Email </span>
              <Input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email")}
                autoComplete="off"
              />
            </Label>
          </ModalBody>
          <ModalFooter>

            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModal}>
                Cancel
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" className="btn btn-primary" layout="outline" >Submit</Button>
            </div>

          </ModalFooter>
        </form>
      </Modal>

      <Footer />
    </React.Fragment>
  );
}

export default UserManagement;