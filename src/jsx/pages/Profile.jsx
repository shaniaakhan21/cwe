import { useState } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { CountryDropdown } from 'react-country-region-selector';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './Profile.css'

const Profile = () => {
    const sampleUser = {
        name: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        dateOfBirth: '1990-01-01',
        companyName: 'Example Inc.',
        country: 'United States',
        phoneNumber: '123-456-7890',
        address: '123 Example Street, NY',
        vat: 'US123456789',
    };

    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [userDetails, setUserDetails] = useState({
        ...sampleUser,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleEditToggle = () => {
        if (editMode) {
            setUserDetails({
                ...userDetails,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
        setEditMode(!editMode);
    };

    const formatDateToYYYYMMDD = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const formatDateToDDMMYYYY = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
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

    const handleSave = () => {
        handleOpenSnackbar('Profile Updated Successfully!');
        setEditMode(false);
    };

    const dateOfBirth = userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth) : null;
    const formattedDate = dateOfBirth ? formatDateToYYYYMMDD(dateOfBirth) : '';
    const formattedDatespan = dateOfBirth ? formatDateToDDMMYYYY(dateOfBirth) : '';

    return (
        <div className='profile d-flex flex-column Info-page my-4 ml-4  mr-10 '>
            {/* <div className='d-flex justify-content-end'>
                <h4 className='text-[#F55937] text-lg cursor-pointer mb-4 sm:mb-0' onClick={handleEditToggle}>
                    {editMode ? 'Cancel Changes' : 'Edit Information'} <DriveFileRenameOutlineIcon />
                </h4>
            </div> */}
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
                        <label>Birthday</label>
                        {editMode ? (
                            <input
                                type="date"
                                value={formattedDate}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                className='bg-transparent border-b text-white border-[#F55937] py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px]'
                            />
                        ) : (
                            <span>{formattedDatespan}</span>
                        )}
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
                                classes="bg-transparent border-b border-[#F55937] py-1 w-full sm:w-10/12 text-[12px] sm:text-[22px] text-white"
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
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default Profile;
