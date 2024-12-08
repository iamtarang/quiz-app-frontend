/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'
import { AiFillDashboard } from 'react-icons/ai'
import { MdQuiz } from 'react-icons/md'
import { CiMemoPad, CiStreamOn } from 'react-icons/ci'
import { PiStudentFill } from 'react-icons/pi';
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useAuth from '../../hooks/useAuth';


const Layout = () => {

    const navigate = useNavigate()

    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();


    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 

        localStorage.clear()
        sessionStorage.clear()
        setAuth({});
        navigate('/login', { replace: true })
    }

    const [sidebarClassName, setSidebarClassName] = useState('');
    const [currentLocation, setCurrentLocation] = useState("")

    useEffect(() => {
        const handleSidebarToggle = () => {
            setSidebarClassName(prevClassName =>
                prevClassName ? '' : 'sb-sidenav-toggled'
            );
        };

        const sidebarToggle = document.body.querySelector('#sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', handleSidebarToggle);
        }

        return () => {
            if (sidebarToggle) {
                sidebarToggle.removeEventListener('click', handleSidebarToggle);
            }
        };
    }, []);

    useEffect(() => {
        document.body.className = sidebarClassName;
        localStorage.setItem('sb|sidebar-toggle', sidebarClassName === 'sb-sidenav-toggled' ? 'true' : 'false');
    }, [sidebarClassName]);

    return (
        <>
            <div className="sb-nav-toggled">
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    {/* <!-- Layout Brand--> */}
                    {
                        auth?.role == 1
                            ?
                            <Link to={'/dashboard'} className="navbar-brand ps-3">Quiz-App Admin</Link>
                            :
                            <></>
                    }
                    {
                        auth?.role == 2
                            ?
                            <Link to={'/dashboard'} className="navbar-brand ps-3">Quiz-App Faculty</Link>
                            :
                            <></>
                    }

                    {/* <!-- Sidebar Toggle--> */}
                    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className='d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0'></div>
                    {/* <!-- Layout--> */}
                    <Nav className="ms-auto ms-md-0 me-3 me-lg-4">
                        <NavDropdown title={<FaUserCircle size={25} className='mb-1 me-2' color='white' />} id="navbarDropdown">
                            <NavDropdown.Item as={'button'} onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </nav>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav" className='mh-100'>
                        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                            <div className="sb-sidenav-menu">
                                <div className="nav">
                                    <div className="sb-sidenav-menu-heading">Core</div>
                                    <NavLink to={"/dashboard/"} className="nav-link">
                                        <div className="sb-nav-link-icon"><AiFillDashboard size={18} /></div>
                                        Dashboard
                                    </NavLink>
                                    {
                                        auth?.role == 1
                                            ?
                                            <>
                                                <div className="sb-sidenav-menu-heading">User Operations</div>
                                                <NavLink to={"/dashboard/upload-students"} className="nav-link">
                                                    <div className="sb-nav-link-icon"><PiStudentFill size={18} /></div>
                                                    Add New Students
                                                </NavLink>
                                                <NavLink to={"/dashboard/"} className="nav-link">
                                                    <div className="sb-nav-link-icon"><CiStreamOn size={18} /></div>
                                                    Manage Students
                                                </NavLink>
                                            </>
                                            :
                                            <></>
                                    }
                                    {
                                        auth?.role == 2
                                            ?
                                            <>
                                                <div className="sb-sidenav-menu-heading">Quiz Operations</div>
                                                <NavLink to={"/dashboard/create-quiz"} className="nav-link">
                                                    <div className="sb-nav-link-icon"><MdQuiz size={18} /></div>
                                                    Create New Quiz
                                                </NavLink>
                                                <NavLink to={"/dashboard/results"} className="nav-link">
                                                    <div className="sb-nav-link-icon"><CiMemoPad size={18} /></div>
                                                    Results
                                                </NavLink>
                                                <NavLink to={"/dashboard/add-questions"} className="nav-link">
                                                    <div className="sb-nav-link-icon"><CiStreamOn size={18} /></div>
                                                    Add Questions
                                                </NavLink>
                                            </>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <div className="sb-sidenav-footer">
                                <div className="small">Logged in as:</div>
                                {auth?.name}
                            </div>
                        </nav>
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <Outlet context={setCurrentLocation} />
                        </main>
                        <footer className="py-4 bg-light mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright &copy; Quiz App</div>
                                    <div>
                                        <a href="#">Privacy Policy</a>
                                        &middot;
                                        <a href="#">Terms &amp; Conditions</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;