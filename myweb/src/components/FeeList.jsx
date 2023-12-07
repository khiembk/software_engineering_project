import React, { useState } from 'react';
import moment from 'moment-timezone';
import { Pagination, Popover, Typography } from '@mui/material';

const FeeList = ({ items }) => {
  const itemsPerPage = 5; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'simple-popover' : undefined;

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{margin: '10px'}}>
      <div className="flex justify-center" style={{marginBottom: '10px'}}>
        <p className="w-[15rem] border-[2px] border-gray-500 px-1 py-1">Mã phí</p>
        <p className="w-[15rem] border-[2px] border-gray-500 px-1 py-1">Tên phí</p>
        <p className="w-[30rem] border-[2px] border-gray-500 px-1 py-1">Chi tiết</p>
        <p className="w-[10rem] border-[2px] border-gray-500 px-1 py-1">Số tiền</p>
        <p className="w-[10rem] border-[2px] border-gray-500 px-1 py-1">Ngày tạo</p>
        <p className="w-[6rem] ml-[5px] px-1 py-1"/>
      </div>
      <ul>
        {currentItems.map((item, index) => (
          <li className="flex justify-center mb-[1px]" key={index}>
            <p className="w-[15rem] border-[2px] border-gray-300 px-1 py-1">{item.feeId}</p>
            <p className="w-[15rem] border-[2px] border-gray-300 px-1 py-1">{item.feeName}</p>
            <p className="w-[30rem] border-[2px] border-gray-300 px-1 py-1">{item.detail}</p>
            <p className="w-[10rem] border-[2px] border-gray-300 px-1 py-1">{item.money}</p>
            <p className="w-[10rem] border-[2px] border-gray-300 px-1 py-1">{moment.utc(item.dateCreate).tz("Asia/Bangkok").format("DD/MM/YYYY")}</p>
            <button className="w-[6rem] font-semibold ml-[5px] px-1 py-1 bg-transparent border border-gray-500 rounded-[1rem] hover:text-white hover:bg-gray-500 hover:border-transparent" onClick={e => {setAnchorEl(e.currentTarget);}}>Nộp ngay</button>
          </li>
        ))}
      </ul>
      <Pagination className="flex justify-center mt-4" size="large" variant="outlined" color="primary" count={Math.ceil(items.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
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
        <Typography className='w-[40rem] text-center' sx={{ p: 2 }}><span className='font-semibold text-green-700'>Please contact admin to settle the payment!</span></Typography>
      </Popover>
    </div>
  );
};

export default FeeList;