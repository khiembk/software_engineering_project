import React, { useState } from 'react';

import { fetchFunction } from '../utils/Fetch';
import { useAuth } from '../hooks/useAuth';
import moment from 'moment-timezone';
import { Pagination } from '@mui/material';

const FeeList2 = ({ items,setFeeList }) => {
    const { user } = useAuth();
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(1);
    const [openPopover, setOpenPopover] = useState(false);
    const [feeid,setFeeId]=useState("")
    const[password,setPassword]=useState("")
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);


   
    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteFee = async () => {
        try {
          const response = await fetchFunction({
            reqType: "/Fee/Delete",
            RootId: user.UserId,
            RootPassword: password,
            accessToken: user.token,
            FeeId: feeid
          });
          
          if (response.code === "200") {
            const updatedUserList = items.filter((fee) => fee.feeId != feeid);
            setFeeList(updatedUserList);
          } else {
            window.alert("Bạn đã nhập sai mật khẩu, vui lòng thao tác lại")
            console.log({ message: "delete fee fail? code !== 200", data: response });
          }
        } catch (error) {
          console.log("Failed to delete fee.", error);
        }
      };
      
    const click_Btn = async (e, feeId) => {
        e.preventDefault();
        try{
            const respond = await fetchFunction({
                reqType: '/CompleteFee',
                UserId: user.UserId,
                accessToken: user.token,
                FeeId: feeId
            });
            if(respond.code === "200"){
                console.log("success");
                window.location.reload();
            }
            else{
                console.log({message: "fail"});
            }
        }
        catch(error){
            console.log("error?!");
        }
    };

    return (
        <div style={{margin: '10px'}}>
            <table className="mt-4 table w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-2"> Mã phí </th>
                        <th className="py-2 px-4 border-2"> Mã hộ áp dụng </th>
                        <th className="py-2 px-4 border-2"> Tên phí </th>
                        <th className="py-2 px-4 border-2"> Chi tiết </th>
                        <th className="py-2 px-4 border-2"> Số tiền cần nộp </th>
                        <th className="py-2 px-4 border-2"> Ngày tạo </th>
                        <th className="py-2 px-4 border-2"> Thao tác </th>
                        <th className="py-2 px-4 border-2"> Trạng thái  </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border-2">{item.feeId}</td>
                        <td className="px-4 py-2 border-2">{item.familyId}</td>
                        <td className="px-4 py-2 border-2">{item.feeName}</td>
                        <td className="px-4 py-2 border-2">{item.detail}</td>
                        <td className="px-4 py-2 border-2">{item.money}</td>
                        <td className="px-4 py-2 border-2">{moment.utc(item.dateCreate).tz('Asia/Bangkok').format("DD/MM/YYYY")}</td>
                        <td className="px-4 py-2 border-2">
                        <button className="hover:text-gray-400 flex justify-center items-center w-[72px] h-7 bg-red-600 font-bold text-white rounded-md" onClick={()=>{setOpenPopover(true); setFeeId(item.feeId)}}> Delete</button>
                        </td>
                        <td className="px-4 py-2 border-2">{item.isComplete}</td>
                        {!item.isComplete && <button className='hover:text-red-500 text-[18px] hover:scale-[110%] mr-6 flex justify-center items-center text[18px] font-bold mt-1 rounded-md w-[140px] h-8 border-2 border-gray-200' style={{marginLeft: '10px'}} onClick={(e) => click_Btn(e, item.feeId)}>Thanh toán</button>}
                        
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />

            {openPopover && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-md">
      <input
        className="border-2 rounded-md px-4 py-2 mr-2"
        type="password"
        placeholder="Xác thực mật khẩu Admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => {
          if (password === "") {
            window.alert("Mật khẩu rỗng, yêu cầu nhập lại");
          } else {
            setOpenPopover(false);
            deleteFee(feeid);
          }
        }}
      >
        OK
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        type="button"
        onClick={() => setOpenPopover(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
        </div>
    );
};

export default FeeList2;