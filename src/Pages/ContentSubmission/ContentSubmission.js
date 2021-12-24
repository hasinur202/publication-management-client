import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const ContentSubmission = () => {
    const [content, setContent] = useState({});
    const [message, setMessage] = useState('');
    const { _id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const url = `http://localhost:5000/content-area-details/${_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setContent(data));
    }, [_id]);

    const onSubmit = data => {
        data.area_id = _id
        data.email = user.email
        data.status = 0
        data.img = content.img
        data.content_area = content.name

        fetch('http://localhost:5000/contents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result.insertedId) {
                alert('Content Submitted Successfully')
                setMessage('Content Submitted Successfully');
                reset();
                history.push('/home');
            } else {
                setMessage(result.message);
            }
        })
    };
    return (
        <>
        <Header></Header>
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Content Submission for Publication</h2>
                    <img height={100} width={100} src={content.img} alt='icon'/>
                </div>
                { message &&
                    <div class="alert alert-warning" role="alert">
                        {message}
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)} className="php-email-form" data-aos="fade-up" data-aos-delay="100">                    
                    <div className="row">
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <label className='w-100 text-start' htmlFor="content_area">Content Area *</label>
                            <input disabled defaultValue={content.name} {...register("content_area")} type="text" className="form-control" required />
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <label className='w-100 text-start' htmlFor="name">Content Title *</label>
                            <input defaultValue="" {...register("content_title")} type="text" className="form-control" required />
                            {errors.content_title && errors.content_title.type === "required" && <span>This is required</span>}
                        </div>
                        <div className="form-group mt-3">
                            <label className='w-100 text-start' htmlFor="name">Publication Content *</label>
                            <textarea defaultValue="" {...register("publication_content")} className="form-control" required rows="5"></textarea>
                            {errors.publication_content && errors.publication_content.type === "required" && <span>This is required</span>}
                        </div>
                        <div className="col-md-6 form-group mt-3 mb-2 mt-md-0">
                            <label className='w-100 text-start' htmlFor="name">Date *</label>
                            <input defaultValue="" {...register("date")} type="date" className="form-control" required />
                            {errors.date && errors.date.type === "required" && <span>This is required</span>}
                        </div>
                        <div className="col-md-12 form-group mt-3">
                            <h5 className='text-start border-bottom-warning'>Writer Information</h5>
                            <hr />
                        </div>

                        <div className="col-md-6 form-group">
                            <input readOnly defaultValue={user.displayName} {...register("writer_name")} type="text" className="form-control" required />
                        </div>
                        <div className="col-md-6 form-group mt-md-0">
                            <input readOnly defaultValue={user.email} {...register("email", { required: true })} type="text" className="form-control" placeholder="Image Url" required />
                        </div>
                        <div className="col-md-12 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("address")} type="text" className="form-control" placeholder="Address" required />
                            {errors.address && errors.address.type === "required" && <span>This is required</span>}
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("city")} type="text" className="form-control" placeholder="City" required />
                            {errors.city && errors.city.type === "required" && <span>This is required</span>}
                        </div>
                        <div className="col-md-6 form-group mt-3 mt-md-0">
                            <input defaultValue="" {...register("phone")} type="number" className="form-control" placeholder="Phone Number" required />
                            {errors.phone && errors.phone.type === "required" && <span>This is required</span>}
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        { errors.length > 0 &&
                            errors.map(error => <div className="error-message">{error}</div> )
                        }
                    </div>
                    <div className="text-center"><button className="btn-primary px-3 py-2" type="submit">Submit Now</button></div>
                </form>
            </div>
        </section>
        <Footer></Footer>
        </>
    );
};

export default ContentSubmission;