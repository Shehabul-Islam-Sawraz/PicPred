import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";

const ImageList = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        getImages()
    }, [])

    const getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(res => {
            setImages(res.data)
            console.log(res)
        })
    }

    const imagesList = images.map(img => {
        return (
            <Image key={img.id} pic={img.picture} class={img.classified} />
        )
    })

    return (
        <div>
            <h1> Image List</h1>
            {imagesList}
        </div>
    );
};

export default ImageList;