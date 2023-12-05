import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import moment from "moment-timezone";
import LoadingScreen from "../components/LoadingScreen";

export default function Statistic() {
  const { user } = useAuth();
  const [monthtransactiontime, setMonthtransactiontime] = useState(0);
  const [monthtransactionmoney, setMonthtransactionmoney] = useState(0);
  const [yeartransactiontime, setYeartransactiontime] = useState(0);
  const [yeartransactionmoney, setYeartransactionmoney] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const fetchFeeUser = async () => {
    try {
      const list = await fetchFunction({
        reqType: "/GetListFeeUser/Complete", 
        UserId: user.UserId,
        accessToken: user.token
      });
      if(list.code === "200"){
        let monthtran = 0;
        let monthtime = 0;
        let yeartran = 0;
        let yeartime = 0;
        for (let i = 0; i < list.data.length; i++) {
          if(moment(list.data[i].dateCreate).tz("Asia/Bangkok").year() === currentYear){
            if(moment(list.data[i].dateCreate).tz("Asia/Bangkok").month() === currentMonth){
              monthtime++;
              monthtran += list.data[i].money;
            }
            yeartime++;
            yeartran += list.data[i].money;
          }
        }

        setMonthtransactiontime(monthtime);
        setMonthtransactionmoney(monthtran);
        setYeartransactiontime(yeartime);
        setYeartransactionmoney(yeartran);
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
    try{
      setLoading(true);
      fetchFeeUser();
    }
    finally{
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex-grow">
      {loading ? (<LoadingScreen/>) :
      <div style={{margin: "10px"}}>
        {error && <p className="text-red-500 font-bold text-[5rem]">error</p>}
        <div>
          <h1 className="font-semibold text-center" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong tháng vừa qua</h1>
          <div className="text-center">
            <p>Số giao dịch được thực hiện thành công: {monthtransactiontime}</p>
            <p>Tổng tiền đã nộp: {monthtransactionmoney}</p>
          </div>
        </div>
        <div style={{marginTop: '30px'}}>
          <h1 className="font-semibold text-center" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong năm nay</h1>
          <div className="text-center">
            <p>Số giao dịch được thực hiện thành công: {yeartransactiontime}</p>
            <p>Tổng tiền đã nộp: {yeartransactionmoney}</p>
          </div>
        </div>
      </div>}
    </div>
  )
};