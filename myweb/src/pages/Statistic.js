import { useState, useEffect } from "react";

async function gettransactiondone(credentials) {
  return fetch('http://localhost:8080/fetchtransactiondone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
};

export default function Statistic() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  const fetchTransactionDone = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const userData = await gettransactiondone({
        currentYear
      });
      setData(userData);
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchTransactionDone();
  }, []);

  return (
    <div>
      {error && <div>Something is wrong!</div>}
      {data && (
        <div style={{margin: "10px"}}>
          <div>
            <h1 className="font-semibold" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong tháng vừa qua</h1>
            <div>
              <p>Số giao dịch được thực hiện thành công: {data.monthtransactiontime}</p>
              <p>Tổng tiền đã nộp: {data.monthtransactionmoney}</p>
            </div>
          </div>
          <div style={{marginTop: '30px'}}>
            <h1 className="font-semibold" style={{marginBottom: '5px'}}>Thống kê các giao dịch được thực hiện trong năm nay</h1>
            <div>
              <p>Số giao dịch được thực hiện thành công: {data.yeartransactiontime}</p>
              <p>Tổng tiền đã nộp: {data.yeartransactionmoney}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};