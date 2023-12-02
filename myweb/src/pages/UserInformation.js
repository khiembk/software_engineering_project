import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useAuth } from "../hooks/useAuth";

async function getUserInformation(credentials) {
  return fetch('http://localhost:8080/getuserinformation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
};

export default function UserInformation() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserInformation = async () => {
    try {
      const userData = await getUserInformation({
        user,
      });
      setData(userData);
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      {error && <div>Something is wrong!</div>}
      {data && (
        <div>
          <h1 className="text-center font-semibold">Thông tin hộ khẩu người dùng</h1>
          <div className="flex" style={{ margin: '10px', justifyContent: 'space-between' }}>
            <div>
              <p>Họ và tên: {data.name}</p>
              <p>Ngày sinh: {moment.utc(data.birthday).tz("Asia/Bangkok").format("DD/MM/YYYY")}</p>
              <p>Giới tính: {data.gender}</p>
              <p>Quê quán: {data.hometown}</p>
              <p>Dân tộc: {data.folk}</p>
              <p>Quốc tịch: {data.nationality}</p>
              <p>Số CCCD: X</p>
              <p>Mã hộ: {data.familycode}</p>
            </div>
            <button className="w-40 h-60 border border-black justify-end">This is an image</button>
          </div>
        </div>
      )}
    </div>
  );
}