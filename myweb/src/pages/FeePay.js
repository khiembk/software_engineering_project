import React, { useState, useEffect } from 'react';
import FeeList from '../components/FeeList';
import { fetchFunction } from '../utils/Fetch';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';

export default function FeePay() {
  const { user } = useAuth();
  const [feeUser, setFeeUser] = useState();

  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/GetListFeeUser/NotComplete", 
        UserId: user.UserId,
        accessToken: user.token
      });

      if(list.code === "200"){
        setFeeUser(list.data);
      }
      else{
        console.log({message: "get fee user fail? code !== 200", data: user});
      }
    } 
    catch (error) {
      console.log("get user list fail?");
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);

  //const items = [{name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}];
  return (
    <div className='flex-grow' style={{marginTop: '30px'}}>
      {feeUser ?
      <div>
        <h1 className="text-center font-semibold text-[1.5rem]" style={{marginBottom: '30px'}}>Các khoản phí còn lại</h1>
        <FeeList items={feeUser} />
      </div> : (<LoadingScreen/>)}
    </div>
  )
};