import React, { useState } from "react";
import {
  FaUser,
  FaKey,
  FaCalendar,
  FaAddressCard,
  FaPhone,
  FaHouseUser,
} from "react-icons/fa";
import { fetchFunction } from "../utils/Fetch";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [FailAttempt, setAttempt] = useState(null);
  const [title, setTitle] = useState("Tạo hộ khẩu mới");
  const [familyID, setFamilyID] = useState("");
  const [fullOwnerName, setFullOwnerName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFamilyID("");
    setFullOwnerName("");
    setAddress("");
  };

  const addNewFamily = async (e) => {
    e.preventDefault();

    const respond = await fetchFunction({
      reqType: "/Family/Add", 
      UserId: user.UserId,
      accessToken: user.token,
      FamilyId: familyID,
      OwnerName: fullOwnerName,
      Address: address,
    });

    if(respond.code === "200"){
      setAttempt(null);
      navigate("/admin");
    }
    else{
      setAttempt("fail");
    }
  };

  return (
    <div className="justify-center items-center">
      <form
        className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <h1 className="text-red-600 font-bold rounded">{title}</h1>
        </div>
        <div className="mb-4 block items-center">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 relative"
            htmlFor="familyID"
          >
            Mã hộ khẩu
          </label>
          <div className="flex justify-center items-center">
            <FaKey className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="familyID"
              id="familyID"
              placeholder="FamilyId"
              value={familyID}
              onChange={(e) => {
                setFamilyID(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mb-4 block items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Họ tên chủ hộ
          </label>
          <div className="flex justify-center items-center">
            <FaUser className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="fullOwnerName"
              id="fullOwnerName"
              placeholder="FullOwnerName"
              value={fullOwnerName}
              onChange={(e) => setFullOwnerName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 block items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Địa chỉ
          </label>
          <div className="flex justify-center items-center">
            <FaAddressCard className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {FailAttempt && <div className="text-red-500 py-2">Có lỗi gì đó</div>}

        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
            onClick={addNewFamily}
          >
            Tạo Nhân khẩu mới
          </button>
          <button
            className="col-span-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="reset"
            onClick={e => {navigate("/admin");}}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
