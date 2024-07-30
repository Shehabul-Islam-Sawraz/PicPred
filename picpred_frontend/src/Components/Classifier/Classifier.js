import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import './Classifier.css'

const Classifier = () => {
    const [files, setFiles] = useState(null)

    const onDrop = (files) => {
        const filteredFiles = files.filter(file => file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
        setFiles(filteredFiles)
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
                </section>
            )}
        </Dropzone >
    );
}

export default Classifier;

