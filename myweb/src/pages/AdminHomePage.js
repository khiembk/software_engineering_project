import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import FamilyList from '../components/FamilyList'
import UserList from "../components/UserList";
import FeeList2 from "../components/FeeList2";
import LoadingScreen from "../components/LoadingScreen";

function AdminHomePage() {
  const [title, setTitle] = useState("Quản lý thu phí");
  const [familyList, setFamilyList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [feeList, setFeeList] = useState([]);
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    try{
      setLoading(true);
      fetchFamilyList();
      fetchUserList();
      fetchFeeList();
    }
    finally{
      setLoading(false);
    }
  }, []);

  const content=()=>{
    if(title === "Quản lý thu phí") {
      return (<div className="ml-2 w-3/4 h-screen ">
        <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
        Thông tin chi tiết các phí hiện hành
        </h1>
        <Link to='/admin/addfee' className="inline-block w-48 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Thêm khoản phí mới
        </Link>

        <FeeList2 items={feeList}/>
      </div>)
    } else if(title === "Quản lý nhân khẩu"){
        return(
        <div className="ml-2 w-3/4 h-screen ">
        <h1 className="text-center mb-5 text-2xl mt-4 font-bold">
        Thông tin chi tiết các nhân khẩu
        </h1>
        <Link to='/admin/adduser' className="inline-block w-52 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
          Thêm nhân khẩu mới
        </Link>

        <UserList items={userList}/>
      </div>)
    } else{
        return(
        <div className="ml-2 w-3/4 h-screen ">
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
    <div>
      <header className="w-full flex items-center pl-14 font-bold padding text-white bg-[#4FC3F7] h-12 text-3xl">
        {title}
      </header>

      <div className="flex">
        <div className="grid grid-rows-3 justify-center items-center w-1/5 h-screen bg-[#101F33] p-8">
          <Link to='/admin/' className= 'inline-block text-center hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4' onClick={(e)=>setTitle("Quản lý hộ khẩu")}>
            Quản lý hộ khẩu
          </Link>
          
          <Link to='/admin/' className="inline-block text-center hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4" onClick={(e)=>setTitle("Quản lý nhân khẩu")}>
            Quản lý nhân khẩu
          </Link>

          <Link to='/admin/' className="inline-block text-center hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4" onClick={(e)=>setTitle("Quản lý thu phí")}>
            Quản lý thu phí
          </Link>

          <button className="hover:text-[#4FC3F7] text-[#BDC2C7] font-bold py-2 px-4 rounded mb-4" onClick={logoutBtn_Click}>
            Đăng xuất
          </button>
        </div>

        {loading ? (<LoadingScreen/>) : content()}
      </div>
    </div>
  );
}

export default AdminHomePage;