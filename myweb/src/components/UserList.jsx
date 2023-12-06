import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Pagination } from '@mui/material';

const UserList = ({ items }) => {
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

    return (
        <div style={{margin: '10px'}}>
            <table className="mt-4 table w-full">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-2"> Số CCCD </th>
                        <th className="py-2 px-4 border-2"> Họ tên </th>
                        <th className="py-2 px-4 border-2"> Ngày sinh </th>
                        <th className="py-2 px-4 border-2"> Số điện thoại </th>
                        <th className="py-2 px-4 border-2"> Mã hộ khẩu </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border-2">{item.userId}</td>
                        <td className="px-4 py-2 border-2">{item.userName}</td>
                        <td className="px-4 py-2 border-2">{moment.utc(item.dateOfBirth).tz("Asia/Bangkok").format("DD/MM/YYYY")}</td>
                        <td className="px-4 py-2 border-2">{item.phoneNumber}</td>
                        <td className="px-4 py-2 border-2">{item.familyId}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
        </div>
    );
};

export default UserList;