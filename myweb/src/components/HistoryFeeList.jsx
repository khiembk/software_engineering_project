import React from 'react';

const HistoryFeeList = ({ items }) => {
  return (
    <div style={{margin: '10px'}}>
      <div className="flex" style={{marginBottom: '10px'}}>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Mã giao dịch</p>
        <p className="w-[15rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Tên phí</p>
        <p className="w-[30rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Chi tiết</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Số tiền</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Ngày thực hiện</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Trạng thái</p>
      </div>
      <ul>
        {items.map((item, index) => (
          <li className="flex" style={{marginBottom: '3px'}} key={index}>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.tid}</p>
            <p className="w-[15rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.fee.name}</p>
            <p className="w-[30rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.fee.detail}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.fee.money}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.date}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryFeeList;