import React from 'react';
import { Button, Modal } from 'react-bootstrap';


function DetailModal(props) {
    const { content_title, date, content_area, writer_name, address, email, phone, img, publication_content } = props.data;

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='bg-warning' closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {content_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              <strong>Date:</strong> {date} <br />
              <strong>Content Area: </strong>{content_area}
            </p>
            <img className='text-start' height={100} width={100} src={img} alt='icon' />
            <p>
            <strong>Contents:</strong> {publication_content}
            </p>
            <p>
              <strong>Author:</strong> {writer_name}<br />
              <strong>Address:</strong> {address} <br />
              <strong>Email:</strong> {email} <br />
              <strong>Phone:</strong> {phone}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default DetailModal;