import React from "react";
import background from '../../assets/img/backgroundWave3.svg'

export default function Background(props) {
    const containerStyle = {
        width: '100%',
        height: '100%',
        background: `url(${background}) repeat center center`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    return (
        React.createElement('div', { style: containerStyle },
            props.children
        )
    );
}
