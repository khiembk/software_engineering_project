import React, { useState, useEffect } from 'react';
import HistoryFeeList from '../components/HistoryFeeList';
import { useAuth } from '../hooks/useAuth';
import { fetchFunction } from '../utils/Fetch';

export default function PayHistory() {
  const { user } = useAuth();
  const [feeUserComplete, setFeeUserComplete] = useState([]);
  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/GetListFeeUser/Complete", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        setFeeUserComplete(list.data);
      }
      else{
        console.log({message: "get fee user fail? code !== 200", data: user});
      }
    } catch (error) {
      console.log("get user list fail?");
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);
  //const items = [{tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}, {tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}];
  return (
    <div>
      <h1 className="text-center font-semibold">Các giao dịch nộp phí đã thực hiện</h1>
      <HistoryFeeList items={feeUserComplete} />
    </div>
  )
};