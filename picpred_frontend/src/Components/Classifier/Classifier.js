import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Spinner } from 'react-bootstrap'
import './Classifier.css'

const Classifier = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)

    const onDrop = (files) => {
        const filteredFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
        if (filteredFiles.length) {
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
                        <p>{isDragActive ? "Drop the files" : "Drag 'n' drop some files here, or click to select files"}</p>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{filesList}</ul>
                    </aside>
                    {loading && files &&
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

