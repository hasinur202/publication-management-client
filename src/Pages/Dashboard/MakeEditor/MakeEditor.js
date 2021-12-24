import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const MakeEditor = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [message, setMessage] = useState('');
    const onSubmit = data => {
        fetch('http://localhost:5000/add-editor', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount) {
                    /** alert('Admin Added Successfully'); */
                    setMessage('Editor Added Successfully');
                    reset();
                } else {
                    setMessage(result.message);
                }
            })
    };
    return (
        <section className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Add Editor</h2>
                </div>
                { message &&
                    <div class="alert alert-warning" role="alert">
                        {message}
                    </div>
                }
                <form onSubmit={handleSubmit(onSubmit)} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
                    <div className="row">
                        <div className="col-md-6 m-auto form-group">
                            <input defaultValue="" {...register("email")} type="email" className="form-control" placeholder="Email" required />
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="loading">Loading</div>
                        { errors.length > 0 &&
                            errors.map(error => <div className="error-message">{error}</div> )
                        }
                    </div>
                    <div className="text-center"><button className="btn-primary px-3 py-2" type="submit">Add Editor</button></div>
                </form>
            </div>
        </section>
    );
};

export default MakeEditor;