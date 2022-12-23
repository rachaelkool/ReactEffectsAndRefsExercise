import React from "react";


function Card({name, image}) {
    return (
        <img alt={name} src={image} />
    );
}


export default Card
