import React from "react";
import { Card } from "react-bootstrap";

const Image = (props) => {
    return (
        <Card style={{ width: '24rem' }} className="mx-auto mb-3 mt-3">
            <Card.Img variant="top" src={props.pic} />
            <Card.Body>
                <Card.Title>Classified as: {props.class}</Card.Title>
            </Card.Body>
        </Card>
    )
};

export default Image;