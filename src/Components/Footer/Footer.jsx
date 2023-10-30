import React from "react";

const Footer = () => {

  return (
    <div className="container-fluid">
      <footer className="py-2 mt-2">
        <div className="row">
          <div className="col-12 col-md text-right">
            <small className="d-block text-muted">
            Copyright © {new Date().getFullYear()} AV learning health care LTD. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;