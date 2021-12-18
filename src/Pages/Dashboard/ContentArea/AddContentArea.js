import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddContentArea = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        data.status = 1;
        fetch('http://localhost:5000/add-content-area', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Content Area Added Successfully');
                    reset();
                }
            })
    };
    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title pb-0">
                    <h2>Add Content Areas</h2>
                </div>
                <div className="row">
                    <div className="bg-light mb-2" style={{textAlign: 'right'}}>
                        <Link to="content-area-list" className="btn btn-warning">Content Areas List</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <input defaultValue="" {...register("name")} type="text" className="form-control" placeholder="Content Area Title" required />
                        </div>
                        <div className="col-md-6 form-group">
                            <input defaultValue="" {...register("img")} type="text" className="form-control" placeholder="Image Url" required />
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <textarea defaultValue="" {...register("description")} className="form-control" rows="5" placeholder="Description"></textarea>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        { errors.length > 0 &&
                            errors.map(error => <div className="error-message">{error}</div> )
                        }
                        <div className="sent-message">Your added request has been sent successfully. Thank you!</div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddContentArea;