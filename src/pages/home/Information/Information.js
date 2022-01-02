import React from 'react';
import './Information.css';
import information1 from '../../../images/information/Pouce_Accueil.png';
import information2 from '../../../images/information/Car_Accueil.png';
import information3 from '../../../images/information/Pin_Accueil.png';
import information4 from '../../../images/information/Pouce_Accueil.png';


const Information = () => {
    return (
        <div className="container information-container">
            <div className="row mx-auto information-section">
                <div className="col-md-3 col-sm-12">
                    <div className="information-img mt-5 text-center">
                        <img src={information1} alt="" />
                    </div>

                    <div className="information-detail mb-5 pt-3 text-center">

                        <h4 className="information-title fw-bold">Sign up for free</h4>
                        <span className="information-text">Drivers and passengers don’t pay any registration or membership fee.</span>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <div className="information-img mt-5 text-center">
                        <img src={information2} alt="" />
                    </div>

                    <div className="information-detail mb-5 pt-3 text-center">

                        <h4 className="information-title fw-bold">Daily commute</h4>
                        <span className="information-text">Find a carpool buddy for your daily commute at no cost.</span>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <div className="information-img mt-5 text-center">
                        <img src={information3} alt="" />
                    </div>

                    <div className="information-detail mb-5 pt-3 text-center">

                        <h4 className="information-title fw-bold">Long distance rides</h4>
                        <span className="information-text">Post or book a ride everywhere in Teknaf to Tetulia.</span>
                    </div>
                </div>

                <div className="col-md-3 col-sm-12">
                    <div className="information-img mt-5 text-center">
                        <img src={information4} alt="" />
                    </div>

                    <div className="information-detail mb-5 pt-3 text-center">

                        <h4 className="information-title fw-bold">Online payment</h4>
                        <span className="information-text">Book and pay your seat online for long distance rides.</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Information;