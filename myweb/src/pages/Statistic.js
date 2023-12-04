import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import moment from "moment-timezone";

export default function Statistic() {
  const { user } = useAuth();
  const [monthtransactiontime, setMonthtransactiontime] = useState(0);
  const [monthtransactionmoney, setMonthtransactionmoney] = useState(0);
  const [yeartransactiontime, setYeartransactiontime] = useState(0);
  const [yeartransactionmoney, setYeartransactionmoney] = useState(0);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/GetListFeeUser/Complete", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code == "200"){
        for (let i = 0; i < list.data.length; i++) {
          if(moment(list.data[i].dateCreate).tz("Asia/Bangkok").year() == currentYear){
            if(moment(list.data[i].dateCreate).tz("Asia/Bangkok").month() == currentMonth){
              setMonthtransactiontime(monthtransactiontime + 1);
              setMonthtransactionmoney(monthtransactionmoney + list.data[i].money);
            }
            setYeartransactiontime(yeartransactiontime + 1);
            setYeartransactionmoney(yeartransactionmoney + list.data[i].money);
          }
        }
      }
      else{
        setError("Something went wrong!");
        console.log({message: "get fee user fail? code !== 200", data: user});
      }
    } catch (error) {
      setError("Something went wrong!");
      console.log("get user list fail?");
    }
  };

  useEffect(() => {
    fetchFeeUser();
  }, []);

  return (
    <div>
      {error && <div>Something is wrong!</div>}
      <div style={{margin: "10px"}}>
        <div>
          <h1 className="font-semibold" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong tháng vừa qua</h1>
          <div>
            <p>Số giao dịch được thực hiện thành công: {monthtransactiontime}</p>
            <p>Tổng tiền đã nộp: {monthtransactionmoney}</p>
          </div>
        </div>
        <div style={{marginTop: '30px'}}>
          <h1 className="font-semibold" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong năm nay</h1>
          <div>
            <p>Số giao dịch được thực hiện thành công: {yeartransactiontime}</p>
            <p>Tổng tiền đã nộp: {yeartransactionmoney}</p>
          </div>
        </div>
      </div>
    </div>
  )
};