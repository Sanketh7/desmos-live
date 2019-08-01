import React from 'react';
import './css/BlackOut.css';

function BlackOut(props) {
    return (
        <div class="black-out">
            <h1 class="black-out-text">{props.text}</h1>
        </div>
    );
}

export default BlackOut;