import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import ZoneService from "../../services/ZoneService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button } from '@windmill/react-ui'
import { Alert, Spinner } from "../../services/NotiflixService";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import ZoneGridView from "../../Components/AICU/Zones/ZoneGridView";
import ZoneCardView from "../../Components/AICU/Zones/ZoneCardView";

const ZonesBedDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(ZoneSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createZoneModal, setCreateZoneModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isGridView, setIsGridView] = useState(true);

  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }

  const onSubmit = async (_formData) => {
    Spinner.show();
    let data = {
      "isActive": true,
      "zoneName": _formData.zoneName,
      "totalBeds": _formData.totalBeds,
      "zoneTypeId": 0,
      "hospitalId": 0
    }
    console.log(data.totalBeds);
    if(data.totalBeds >= 8 && data.totalBeds <=12){
      let response = await ZoneService.createZone(data);
      reset();
      setIsModalOpen(false)
      setRefreshKey(oldKey => oldKey + 1);
      Alert.success(response);
      Spinner.hide();
  
    }
    else{
      Alert.error("Total number of beds in a zone can only be between 8-12!")
    }
    Spinner.hide();
    setCreateZoneModal(!createZoneModal);

  }

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Patient Bed Allocation</h5>
              <div className="d-flex align-items-center">                
                <div className="d-flex align-items-center mr-3 switchWrap">
                  <label className="switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="isGridView"
                    checked={isGridView}
                    onChange={(event) => setIsGridView(event.target.checked)}
                  />
                  <span className="switchSlider round"></span>
                  </label>                
                  <span className="ml-1">Grid View</span>
                </div>
                <Button className="btn btn-primary" layout="outline" onClick={openModal}> <i className="fa-solid fa-plus mr-1"></i>Create New zone</Button>
              </div>
            </div>


          </div>

          {isGridView ?
            <ZoneGridView refreshKey={refreshKey} /> :
            <ZoneCardView />
          }

        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create New zone</ModalHeader>
          <ModalBody>
            <Label>
              <span>Zone name <span className="text-red-700">*</span> </span>
              <Input
                className="form-control"
                type="text"
                placeholder="Zone Name"
                {...register("zoneName")}
                autoComplete="off"
              />
            </Label>
            <Label>
              <span>Review </span>
              <Input
                type="number"
                className="form-control"
                placeholder="No. of Beds"
                {...register("totalBeds")}
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

export default ZonesBedDetails;