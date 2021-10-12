/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from "file-saver";
import { SERVER_URL } from '../Utils/Constants';


function FileUpload() {

    const [name, setName] = useState('');
    const [file, setFile] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [formError, setFormError] = useState('');
    const [id, setId] = useState('');


    const handleNameChange = (e) => { setName(e.target.value) };
    const handleFileChange = (e) => { setFile(e.target.files[0]) };
    const handleSubmit = (data) => {
        setFormError('');
        if (!name || !file) {
            setFormError("Please fill in all the required fields");
        }
        else {
            uploadData();
        }
    };
    const downloadFile = async () => {
        console.log("here")
        const res = await axios.get(`${SERVER_URL}/get_details/${id}`, {
        }).catch((err) => {
            console.log("Error is--------" + err);
        });
        if (res && res.data.values.file_url) {
            saveAs(
                `${SERVER_URL}/${res.data.values.file_url}`
            );
        }
    };

    const uploadData = async (data) => {
        setIsUploaded(false);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        const response = await axios.post(`${SERVER_URL}/upload-file`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
        ).catch((err) => {
            console.log("Error is--------" + err);
        });
        if (response) {
            setId(response.data.values.id)
            setIsUploaded(true);
        }
    };

    return (
        <div>
            <div className="content-wrapper">
                <div>
                    <section id="app" style={{ paddingTop: 20 }} className="col-md-12">
                        <div style={{ paddingLeft: 20 }} className="card card-widget widget-user-2">
                            <section className="content-header">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="box">
                                            <div className="col-sm-8">
                                                <h4> <i className="fa fa-list-ul" />
                                                    File Upload
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="" style={{ float: 'center' }}>
                                    <div className="row">
                                        <div className="row" >
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label> Name</label>
                                                    <input type="text" name="name" required value={name} autoComplete="off" onChange={(e) => handleNameChange(e)} className="form-control" placeholder="Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label> Upload File</label>
                                                    <input type="file" name="fileName" onChange={(e) => handleFileChange(e)} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="error-msg col-lg-6">{formError}</div>
                                <div className=" col-lg-6 text-right">
                                    <a className="btn" style={{ borderRadius: 12, color: 'white', backgroundColor: 'forestgreen' }} onClick={() => { handleSubmit() }}> Upload </a>
                                </div>
                                {isUploaded ? <div className=" col-lg-6 text-right" style={{ paddingTop: 20 }}>
                                    <a className="btn btn-primary" onClick={() => { downloadFile() }}> DownLoad </a>

                                </div> : ""}
                            </section>
                        </div>
                    </section>
                </div >

            </div>
        </div>
    )
}

export default FileUpload
