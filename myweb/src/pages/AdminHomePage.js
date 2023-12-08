import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import FamilyList from '../components/FamilyList'
import UserList from "../components/UserList";
import FeeList2 from "../components/FeeList2";
import LoadingScreen from "../components/LoadingScreen";

import Avatar from '@mui/material/Avatar';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Home from "@mui/icons-material/Home";
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/Money';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';

function Header(props) {
      return (
          <div className="container h-[15%] bg-[#009BE5]">
              <div className="flex justify-end">
                <button>
                  <NotificationsIcon className='mt-3 text-2xl text-white'/>
                </button>
                <Avatar className="mt-3 mr-3 ml-3" src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </div>
               
              <div className="flex justify-between items-center mx-3">
              <h1 className="text-white text-[36px] text-bold">AdminHomePage</h1>
                <Link to='/admin/changepass/'className="hover:text-red-500 text-[18px] hover:scale-[120%] mr-6 flex justify-center text[18px] font-bold text-white rounded-md w-[140px] h-8 border-2 border-gray-200">
                    Đổi mật khẩu
                </Link>
              </div>
          </div>
      );
}




function AdminHomePage() {
  const [title, setTitle] = useState("Quản lý thu phí");
  const [familyList, setFamilyList] = useState();
  const [userList, setUserList] = useState();
  const [feeList, setFeeList] = useState();
  const { user, logout } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [searchFamilyIDValue, setSearchFamiLyIDValue] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePaymentStatusChange = (status) => setPaymentStatus(() => (paymentStatus === status ? null : status));
  
  const logoutBtn_Click = async e => {
      e.preventDefault();
      logout();
  }
  
  const fetchFamilyList = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Family/GetList", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        setFamilyList(list.data);
      }
      else{
        console.log({message: "get user list fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get family list fail?");
    }
  };

  const fetchUserList = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/GetListUser", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        setUserList(list.data);
      }
      else{
        console.log({message: "get user list fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get user list fail?");
    }
  };

  const fetchFeeList = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/Fee/getListFee", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        setFeeList(list.data);
      }
      else{
        console.log({message: "get user list fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get fee list fail?");
    }
  };

  const fetchFeeListByFamilyID = async () => {
    if(searchFamilyIDValue!=='') {
      if(paymentStatus===null) {
    try {
      const list = await fetchFunction({
        reqType: "/Fee/GetListFeeByFamily", 
        UserId: user.UserId,
        accessToken: user.token,
        FamilyId: searchFamilyIDValue
      });
  
      if (list.code == "200") {
        setFeeList(list.data);
      } else {
        console.error({ message: "Lấy danh sách phí thất bại", data: list });
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phí:", error);
    }
  } 
     else if(paymentStatus==='paid') {
      try {
        const list = await fetchFunction({
          reqType: "/Fee/GetListFeeByFamily/Complete", 
          UserId: user.UserId,
          accessToken: user.token,
          FamilyId: searchFamilyIDValue
        });
        
        if (list.code == "200") {
          setFeeList(list.data);
        } else {
          console.error({ message: "Lấy danh sách phí thất bại", data: list });
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phí:", error);
      }
     }
     else {
      try {
        const list = await fetchFunction({
          reqType: "/Fee/GetListFeeByFamily/NotComplete", 
          UserId: user.UserId,
          accessToken: user.token,
          FamilyId: searchFamilyIDValue
        });
        
        if (list.code == "200") {
          setFeeList(list.data);
        } else {
          console.error({ message: "Lấy danh sách phí thất bại", data: list });
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phí:", error);
      }
     }
  }
  else 
     {
        if(paymentStatus==='paid') {
          try {
            const list = await fetchFunction({
              reqType: "/Fee/getListFee/Complete", 
              UserId: user.UserId,
              accessToken: user.token,
            });
            
            if (list.code == "200") {
              setFeeList(list.data);
            } else {
              console.error({ message: "Lấy danh sách phí thất bại", data: list });
            }
          } catch (error) {
            console.error("Lỗi khi lấy danh sách phí:", error);
          }
        } 
        else if(paymentStatus==='unpaid') {
          try {
            const list = await fetchFunction({
              reqType: "/Fee/getListFee/NotComplete", 
              UserId: user.UserId,
              accessToken: user.token,
            });
            
            if (list.code == "200") {
              setFeeList(list.data);
            } else {
              console.error({ message: "Lấy danh sách phí thất bại", data: list });
            }
          } catch (error) {
            console.error("Lỗi khi lấy danh sách phí:", error);
          }
        } else {
          fetchFeeList()
        }
     }
  };
  

  useEffect(() => {
    fetchFamilyList();
    fetchUserList();
    fetchFeeList();
  }, []);

  const content=()=>{
    if(title === "Quản lý thu phí") {
      return (<div className="ml-8 mt-10 w-3/4 h-screen">
        <h1 className="text-center mb-5 text-2xl mt-4 font-bold text-[28px]">
        Thông tin chi tiết các phí hiện hành
        </h1>

        <div className=" w-full flex">
        <Link to='/admin/addfee' className=" h-10 w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Thêm khoản phí mới
        </Link>

        <form className="container w-2/3 mx-auto justify-center items-center">
      <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Tìm kiếm theo Mã Gia đình"
        id="FamilyId"
        value={searchFamilyIDValue}
        onChange={(e) => setSearchFamiLyIDValue(e.target.value)}
        className="w-full px-3 py-2 text-default border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
            <button
        type="button"
        className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={fetchFeeListByFamilyID}
      >
        <SearchIcon />
      </button>
      </div>

      <div className="flex items-center ml-3 mt-2">

    
<label className="mr-2">
  <input
    type="checkbox"
    checked={paymentStatus === 'paid'}
    onChange={() => handlePaymentStatusChange('paid')}
    className="mr-2 form-checkbox text-blue-500 focus:ring focus:border-blue-300"
  />
  <span className="text-blue-500">Đã thanh toán</span>
</label>


<label className="mr-2">
  <input
    type="checkbox"
    checked={paymentStatus === 'unpaid'}
    onChange={() => handlePaymentStatusChange('unpaid')}
    className="mr-2 form-checkbox text-red-500 focus:ring focus:border-red-300"
  />
  <span className="text-red-500">Chưa thanh toán</span>
</label>
      </div>

    </form>
      </div>
        

        <FeeList2 items={feeList}/>

      </div>)

    } else if(title === "Quản lý nhân khẩu"){
        return(
        <div className="ml-10 w-3/4 h-screen ">
        <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
        Thông tin chi tiết các nhân khẩu
        </h1>

        <div className="flex w-full h-12 items-center">
        <Link to='/admin/adduser' className="flex ml-3 content-center w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Thêm nhân khẩu mới
        </Link>
        
        <form className="flex w-2/3 mx-auto justify-center items-center">
      <input
        type="text"
        placeholder="Search by UserID,FullName"
        id='FamilyId'
        value={searchValue}
        onChange={(e)=> setSearchValue(e.target.value)}
        className="w-full px-3 py-2 text-default border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      <button type="submit" className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md">
        <SearchIcon/>
      </button>
      </form>
        </div>

        <UserList items={userList}/>
      </div>)
    } else{
        return(
        <div className="ml-8 w-3/4 h-screen ">
        <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
        Thông tin chi tiết các hộ khẩu
        </h1>
        <Link to='/admin/addfamily' className="inline-block w-52 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Thêm hộ khẩu mới
        </Link>
        
        <FamilyList items={familyList}/>
      </div>)
    }
  }
  return (
    <div className="flex ">
        <div className=" block fixed top-0 left-0 h-screen justify-center items-center w-[285px] bg-[#101F33] p-8 ">
          <div  className= ' w-52 h-20 flex items-center text-[#BDC2C7] font-bold py-2 px-4 rounded mb-10 mt-0' >
            <Home  style={{ fontSize: 50 }} />
            <h1 className="text-[32px] italic">Overview</h1>
         </div>
          <Link to='/admin/' className= 'hover:bg-gray-200 w-52 h-14 flex items-center hover:text-[#4FC3F7] text-[18px] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-10 mt-[50px]' onClick={(e)=>setTitle("Quản lý hộ khẩu")}>
          <PermMediaOutlinedIcon className="mr-2" /> 
            Quản lý hộ khẩu
          </Link>
          
          <Link to='/admin/' className="hover:bg-gray-200 w-56 h-14 flex items-center hover:text-[#4FC3F7] text-[18px] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-10" onClick={(e)=>setTitle("Quản lý nhân khẩu")}>
            <PeopleIcon className="mr-2" />
            Quản lý nhân khẩu
          </Link>

          <Link to='/admin/' className="hover:bg-gray-200 w-52 h-14 flex items-center hover:text-[#4FC3F7] text-[18px] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-10" onClick={(e)=>setTitle("Quản lý thu phí")}>
            <MoneyIcon className="mr-2"/> 
            Quản lý thu phí
          </Link>

          <button className="hover:bg-gray-200 w-52 h-14 flex items-center hover:bg- hover:text-[#4FC3F7] text-[#BDC2C7] text-[18px] font-bold py-2 px-4 rounded mb-10" onClick={logoutBtn_Click}>
            <LogoutIcon className="mr-2" />
            Đăng xuất
          </button>
        </div>

          <div className="container mr-0 ml-[285px] h-screen ">
              <Header/>
          {(userList && familyList && feeList) ? content() : (<LoadingScreen/>)}
          </div>

      </div>
  
  );
}

export default AdminHomePage;