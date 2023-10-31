import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import ZoneService from "../../services/ZoneService";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Button } from '@windmill/react-ui'
import { Alert, Spinner } from "../../services/NotiflixService";
import TopNavigation from "../../Components/Navigation/TopNavigation";
import Footer from "../../Components/Footer/Footer";
import ZoneCardViewNew from "../../Components/AICU/Zones/ZoneCardViewNew";


const ZonesBedDetailNew = () => {
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

  return (
    <React.Fragment>
      <TopNavigation />
      <div className="container-fluid">
        <div className="card h-100 border-0">
          <div className="card-header pb-0">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h5 class="mb-0">New Card View</h5>
            </div>
          </div>
            <ZoneCardViewNew />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default ZonesBedDetailNew;