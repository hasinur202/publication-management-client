import React, { useState } from 'react';
import 'react-bootstrap-drawer/lib/style.css';
import './Dashboard.css';
import DashboardHome from '../DashboardHome/DashboardHome';
import ContentAreaList from '../ContentArea/ContentAreaList';
import ManageOrder from '../ManageOrder/ManageOrder';
import MyOrder from '../MyOrder/MyOrder';
import {
    Button,
	Col,
	Collapse,
	Container,
	Nav,
	Navbar,
	Row,
} from 'react-bootstrap';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import { Drawer } from 'react-bootstrap-drawer';
import useAuth from '../../../hooks/useAuth';
import AdminRoute from '../../Login/AdminRoute/AdminRoute';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import Pay from '../Pay/Pay';
import AddContentArea from '../ContentArea/AddContentArea';
import AdminList from '../MakeAdmin/AdminList';
import MakeEditor from '../MakeEditor/MakeEditor';
import MyPublication from '../MyPublication/MyPublication';
import EditorRoute from '../../Login/EditorRoute/EditorRoute';
import ContentSorting from '../ContentSorting/ContentSorting';
import ContentApproval from '../ContentApproval/ContentApproval';

const Dashboard = () => {
    let { path, url } = useRouteMatch();
	const [open, setOpen] = useState(false);
    const { admin, editor, user, logOut } = useAuth();

	const handleToggle = () => setOpen(!open);

    return (
        <>
            <Navbar bg="primary" className='TopBar' variant="dark">
                <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row className="flex-xl-nowrap">
                    <Col xs={ 12 } md={ 3 } lg={ 2 } className="p-0">
                        <Drawer>
                            <Drawer.Toggle onClick={ handleToggle } />
                            <Collapse in={ open }>
                                <Drawer.Overflow>
                                    <Drawer.ToC>
                                        <Nav.Link className="dashboard" as={Link} to="/">
                                            <i className="fa fa-home" aria-hidden="true"></i> Publication Management
                                        </Nav.Link>

                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/dashboardHome`}>
                                                <i className="fas fa-circle"></i> Dashboard
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        {admin && 
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/user-list`}>
                                                <i className="fas fa-circle"></i> Manage User
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                        {admin && 
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/manage-all-orders`}>
                                                <i className="fas fa-circle"></i> Manage All Orders
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                        {admin && 
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/content-area-list`}>
                                                <i className="fas fa-circle"></i> Publication Content Areas
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                       {admin && 
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/content-approval`}>
                                                <i className="fas fa-circle"></i> Content Approval
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                        {editor &&
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/content-sorting`}>
                                                <i className="fas fa-circle"></i> Content Sorting & Recommend
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                        {/* {!admin && !editor &&
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/payment`}>
                                                <i className="fas fa-circle"></i> Pay
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        } */}
                                        {!admin && !editor &&
                                            <Drawer.Nav>
                                                <Nav.Link className="nav-item" as={Link} to={`${url}/my-publications`}>
                                                    <i className="fas fa-circle"></i> My Publications
                                                </Nav.Link>
                                            </Drawer.Nav>
                                        }
                                        {!admin && !editor &&
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/my-orders`}>
                                                <i className="fas fa-circle"></i> My Orders
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        }
                                        {/* {!admin && 
                                        <Drawer.Nav>
                                            <Nav.Link className="nav-item" as={Link} to={`${url}/review`}>
                                                <i className="fas fa-circle"></i> Review
                                            </Nav.Link>
                                        </Drawer.Nav>
                                        } */}
                                        {user.email && 
                                            <Button onClick={logOut} className="btn-sm px-2 mt-3" variant="light">Logout</Button>
                                        }
                                    </Drawer.ToC>
                                </Drawer.Overflow>
                            </Collapse>
                        </Drawer>
                    </Col>
                    <Col xs={ 12 } md={ 9 } lg={ 10 }>
                        <Switch>
                            <Route exact path={path}>
                                <DashboardHome></DashboardHome>
                            </Route>
                            <Route path={`${path}/dashboardHome`}>
                                <DashboardHome></DashboardHome>
                            </Route>
                            <AdminRoute path={`${path}/content-area-list`}>
                                <ContentAreaList></ContentAreaList>
                            </AdminRoute>
                            <AdminRoute path={`${path}/add-content-area`}>
                                <AddContentArea></AddContentArea>
                            </AdminRoute>
                            <AdminRoute path={`${path}/add-admin`}>
                                <MakeAdmin></MakeAdmin>
                            </AdminRoute>
                            <AdminRoute path={`${path}/add-editor`}>
                                <MakeEditor></MakeEditor>
                            </AdminRoute>
                            <AdminRoute path={`${path}/user-list`}>
                                <AdminList></AdminList>
                            </AdminRoute>
                            <AdminRoute path={`${path}/content-approval`}>
                                <ContentApproval></ContentApproval>
                            </AdminRoute>
                            <EditorRoute path={`${path}/content-sorting`}>
                                <ContentSorting></ContentSorting>
                            </EditorRoute>
                            <Route exact path={`${path}/my-publications`}>
                                <MyPublication></MyPublication>
                            </Route>

                            <AdminRoute path={`${path}/manage-all-orders`}>
                                <ManageOrder></ManageOrder>
                            </AdminRoute>
                            <Route exact path={`${path}/my-orders`}>
                                <MyOrder></MyOrder>
                            </Route>
                            <Route exact path={`${path}/payment/:orderId`}>
                                <Pay></Pay>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;