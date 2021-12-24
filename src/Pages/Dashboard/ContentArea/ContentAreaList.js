import React from 'react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DetailModal from './DetailModal';

const ContentAreaList = () => {
    const [areas, setContentAreas] = useState({});
    const [modalShow, setModalShow] = useState({});
    const [listReload, setlistReload] = useState(false);
    let sL = 0;

    useEffect(() => {
        setlistReload(true)
        const url = 'http://localhost:5000/content-areas';
        fetch(url)
            .then(res => res.json())
            .then(data => setContentAreas(data));
            setlistReload(false)
    }, [listReload]);

    // DELETE AN USER
    const handleDeleteAreas = id => {
        setlistReload(false);
        const proceed = window.confirm('Are you sure to change status?');
        if (proceed) {
            const url = `http://localhost:5000/content-areas/${id}`;
            fetch(url, {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Updated successfully');
                    setlistReload(true);
                }
            });
        }
    }

    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <h2>Content Areas</h2>
                </div>
                <div className="row">
                    <div className="bg-light mb-2" style={{textAlign: 'right'}}>
                        <Link to="add-content-area" className="btn btn-primary">Add New</Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL. No.</th>
                                <th scope="col">Icon</th>
                                <th scope="col">Content Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            areas.length > 0 && areas.map(content =><tr key={content._id}>
                                    <th scope="row">{sL = sL + 1}</th>
                                    <td>
                                        <img width={80} height={70} src={content.img} alt='icon' />
                                    </td>
                                    <td>{content.name}</td>
                                    <td>
                                        <button onClick={() => setModalShow({st: true, content: content})} type='button' className='btn btn-info btn-sm me-2'>
                                                View
                                        </button>
                                    </td>
                                    <td>
                                        {
                                            parseInt(content.status) === 1 ? <span>Active</span> : <span>Inactive</span>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteAreas(content._id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                            <tr>
                                <td colSpan={6}>
                                    {
                                    sL === 0 &&
                                    <Spinner className="text-center" animation="border" variant="danger" />
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    { modalShow.content &&
                        <DetailModal
                            data={modalShow.content}
                            show={modalShow.st}
                            onHide={() => setModalShow({st: false, content: modalShow.content})}
                        />
                    }
                </div>
            </div>
        </section>
    );
};

export default ContentAreaList;