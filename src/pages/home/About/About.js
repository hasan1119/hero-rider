import React from 'react';
import './About.css';
import about from '../../../images/About/about.jpg'

const About = () => {
    return (
        <div className="container  about-container my-5 pt-5">
            <div className="row mx-auto gx-5">
                <div className="col-md-6 col-sm-12 align-self-center py-5">
                    <div className="about-info">
                        <h1 className="about-title">Health and safety go
                            hand-in-sanitized-hand</h1>
                        <p className="about-text">We built our services with your safety in mind. You can see car and driver details right there in your app, share route and location info with friends, or request assistance in case of an emergency. And these days, we’re going the extra mile to help protect each other from COVID-19. You can count on a clean car, fresh air, and masked faces to keep riders and drivers happy and healthy.</p>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 py-5 ">
                    <div className="about-img">
                        <img src={about} className="img-fluid w-75" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;