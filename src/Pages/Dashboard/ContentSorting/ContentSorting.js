import React from 'react';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
// import useAuth from '../../../hooks/useAuth';
import DetailModal from './DetailModal';

const ContentSorting = () => {
    // const { user } = useAuth();
    const [conents, setContents] = useState({});
    const [modalShow, setModalShow] = useState({});
    const [listReload, setlistReload] = useState(false);
    let sL = 0;

    useEffect(() => {
        const url = `https://publication-management-client.herokuapp.com/contents`;
        fetch(url)
            .then(res => res.json())
            .then(data => setContents(data));
    }, [listReload]);

    const handleRejectContent = id => {
        setlistReload(false);
        const proceed = window.confirm('Are you sure to reject?');
        if (proceed) {
            const url = `https://publication-management-client.herokuapp.com/contents-reject/${id}`;
            fetch(url, {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Rejected successfully');
                    setlistReload(true);
                }
            });
        }
    }

    const handleRecommendContent = id => {
        setlistReload(false);
        const proceed = window.confirm('Are you sure to recommend?');
        if (proceed) {
            const url = `https://publication-management-client.herokuapp.com/contents-recommend/${id}`;
            fetch(url, {
                method: 'PUT'
            })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Recommended successfully');
                    setlistReload(true);
                }
            });
        }
    }


    return (
        <section id="appointment" className="appointment section-bg">
            <div className="container" data-aos="fade-up">
                <div className="section-title mb-0">
                    <h2>Publication List</h2>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL. No.</th>
                                <th scope="col">Content Area</th>
                                <th scope="col">Content Title</th>
                                <th scope="col">Date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            conents.length > 0 && conents.filter(item => parseInt(item.status) === 0 || parseInt(item.status) === 2 || parseInt(item.status) === 3).map(content => <tr key={content._id}>
                                    <th scope="row">{sL = sL + 1}</th>
                                    <td>{content.content_area}</td>
                                    <td>{content.content_title}</td>
                                    <td>{content.date}</td>
                                    <td>
                                    { content.status === 0 ? <span>Pending</span> : (content.status === 2 ? <span>Recommended</span> : <span>Rejected</span>)}
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <button onClick={() => setModalShow({st: true, content: content})}  className='btn btn-info btn-sm' type='button' style={{marginRight: '5px'}}><i className="fas fa-eye"></i></button>
                                            {
                                                content.status === 0 &&
                                                <button className='btn btn-success btn-sm' style={{marginRight: '5px'}} onClick={() => handleRecommendContent(content._id)}>
                                                    <i className="fas fa-check"></i>
                                                </button>
                                            }
                                            {
                                                content.status === 0 &&
                                                <button className='btn btn-danger btn-sm' onClick={() => handleRejectContent(content._id)}>
                                                    <i className="fa fa-ban" aria-hidden="true"></i>
                                                </button>
                                            }
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                            { sL === 0 &&
                            <tr>
                                <td colSpan={6}>
                                    <Spinner className="text-center" animation="border" variant="danger" />
                                </td>
                            </tr>
                            }
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

export default ContentSorting;