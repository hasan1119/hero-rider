import React from 'react';
import './Banner.css'

const Banner = () => {
    return (
        <div className="banner-container">
            <div className="row d-flex justify-content-center align-items-center banner">
                <div className="col-md-6">
                    <h1 className="text-light banner-text"> It’s your city. Let’s discover it all over again.</h1>
                    <div className="text-center mt-3">
                        <button className="btn btn-banner">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;