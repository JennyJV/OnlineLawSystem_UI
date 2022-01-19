import React from "react";
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/banner.css';
class Banner extends React.Component {
    render() {
        return (
            <div>

            <div className='banner'>
                <div>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../Assets/banner.jpg').default}
                                        alt="First slide" height="400px"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../Assets/banner_1.jpg').default}
                                        alt="Second slide" height="400px"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../Assets/banner_2.jpg').default}
                                        alt="Third slide" height="400px"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={require('../Assets/banner_3.jpg').default}
                                        alt="Fourth slide" height="400px"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                    </div>
                    </div>
          
        )
    };
}
export default Banner;