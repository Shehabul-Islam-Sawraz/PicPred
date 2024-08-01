import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "./Image";
import { Button, Spinner } from "react-bootstrap";

const ImageList = () => {
    const [images, setImages] = useState([])
    const [visible, setVisible] = useState(2)
    const [loading, setLoading] = useState(true)
    const [loadNew, setLoadNew] = useState(false)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        setTimeout(getImages, 1500);
    }, [])

    const getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(res => {
            setImages(res.data)
            setStatus(true)
            console.log(res)
        })
        setLoading(false)
    }

    const imagesList = images.slice(0, visible).map(img => {
        return (
            <Image key={img.id} pic={img.picture} class={img.classified} />
        )
    })

    const handleVisible = () => {
        const new_visible = visible + 2
        setLoadNew(true)
        setTimeout(() => {
            setVisible(new_visible)
            setLoadNew(false)
        }, 300)
    }

    return (
        <div>
            <h1 className="mt-3"> Image List</h1>

            {
                loading
                    ?
                    <Spinner animation="border" role="status" className="mt-2"></Spinner>
                    :
                    <React.Fragment>
                        {
                            images.length === 0 && status && <h3>No images classified!</h3>
                        }

                        {imagesList}

                        {
                            loadNew &&
                            <Spinner animation="border" role="status" className="mt-2"></Spinner>
                        }

                        {
                            !loading && !loadNew && (images.length > visible) && (images.length > 2) &&
                            <Button className="mb-4 mt-2" variant="primary" size="lg" onClick={handleVisible}>Load More</Button>
                        }

                        {
                            (images.length <= visible) && (images.length > 0) && <h3>No more images to load!!</h3>
                        }
                    </React.Fragment>
            }
        </div>
    );
};

export default ImageList;