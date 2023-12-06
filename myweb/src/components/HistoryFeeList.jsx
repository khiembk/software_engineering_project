import React, { useState } from 'react';
import moment from 'moment-timezone';

const HistoryFeeList = ({ items }) => {
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
      <div className="flex justify-center" style={{marginBottom: '10px'}}>
        <p className="w-[15rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Mã phí</p>
        <p className="w-[15rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Tên phí</p>
        <p className="w-[30rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Chi tiết</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Số tiền</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Ngày tạo</p>
      </div>
      <ul>
        {currentItems.map((item, index) => (
          <li className="flex justify-center" style={{marginBottom: '3px'}} key={index}>
            <p className="w-[15rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.feeId}</p>
            <p className="w-[15rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.feeName}</p>
            <p className="w-[30rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.detail}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.money}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{moment.utc(item.dateCreate).tz("Asia/Bangkok").format("DD/MM/YYYY")}</p>
          </li>
        ))}
      </ul>
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
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryFeeList;