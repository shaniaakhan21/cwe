import { useEffect, useState } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { CountryDropdown } from 'react-country-region-selector';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './Profile.css'
import axiosInstance from '../../services/AxiosInstance';

const Profile = () => {


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const getMe = async () => {
        try{
            const token = localStorage.getItem('token')
            if (token) {
               const response=  await axiosInstance.get("/api/user/me",
                     {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const user = response.data.user;

                const _userDetails = {
                    email : user.email,
                }

                if(user.personalInfo){
                    _userDetails.name = user.personalInfo.name;
                    _userDetails.lastName = user.personalInfo.lastName;
                    _userDetails.companyName = user.personalInfo.companyName;
                    _userDetails.country = user.personalInfo.country;
                    _userDetails.phoneNumber = user.personalInfo.phoneNumber;
                    _userDetails.address = user.personalInfo.address;
                }
                setUserDetails({ ... _userDetails});
            }



        } catch (error) {

            console.log(error)
        }

    };

    useEffect(() => {
        getMe();
    }, []);



    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('');
    const [userDetails, setUserDetails] = useState({});

    const handleEditToggle = () => {
        if (editMode) {
            setUserDetails({ ...userDetails});
        }
        setEditMode(!editMode);
    };


    const handleChange = (key, value) => {
        setUserDetails({ ...userDetails, [key]: value });
    };

    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        try{
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/user/updatePersonalInfo", {
                    personalInfo: {
                        name: userDetails.name,
                        lastName: userDetails.lastName,
                        companyName: userDetails.companyName,
                        country: userDetails.country,
                        phoneNumber: userDetails.phoneNumber,
                        address: userDetails.address,
                    },
                    passwordData: {
                        currentPassword,
                        newPassword,
                        confirmPassword,
                    }
                },
                     {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setSnackbarType('success');
            handleOpenSnackbar('Profile Updated Successfully!');
            setEditMode(false);
        } catch (error) {
            setSnackbarType('error');
            handleOpenSnackbar('Error while updating password, check your password and try again');
        }

 
    };

    return (
        <div className='profile d-flex flex-column Info-page my-4 ml-4  mr-10 '>
            <div className='d-flex justify-content-end'>
                <h4 className='text-[#F55937] text-lg cursor-pointer mb-4 sm:mb-0' onClick={handleEditToggle}>
                    {editMode ? 'Cancel Changes' : 'Edit Information'} <DriveFileRenameOutlineIcon />
                </h4>
            </div>
            <div className='d-flex flex-row rounded-lg pl-4 pt-4 my-2 pr-4 '>
                <div className="d-flex flex-column col-xl-4">
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>First Name:</label>
                        {editMode ? (
                            <input
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px]'
                                value={userDetails.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        ) : (
                            <span>{userDetails.name}</span>
                        )}
                    </div>
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Email</label>
                        <span className='w-fit' style={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userDetails.email}</span>
                    </div>

                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Company Name</label>
                        {editMode ? (
                            <input
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px]'
                                value={userDetails.companyName}
                                onChange={(e) => handleChange('companyName', e.target.value)}
                            />
                        ) : (
                            <span>{userDetails.companyName}</span>
                        )}
                    </div>

                </div>
                <div className='col-xl-4'>
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Last Name</label>
                        {editMode ? (
                            <input
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full text-[12px] sm:text-[22px]'
                                value={userDetails.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                            />
                        ) : (
                            <span>{userDetails.lastName}</span>
                        )}
                    </div>
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Phone Number</label>
                        {editMode ? (
                            <input
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full text-[12px] sm:text-[22px]'
                                value={userDetails.phoneNumber}
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                            />
                        ) : (
                            <span>{userDetails.phoneNumber}</span>
                        )}
                    </div>
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Country</label>
                        {editMode ? (
                            <CountryDropdown
                                value={userDetails.country}
                                onChange={(val) => handleChange('country', val)}
                                classes="bg-black border-b border-[#F55937] py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px] text-white"
                            />
                        ) : (
                            <span>{userDetails.country}</span>
                        )}
                    </div>
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Address</label>
                        {editMode ? (
                            <input
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px]'
                                value={userDetails.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                            />
                        ) : (
                            <span>{userDetails.address}</span>
                        )}
                    </div>

                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Current Password</label>
                        {editMode ? (
                            <input
                                type="password"
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full text-[12px] sm:text-[22px]'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        ) : (
                            <span>***************</span>
                        )}
                    </div>
                    {editMode && (
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>New Password</label>
                       
                            <input
                                type="password"
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full text-[12px] sm:text-[22px]'
                                value={newPassword}
                                placeholder='************'
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        
                    </div>
                    )}
                    {editMode && (
                    <div className="d-flex flex-column mb-4 justify-content-between">
                        <label>Confirm Password</label>
                        
                            <input
                                type="password"
                                className='bg-transparent border-b border-[#F55937] text-white py-1 w-full text-[12px] sm:text-[22px]'
                                value={confirmPassword}
                                placeholder='************'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                       
                    </div>
                     )}
                </div>
            </div>

           
            {editMode && (
                <div className='d-flex flex-column-reverse sm:flex-row justify-between mt-2'>
                    <div className='d-flex justify-start sm:justify-start'>
                        <h4 className='text-[#F55937] text-lg cursor-pointer' onClick={handleEditToggle}>
                            Cancel Changes <DriveFileRenameOutlineIcon />
                        </h4>
                    </div>
                    <div className='d-flex justify-end'>
                        <Button
                            onClick={handleSave}
                            variant='contained'
                            sx={{
                                backgroundColor: '#F55937',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#F55937',
                                },
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbarType}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Profile;
