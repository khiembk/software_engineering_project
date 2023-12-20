import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFunction } from '../utils/Fetch';
import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function ForgetPassword(){
    const navigate = useNavigate();

    const [UserID, setUserID] = useState('');
    const [UserOTP, setUserOTP] = useState('');
    const [FailAttempt, setAttempt] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;
  
    const handleClosePopover = () => {
      setAnchorEl(null);
      navigate("/login");
    };

    const otpBtn_Click = async () => {
        try{
            const response = await fetchFunction({
                reqType: "/ForgetPass/RequestOTP",
                UserId: UserID
            });

            if(response.code === "200"){
                setAttempt(null);
            }
            else{
                setAttempt(response.message);
            }
        }
        catch(error){
            console.log(error);
        }
    };

    const confirmBtn_Click = async (e) => {
        const buttonElement = e.currentTarget;
        try{
            const response = await fetchFunction({
                reqType: "/ForgetPass/VerifyOTP",
                UserId: UserID,
                Otp: UserOTP
            });

            if(response.code === "200"){
                setAttempt(null);
                setAnchorEl(buttonElement);

                setTimeout(() => {
                    setAnchorEl(null);
                    navigate("/login");
                }, 3000);
            }
            else{
                setAttempt(response.message);
            }
        }
        catch(error){
            console.log(error);
        }
    };

    return(<div>
        <h1 className="text-center text-gray-700 font-bold text-[2rem]" style={{marginBottom: '20px'}}>Hỗ trợ quên mật khẩu</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto w-[30rem]">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="userid">
                    Số CCCD
                </label>
                <input class={`shadow appearance-none border rounded ${UserID === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="userid" placeholder="Số CCCD" onChange={e => setUserID(e.target.value)}/>
                {UserID === "" && <p class="text-red-500 text-xs italic">Please enter your identification number.</p>}
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    OTP
                </label>
                <div className='flex'>
                    <input class={`shadow appearance-none border rounded ${UserOTP === "" && "border-red-500"} w-[74%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="otp" placeholder="OTP" onChange={e => setUserOTP(e.target.value)}/>
                    <button className='bg-blue-500 ml-5 w-[6rem] rounded text-white font-semibold hover:bg-blue-800 px-1' type='button' onClick={otpBtn_Click}>Get OTP</button>
                </div>
                {UserOTP === "" && <p class="text-red-500 text-xs italic mt-3">Please enter OTP.</p>}
            </div>
            <div class="flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={e => {confirmBtn_Click(e);}}>
                    Confirm
                </button>
            </div>
            {FailAttempt && <div className="text-red-500" style={{marginTop: "10px", textAlign: 'center'}}>{FailAttempt}</div>}
        </form>
        <Popover
            id={idPopover}
            open={openPopover}
            onClose={handleClosePopover}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
        >
            <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>Reset password successfully! Please check your email for the new password!</span></Typography>
        </Popover>
    </div>)
}