import React from 'react';
import './Features.css';
import driver1 from '../../../images/features/driver/auto.png';
import driver2 from '../../../images/features/driver/Passager.png';
import driver3 from '../../../images/features/driver/Paiement.png';
import { NavLink } from 'react-router-dom';
import learner1 from '../../../images/features/learner/lieu.png';
import learner2 from '../../../images/features/learner/Credit_Accueil.png';
import learner3 from '../../../images/features/learner/musique.png';



const Features = () => {
    return (
        <div className="container">
            <div className="row mt-5 ">
                <div className="col-sm-12 col-md-6 ">

                    <div className="mb-3 mx-auto features-card">
                        <div className="row">
                            <h1 className="features-title mt-3">Become A Rider</h1>
                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={driver1} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Offer a ride share for your local commute or long distance trips</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 mx-auto features-card">
                        <div className="row">

                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={driver2} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Fill your empty seats with passengers to share a ride</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 mx-auto ">
                        <div className="row features-card">

                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={driver3} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Save hundreds of taka's per month and have fun riding with new friends</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <NavLink to="/JoinAsRider" className="p-2 w-50 btn btn-features">Join As A Rider</NavLink>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 ">

                    <div className="mb-3 mx-auto features-card">
                        <div className="row">
                            <h1 className="features-title mt-3">Become A Learner</h1>
                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={learner1} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Choose your location. More than 30 locations in the Puget Sound region.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 mx-auto features-card">
                        <div className="row">

                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={learner2} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Book and pay online or request to learn how to drive</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3 mx-auto ">
                        <div className="row features-card">

                            <div className="col-md-2 col-sm-12">
                                <img className="w-100 rounded-start m-5" src={learner3} alt="" />
                            </div>

                            <div className="col-md-10 col-sm-12 align-self-center">
                                <div className="features-text ">
                                    <p className="m-5">Get The Training, Take The Test</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <NavLink to="/joinAsLearner" className="p-2 w-50 btn btn-features">Join As A Learner</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;