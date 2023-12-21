import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import LoadingScreen from "../components/LoadingScreen";
import { Popover } from '@mui/material';
import Typography from '@mui/material/Typography';
import moment from "moment-timezone";

function CreateBill() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [feeId, setFeeId] = useState('');
    const [familyId, setFamilyId] = useState('');
    const [money, setMoney] = useState('');
    const [detail, setDetail] = useState('');
    const [userIdSubmitted, setUserIdSubmitted] = useState('');
    const [message, setMessage] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = Boolean(anchorEl);
    const idPopover = openPopover ? 'simple-popover' : undefined;

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const addNewBillBtn_Click = async (e) => {
        try {
            const buttonElement = e.currentTarget;
            const response = await fetchFunction({
                reqType: "/Bill/Add", 
                RootId: user.UserId,
                accessToken: user.token,
                FeeId: feeId,
                Date: moment.utc().tz("Asia/Bangkok").format("YYYY/MM/DD"),
                Detail: detail,
                UserId: userIdSubmitted,
                Money: money,
                FamilyId: familyId
            });

            if(response.code === "200"){
                setMessage("Add new bill successfully!");
                setAnchorEl(buttonElement);
                setTimeout(() => {
                    setAnchorEl();
                    navigate("/admin/quanlythuphi");
                }, 2000);    
            }
            else{
                console.log("returned code != 200");
                setMessage("Add new bill failed?!");
                setAnchorEl(buttonElement);
                setTimeout(() => {
                    setAnchorEl();
                }, 2000);
            }
        } catch(err){
            console.log(err);
        }
    };

    return (
        <div className="mt-10 h-screen">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mx-auto mb-4 w-[30rem]">
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="oldpassword">
                    Mã phí
                </label>
                <input class={`shadow appearance-none border rounded ${feeId === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Enter Fee id" onChange={e => setFeeId(e.target.value)}/>
                {feeId === "" && <p class="text-red-500 text-xs italic">Please enter Fee Id.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Mã hộ
                </label>
                <input class={`shadow appearance-none border rounded ${familyId === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Enter Family Id" onChange={e => setFamilyId(e.target.value)}/>
                {familyId === "" && <p class="text-red-500 text-xs italic">Please enter Family Id.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Số tiền
                </label>
                <input class={`shadow appearance-none border rounded ${money === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Enter Money" onChange={e => setMoney(e.target.value)}/>
                {money === "" && <p class="text-red-500 text-xs italic">Please enter Money.</p>}
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Chi tiết
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter detail" onChange={e => setDetail(e.target.value)}/>
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Số CCCD người nộp
                </label>
                <input class={`shadow appearance-none border rounded ${userIdSubmitted === "" && "border-red-500"} w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} placeholder="Enter User Id" onChange={e => setUserIdSubmitted(e.target.value)}/>
                {userIdSubmitted === "" && <p class="text-red-500 text-xs italic">Please enter UserId who submit the money.</p>}
                </div>
                <div className="flex justify-center">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={addNewBillBtn_Click}>
                        Xác nhận
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigate("/admin/quanlythuphi");}}>
                        Huỷ
                    </button>
                </div>
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
                <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>{message}</span></Typography>
            </Popover>
        </div>
    );
};

export default CreateBill;