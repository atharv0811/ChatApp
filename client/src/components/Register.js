import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/user/register`, {
                    name,
                    email,
                    phoneNo,
                    password
                });
                if (response.data.result === 'success') {
                    alert('Registration Successfull!')
                    navigate('/login')
                }
                else if (response.data.result === "exist") {
                    alert("User already exists!");
                }
                else {
                    alert('Something went wrong!')
                }

            } catch (error) {
                console.log(error)
                alert('Something went wrong!')
            }
        } else {
            alert('Passwords do not match.');
        }
    }

    return (
        <>
            <section className="vh-100 bg-image">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-70">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                                        <form className="register-form" id="register-form" onSubmit={handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="name">Name</label>
                                                <input type="text" id="name" className="form-control form-control-lg" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="phoneNo">Phone Number</label>
                                                <input type="number" id="phoneNo" className="form-control form-control-lg" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="repeatePassword">Repeat your password</label>
                                                <input type="password" id="repeatePassword" className="form-control form-control-lg" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-light" id='btn'>Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-2 mb-0">Have already an account? <Link to="/login"
                                                className="fw-bold text-body"><u>Login here</u></Link></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register
