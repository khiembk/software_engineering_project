import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from '../utils/Fetch';
import UserList from '../components/UserList';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

export default function UserInformation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState(null);
  const [userFamily, setUserFamily] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInformation = async () => {
    try {
      const userData = await fetchFunction({
        reqType: '/GetUserInfo',
        UserId: user.UserId,
        accessToken: user.token
      });

      if(userData.code === "200"){
        setUserInformation(userData.data);
      }
      else{
        console.log("fetch error! code !== 200", user);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  const fetchUserFamily = async () => {
    try {
      const familyData = await fetchFunction({
        reqType: '/GetUserInfoByFamilyId',
        UserId: user.UserId,
        accessToken: user.token
      });

      if(familyData.code === "200"){
        setUserFamily(familyData.data);
      }
      else{
        console.log("fetch error! code !== 200", user);
      }
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    try{
      setLoading(true);
      fetchUserInformation();
      fetchUserFamily();
    }
    finally{
      setLoading(false);
    }
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className='flex-grow'>
      {loading ? (<LoadingScreen/>) : 
        <div style={{marginTop: '30px'}}>
          {error && <div>Something is wrong!</div>}
          {userInformation && (
            <div>
              <h1 className="text-center font-semibold text-[1.5rem]">Thông tin người dùng</h1>
              <div className="text-center" style={{ margin: '10px'}}>
                  <p><span className='font-semibold'>Số CCCD:</span> {userInformation[0].userId}</p>
                  <p><span className='font-semibold'>Họ và tên:</span> {userInformation[0].userName}</p>
                  <p><span className='font-semibold'>Ngày sinh:</span> {moment.utc(userInformation[0].dateOfBirth).tz("Asia/Bangkok").format("DD/MM/YYYY")}</p>
                  <p><span className='font-semibold'>Số điện thoại:</span> {userInformation[0].phoneNumber}</p>
                  <p><span className='font-semibold'>Mã hộ:</span> {userInformation[0].familyId}</p>
                  <button className='px-2 py-2 bg-red-500 border border-red-500 rounded my-4 font-semibold text-white hover:bg-red-800' onClick={e => {navigate("/changepass")}}>Đổi mật khẩu</button>
              </div>
              <h2 className="text-center font-semibold text-[1.5rem]" style={{marginTop: '30px'}}>Thông tin những người dùng cùng mã hộ</h2>
              {userFamily && <UserList items={userFamily}></UserList>}
            </div>
          )}
        </div>
      }
    </div>
    
  );
}