import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <section className="vh-100 bg-image">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-70">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-4">Login</h2>

                                        <form className="register-form" id="register-form" onSubmit={handleSubmit}>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input type="email" id="email" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input type="password" id="password" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="submit"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-light" id='btn'>Login</button>
                                            </div>

                                            <p className="text-center text-muted mt-2 mb-0">Don't have an account? <Link to="/"
                                                className="fw-bold text-body"><u>Register here</u></Link></p>

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

export default Login
