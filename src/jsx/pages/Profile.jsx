import { useEffect, useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './Profile.css'
import axiosInstance from '../../services/AxiosInstance';

const Profile = () => {


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [token2FA, setToken2FA] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data2FA, setData2FA] = useState({});
    const [is2FAEnabled, setis2FAEnabled] = useState(undefined);

    const getMe = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await axiosInstance.get("/api/user/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                const user = response.data.user;

                const _userDetails = {
                    email: user.email,
                }

                if (!user.is2FAEnabled) {
                    const response = await axiosInstance.post("/api/user/create2FASecret", {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    console.log(response.data)
                    setData2FA(response.data);
                    setis2FAEnabled(false);
                } else {
                    setis2FAEnabled(true);
                }

                if (user.personalInfo) {
                    _userDetails.name = user.personalInfo.name;
                    _userDetails.lastName = user.personalInfo.lastName;
                    _userDetails.companyName = user.personalInfo.companyName;
                    _userDetails.country = user.personalInfo.country;
                    _userDetails.phoneNumber = user.personalInfo.phoneNumber;
                    _userDetails.address = user.personalInfo.address;
                }
                setUserDetails({ ..._userDetails });
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
            setUserDetails({ ...userDetails });
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
        try {
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

    const verify2FA = async () => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axiosInstance.post("/api/user/verify2FAToken", {
                    token: token2FA
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
            }
            setis2FAEnabled(true);
            setSnackbarType('success');
            handleOpenSnackbar('2FA Enabled Successfully!');
        } catch (error) {
            setSnackbarType('error');
            handleOpenSnackbar('Error while enabling 2FA, check your token and try again');
        }
    }


    return (
        <><div className='d-flex justify-content-end'>
            {editMode ? (
                <button className='text-black btn btn-success text-lg cursor-pointer mb-2 sm:mb-0' onClick={handleEditToggle}>
                    Exit edit mode
                </button>

            ) : (
                <button className='text-black btn btn-success text-lg cursor-pointer mb-2 sm:mb-0' onClick={handleEditToggle}>
                    Edit Information
                </button>
            )}

        </div><div className='profile d-flex flex-column Info-page ml-4  mr-10 border-yellow-02'>
                <div className='d-flex rounded-lg pl-4 pt-0 my-0 pr-4 mob-col'>
                    <div className="d-flex flex-column col-xl-12">
                        <div className="d-flex margii justify-content-between">
                            <label>Legal Name</label>
                            {editMode ? (
                                <input
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1'
                                    value={`${userDetails.name} ${userDetails.lastName}`}
                                    onChange={(e) => {
                                        const [name, lastName] = e.target.value.split(' ');
                                        setUserDetails({ ...userDetails, name, lastName });
                                    }} />
                            ) : (
                                <span>{`${userDetails.name} ${userDetails.lastName}`}</span>
                            )}
                        </div>
                        <div className="d-flex justify-content-between margii">
                            <label>Email</label>
                            {editMode ? (
                                <p className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '>{userDetails.email}</p>
                            ) : (
                                <span className='w-fit' style={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userDetails.email}</span>
                            )}
                        </div>

                        <div className="d-flex margii justify-content-between">
                            <label>Company Name</label>
                            {editMode ? (
                                <input
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={userDetails.companyName}
                                    onChange={(e) => handleChange('companyName', e.target.value)} />
                            ) : (
                                <span>{userDetails.companyName}</span>
                            )}
                        </div>

                        <div className="d-flex margii justify-content-between">
                            <label>Address</label>
                            {editMode ? (
                                <input
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={userDetails.address}
                                    onChange={(e) => handleChange('address', e.target.value)} />
                            ) : (
                                <span>{userDetails.address}</span>
                            )}
                        </div>
                        <div className="d-flex margii justify-content-between">
                            <label>Country</label>
                            {editMode ? (
                                <CountryDropdown
                                    value={userDetails.country}
                                    onChange={(val) => handleChange('country', val)}
                                    classes="bg-greyish input-edit py-1  text-greyish" />
                            ) : (
                                <span>{userDetails.country}</span>
                            )}
                        </div>

                        <div className="d-flex margii justify-content-between">
                            <label>Phone Number</label>
                            {editMode ? (
                                <input
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={userDetails.phoneNumber}
                                    onChange={(e) => handleChange('phoneNumber', e.target.value)} />
                            ) : (
                                <span>{userDetails.phoneNumber}</span>
                            )}
                        </div>

                        <div className="d-flex margii justify-content-between">
                            <label>Current Password</label>
                            {editMode ? (
                                <input
                                    type="password"
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={currentPassword}
                                    placeholder='************'
                                    onChange={(e) => setCurrentPassword(e.target.value)} />
                            ) : (
                                <span>***************</span>
                            )}
                        </div>
                        {editMode && (
                            <div className="d-flex margii justify-content-between">
                                <label>New Password</label>

                                <input
                                    type="password"
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={newPassword}
                                    placeholder='************'
                                    onChange={(e) => setNewPassword(e.target.value)} />

                            </div>
                        )}
                        {editMode && (
                            <div className="d-flex margii justify-content-between">
                                <label>Confirm Password</label>

                                <input
                                    type="password"
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={confirmPassword}
                                    placeholder='************'
                                    onChange={(e) => setConfirmPassword(e.target.value)} />

                            </div>
                        )}

                    </div>
                    {/* <div className='col-xl-4'>
        
    </div> */}
                </div>


                {editMode && (
                    <div className='d-flex justify-start mt-2 w-100 mb-55'>
                        <div className='d-flex justify-start w-11-35'>
                            <Button
                                onClick={handleSave}
                                variant='contained'
                                className='save-chn'
                            >
                                Save Changes
                            </Button>
                        </div>
                        <div className='w-15-47 d-flex justify-content-start'>
                            <Button
                                onClick={handleEditToggle}
                                variant='contained'
                                className='cancel-chng'
                            >
                                Cancel Changes
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

            <div className='profile d-flex flex-column Info-page ml-4  mr-10 border-yellow-02 mt-3' style={{ marginBottom: 20 }}>
                <div className='rounded-lg pl-4 pt-0 my-0 pr-4 mob-col'>
                    <h3>2FA</h3>
                    {is2FAEnabled === false && (
                        <>
                            <h5>To Enable 2FA please scan the QR code with your authenticator app and input the code to confirm it.</h5>
                            <div>
                                <img src={data2FA.url} />
                            </div>
                            <div style={{ marginTop: 20 }}>
                                KEY: {data2FA.secret}
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <input
                                    type="text"
                                    name="code"
                                    className='input-edit bg-transparent border-b border-[#F55937] text-greyish py-1 '
                                    value={token2FA}
                                    style={{ width: 200 }}
                                    autoComplete='false'
                                    onChange={(e) => setToken2FA(e.target.value)} />
                            </div>
                            <button style={{ marginTop: 10 }} className='text-black btn btn-success text-lg cursor-pointer mb-2 sm:mb-0' onClick={() => { verify2FA() }}>
                                Enable Now
                            </button>
                        </>
                    )}
                    {is2FAEnabled === true && (
                        <>
                            <h5>2FA is enabled <span>&#10003;</span></h5>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
