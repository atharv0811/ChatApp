import React from 'react'

const Register = () => {
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

                                        <form>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="name">Name</label>
                                                <input type="text" id="name" className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="email">Email</label>
                                                <input type="email" id="email" className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="phoneNo">Phone Number</label>
                                                <input type="number" id="phoneNo" className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="password">Password</label>
                                                <input type="password" id="password" className="form-control form-control-lg" />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="repeatePassword">Repeat your password</label>
                                                <input type="password" id="repeatePassword" className="form-control form-control-lg" />
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button"
                                                    className="btn btn-primary btn-block btn-lg gradient-custom-4 text-light">Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-2 mb-0">Have already an account? <a href="#!"
                                                className="fw-bold text-body"><u>Login here</u></a></p>

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
