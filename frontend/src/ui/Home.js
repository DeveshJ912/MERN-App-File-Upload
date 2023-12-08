import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UrlProvider } from '../config/urlProvider'
import { get, patch, post, postfordownload, postforfile } from '../config/apiService';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import FormFormatters from '../utils/form_formatters';
import { setLoader } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from './core/Loader';
const Home = () => {
    const [postImage, setPostImage] = useState({ myFile: "" })
    const userDetails = useSelector((state) => state.userState.user);
    const loggedIn = useSelector((state) => state.userState.loggedIn);
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = useState([]);
    const [file, setFile] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const paperStyle = { padding: 20, width: '80%', margin: '20px auto' }

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
        if (userDetails.profileImage) {
            setPostImage({ myFile: userDetails.profileImage })
        }
        getItems();
    }, [])


    const getItems = async () => {
        dispatch(setLoader(true));

        try {
            const res = await post(UrlProvider.getFiles, { username: userDetails.username });
            setItems(res.data);
            dispatch(setLoader(false));

        } catch (error) {
            toast.error(error)
            dispatch(setLoader(false));

        }
    };
    const downloadFile = async (id) => {
        setOpen(false);
        dispatch(setLoader(true));

        try {
            const res = await postfordownload(UrlProvider.downloadFile, { filename: id, username: userDetails.username, code });
            const blob = new Blob([res.data], { type: 'application/pdf' });
            // Create a link element and trigger a download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = res.filename; // You can customize the downloaded file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            toast.success("Your file is downloaded!");
            dispatch(setLoader(false));

        } catch (error) {
            toast.error(error)
            dispatch(setLoader(false));

        }
        setCode('');
    };

    const handleClickOpen = (data) => {
        setOpen(true);
        setSelectedFile(data);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 })
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const deleteFile = async (data) => {
        dispatch(setLoader(true));
        try {
            const resp = await post(UrlProvider.deleteFile, data);
            toast.success("File Deleted Successfully!");
            getItems();
            dispatch(setLoader(false));

        } catch (error) {
            toast.error(error);
            dispatch(setLoader(false));

        }
    }

    const uploadFile = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoader(true));

            const formData = new FormData();
            formData.append("username", userDetails.username);
            formData.append("file", file);
            const res = await postforfile(UrlProvider.uploadFile, formData);
            toast.info(`Your code to download file is ${res.code}`)
            toast.success("File Uploaded Successfully!");
            setFile('');
            getItems();
            dispatch(setLoader(false));

        } catch (error) {
            toast.error(error);
            dispatch(setLoader(false));

        }
    };


    return (
        <>
            <div className='section-content'>
                <div className='name-section' >
                    <h2>Hi, Welcome {userDetails.name}</h2>
                </div>
                <hr></hr>
                {!file &&
                    <Button className='mb-20' component="label" variant='contained' color='secondary'>
                        Select File
                        <VisuallyHiddenInput type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </Button>
                }
                {file &&
                    <div className='selected-file mb-20'>
                        <div className='selected-file-name' >{file.name} <span><CloseIcon onClick={() => setFile('')} className='icon-custom' /></span></div>
                        <Button component="label" variant="contained" disabled={!file} startIcon={<CloudUploadIcon />} onClick={uploadFile}>
                            Upload File
                        </Button>
                    </div>
                }
            </div>
            <hr className='section-content'></hr>


            {!items.length && <div className='name-section'>
                <h2>No files to display</h2>
                <h2>Please upload</h2>

            </div>}
            {items.length &&
                <div>
                    <Paper elevation={10} style={paperStyle}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><h3>File Name</h3></TableCell>
                                        <TableCell align="center"><h3>Download</h3></TableCell>
                                        <TableCell align="center"><h3>Delete</h3></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow
                                            key={item.transformedFilename}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {item.filename}
                                            </TableCell>
                                            <TableCell align="center"><DownloadIcon className='icon-custom' onClick={() => handleClickOpen(item.transformedFilename)} /></TableCell>
                                            <TableCell align="center"><DeleteIcon className='icon-custom' onClick={() => deleteFile(item)} /></TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>
            }

            <Dialog open={open} onClose={handleClose} datatype='fd'>
                <DialogTitle>Enter 6 Digit Code To Download File</DialogTitle>
                <DialogContent>

                    <TextField autoFocus margin="dense" id="digit" label="6 Digit Code" required onInput={FormFormatters.digitOnly(6)} onChange={(e) => setCode(e.target.value)} fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={code.length !== 6} onClick={() => downloadFile(selectedFile)}>Submit</Button>
                </DialogActions>
            </Dialog>
            <Loader />
        </>
    )
}

export default Home