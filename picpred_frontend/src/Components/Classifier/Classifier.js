import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Button, Spinner } from 'react-bootstrap'
import './Classifier.css'
import axios from 'axios'

const Classifier = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     getImages()
    // }, [])

    // const getImages = () => {
    //     axios.get('http://127.0.0.1:8000/api/images/', {
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     }).then(res => {
    //         console.log(res)
    //     })
    // }

    const onDrop = (files) => {
        const filteredFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
        if (filteredFiles.length) {
            console.log(filteredFiles[0].name)
            // setFiles(filteredFiles)
            setLoading(true)
            loadImage(filteredFiles)
        }
        else {
            setFiles([])
            setLoading(false)
        }
    }

    const loadImage = (files) => {
        setTimeout(() => {
            setFiles(files)
            setLoading(false)
        }, 1000);
    }

    const sendImage = () => {
        let formData = new FormData()
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
            console.log(res)
        }).catch(err => {
            console.log("Getting Image Error: " + err)
        })
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
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }

                </section>
            )}
        </Dropzone >
    );
}

export default Classifier;

