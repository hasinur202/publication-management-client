import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


function SetPrice(props) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { content_title, _id } = props.data;
    const history = useHistory();

    const onSubmit = data => {
        // setlistReload(false);
        const proceed = window.confirm('Are you sure to approve?');
        if (proceed) {
            const price = data.price
            const url = `https://publication-management-client.herokuapp.com/contents-approve/${_id}/${price}`;
            fetch(url, {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    reset();
                    alert('Approved successfully');
                    props.onHide()
                    history.push('/dashboard');
                }
            });
        }
    }

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
            <form onSubmit={handleSubmit(onSubmit)} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                <div className="row">
                    <div className="col-md-6 m-auto form-group">
                        <input defaultValue="" {...register("price")} type="text" className="form-control" placeholder="Price" required />
                        {errors.price && errors.price.type === "required" && <span>This is required</span>}
                    </div>
                </div>
                <div className="text-center mt-4"><button className="btn-primary px-3 py-2" type="submit">Approve</button></div>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  export default SetPrice;