import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Alert, Button, Image, Spinner } from 'react-bootstrap'
import './Classifier.css'
import axios from 'axios'

const Classifier = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [recentImage, setRecentImage] = useState(null)

    const onDrop = (files) => {
        const filteredFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
        if (filteredFiles.length) {
            // console.log(filteredFiles[0].name)
            // setFiles(filteredFiles)
            setFiles([])
            setRecentImage(null)
            setLoading(true)
            loadImage(filteredFiles)
        }
        else {
            setFiles([])
            setLoading(false)
            setRecentImage(null)
        }
    }

    const loadImage = (files) => {
        setTimeout(() => {
            setFiles(files)
            setLoading(false)
        }, 1000);
    }

    const actiateSpinner = () => {
        setFiles([])
        setLoading(true)
    }

    const deactivateSpinner = () => {
        setLoading(false)
    }

    const sendImage = () => {
        actiateSpinner()
        let formData = new FormData()
        console.log("Filename: " + files[0].name)
        console.log(files[0])
        formData.append('picture', files[0], files[0].name)
        axios.post('http://127.0.0.1:8000/api/images/', formData, {
            headers: {
                'accept': 'application/json',
                'content-type': 'multipart/form-data',
            }
        }).then(res => {
            getImageClass(res)
            console.log(res.data.id)
        }).catch(err => {
            console.log("Sending image to data error: " + err)
        })
    }

    const getImageClass = (obj) => {
        axios.get(`http://127.0.0.1:8000/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json'
            }
        }).then(res => {
            setRecentImage(res)
            console.log(res)
        }).catch(err => {
            console.log("Getting Image Error: " + err)
        })
        deactivateSpinner()
    }

    const filesList = files && files.map(file => {
        return (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        );
    });

    return (
        <Dropzone onDrop={onDrop} accept="image/png">
            {({ isDragActive, getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps({ className: 'dropzone back' })}>
                        <input {...getInputProps()} />
                        <i className="far fa-image mb-2 text-muted" style={{ fontSize: 100 }}></i>
                        <p className='text-muted'>{isDragActive ? "Drop the files" : "Drag 'n' drop some files here, or click to select files"}</p>
                    </div>
                    <aside>
                        {filesList}
                    </aside>
                    {
                        files.length > 0 &&
                        <Button variant='info' size='lg' className='mt-3' onClick={sendImage}>Select Image</Button>
                    }

                    {
                        loading &&
                        <Spinner animation="border" role="status"></Spinner>
                    }

                    {
                        recentImage &&
                        <React.Fragment>
                            <Alert variant='primary'>
                                {recentImage.data.classified}
                            </Alert>
                            <Image className='justify-content-center' src={recentImage.data.picture} height='200' rounded />
                        </React.Fragment>
                    }

                </section>
            )}
        </Dropzone >
    );
}

export default Classifier;

