import React from 'react';

function Register() {


    return (
        <div className="Register">

            <div className="row justify-content-center">
                <div className="col-lg-12 justify-content-center">
                    <div className="card o-hidden border-0 shadow-lg my-5 justify-content-center text-center">

                        <div className="card-body p-0">
                            <div className = "row">
                                <div className = "col-lg-5 d-none d-lg-block">
                                    <img src="https://picsum.photos/id/180/445/909" style = {{ height: '100%', width: '100%'}} />
                                </div>
                                <div className="col-lg-7">
                                    <div className="p-5 ">
                                        <div className="text-center register-title m-3">
                                            Register !
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;
