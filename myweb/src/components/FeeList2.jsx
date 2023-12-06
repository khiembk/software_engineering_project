import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFunction } from '../utils/Fetch';
import { useAuth } from '../hooks/useAuth';
import moment from 'moment-timezone';

const FeeList2 = ({ items }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const itemsPerPage = 5; // Adjust the number of items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                        <td className="px-4 py-2 border-2">{item.isComplete}</td>
                        {!item.isComplete && <button className='w-[6rem] font-semibold px-1 py-1 bg-transparent border border-gray-500 rounded hover:text-white hover:bg-gray-500 hover:border-transparent' style={{marginLeft: '10px'}} onClick={(e) => click_Btn(e, item.feeId)}>Thanh toán</button>}
                    </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '10px', textAlign: 'center', alignContent: '' }}>
                {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    style={{
                    margin: '3px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    background: currentPage === index + 1 ? '#eee' : 'transparent',
                    borderRadius: '1rem'
                    }}
                >{index + 1}
                </button>
                ))}
            </div>
        </div>
    );
};

export default FeeList2;