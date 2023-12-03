import React, { useState } from "react";
import { Link } from 'react-router-dom';


function AdminHomePage() {
  const [title, setTitle] = useState("Quản lý thu phí");
  const [Fee, setFee] = useState([]);

  const content=()=>{
    if(title === "Quản lý thu phí") {
      return (<div className="ml-2 w-3/4 h-screen ">
      <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
       Thông tin chi tiết các phí hiện hành
      </h1>
      <Link to='/addfee' className="inline-block w-48 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
        Thêm loại phí mới
      </Link>

      <table className="mt-4 table  w-full h-screen ">
        <thead>
          <th className="py-2 px-4 border-2"> Mã phí </th>
          <th className="py-2 px-4 border-2"> Tên phí </th>
          <th className="py-2 px-4 border-2"> Hạn nộp </th>
          <th className="py-2 px-4 border-2"> Loại phí </th>
          <th className="py-2 px-4 border-2"> Tiến trình nộp phí  </th>
          <th className="py-2 px-4 border-2"> Thao tác  </th>
        </thead>
        <tbody></tbody>
      </table>
    </div>)
    } else {
      return(
      <div className="ml-2 w-3/4 h-screen ">
      <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
       Thông tin chi tiết các nhân khẩu
      </h1>
      <Link to='/addfee' className="inline-block w-52 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
        Thêm nhân khẩu mới
      </Link>

      <table className="mt-4 table  w-full h-screen ">
        <thead>
          <th className="py-2 px-4 border-2"> Mã Nhân khẩu </th>
          <th className="py-2 px-4 border-2"> Họ tên </th>
          <th className="py-2 px-4 border-2"> Ngày sinh </th>
          <th className="py-2 px-4 border-2"> Số Hộ khẩu </th>
          <th className="py-2 px-4 border-2"> Thao tác  </th>
        </thead>
        <tbody></tbody>
      </table>
    </div>)
    }
  }
  return (
    <div>
      <header className="w-full flex items-center pl-14 font-bold padding text-white bg-[#4FC3F7] h-12 text-3xl">
        {title}
      </header>

      <div className="flex">
        <div className="grid grid-rows-3 justify-center items-center w-1/5 h-screen bg-[#101F33] p-8">
          <Link to='/listuser' className= 'inline-block text-center hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4' onClick={(e)=>setTitle("Quản lý nhân khẩu")}>
            Quản lý nhân khẩu
          </Link>
          
          <Link to='/listfee' className="inline-block text-center hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4" onClick={(e)=>setTitle("Quản lý thu phí")}>
            Quản lý thu phí
          </Link>

          <button className="hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4">
            Đăng xuất
          </button>
        </div>

        {content()}
      </div>
    </div>
  );
}

export default AdminHomePage;