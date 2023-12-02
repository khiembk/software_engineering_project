import React from 'react';

const FeeList = ({ items }) => {
  return (
    <div style={{margin: '10px'}}>
      <div className="flex" style={{marginBottom: '10px'}}>
        <p className="w-[15rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Tên phí</p>
        <p className="w-[30rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Chi tiết</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Số tiền</p>
        <p className="w-[10rem] border border-black px-1 py-1" style={{marginRight: '10px'}}>Hạn nộp</p>
        <p className="w-[6rem] px-1 py-1"/>
      </div>
      <ul>
        {items.map((item, index) => (
          <li className="flex" style={{marginBottom: '3px'}} key={index}>
            <p className="w-[15rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.name}</p>
            <p className="w-[30rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.detail}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.money}</p>
            <p className="w-[10rem] border border-gray-300 px-1 py-1" style={{marginRight: '10px'}}>{item.expirydate}</p>
            <button className="w-[6rem] font-semibold px-1 py-1 bg-transparent border border-gray-500 rounded hover:text-white hover:bg-gray-500 hover:border-transparent">Nộp ngay</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeeList;