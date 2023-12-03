import React, { useState } from "react";
import {
  FaUser,
  FaKey,
  FaCalendar,
  FaAddressCard,
  FaPhone,
  FaHouseUser,
} from "react-icons/fa";

const CreateUser = () => {
  const [title, setTitle] = useState("Tạo nhân khẩu mới");
  const [userID, setUserID] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [hk_number, setHK_number] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhone_Number] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserID("");
    setFullName("");
    setDob(new Date());
    setHK_number("");
    setAddress();
    setPhone_Number("");
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
            htmlFor="userID"
          >
            Mã người dùng
          </label>
          <div className="flex justify-center items-center">
            <FaKey className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="userID"
              id="userID"
              placeholder="UserId"
              value={userID}
              onChange={(e) => {
                setUserID(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mb-4 block items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Họ tên
          </label>
          <div className="flex justify-center items-center">
            <FaUser className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              id="name"
              placeholder="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 block items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="date_of_birth"
          >
            Ngày sinh
          </label>
          <div className="flex items-center">
            <FaCalendar className="mr-2 scale-125" />
            <input
              className="border-gray-900 border-2 w-36 ml-3 "
              type="date"
              id="date_of_birth"
              name="date_of_birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 block items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="HK_num"
          >
            Số Hộ khẩu
          </label>
          <div className="flex justify-center items-center">
            <FaHouseUser className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="HK_num"
              id="HK_num"
              placeholder="HK_number"
              value={hk_number}
              onChange={(e) => setHK_number(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 block items-center">
          <label
            className=" block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Nơi ở hoặc tạm trú
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
              onchange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="block mb-4 items-center">
          <label
            className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone_number"
          >
            Số điện thoại liên lạc
          </label>
          <div className="flex justify-center items-center">
            <FaPhone className="mr-2 scale-125" />
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="Phone Number"
              value={phone_number}
              onchange={(e) => setPhone_Number(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
          >
            Tạo Nhân khẩu mới
          </button>
          <button
            className="col-span-1 bg-red-500 hover:bg-white-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="reset"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;