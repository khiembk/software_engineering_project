import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchFunction } from "../utils/Fetch";
import { FaKey,FaCheckCircle,FaCalendar  } from "react-icons/fa";
import { MdOutlineFeed  } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
const CreateFee = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [FailAttempt, setAttempt] = useState(null);
  const [feeID, setFeeID] = useState("");
  const [datecreate, setDateCreate] = useState(new Date());
  const [feeName, setFeeName] = useState("");
  const [detail, setDetail] = useState("");
  
  const [feeType, setFeeType] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeeID("");
  
    setFeeName("");
    setDetail("");
  };

  const addNewFee = async (e) => {
    e.preventDefault();

    const response = await fetchFunction({
      reqType: "/Fee/addNewFee", 
      UserId: user.UserId,
      accessToken: user.token,
      FeeId: feeID,
      FeeName: feeName,
      DateCreate: datecreate,
      Detail: detail,
      isRequired: feeType
    });

    if(response.code === "200"){
      setAttempt(null);
      navigate("/admin/quanlyphi");
    }
    else{
      setAttempt("fail");
    }
  };

  return (
    <div className="h-screen mt-10">
      <form
        className="bg-white shadow rounded border-2 p-6 mx-auto max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <h2 className="text-red-600 text-[25px] font-bold rounded">Tạo khoản phí mới</h2>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeID"
          >
            Mã phí
          </label>
          <div className="flex justify-center items-center">
          <FaKey className="mr-2 scale-125" />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeID"
            type="text"
            placeholder="Fee ID"
            value={feeID}
            onChange={(e) => setFeeID(e.target.value)}
          />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeName"
          >
            Tên phí
          </label>
          <div className="flex justify-center items-center">
          <MdOutlineFeed className="mr-2 scale-150" />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeName"
            type="text"
            placeholder="Fee Name"
            value={feeName}
            onChange={(e) => setFeeName(e.target.value)}
          />
          </div>
        </div>

        <div className="mb-4 block items-center">
            <label
              className="block justify-center items-center text-gray-700 text-sm font-bold mb-2"
              htmlFor="date_of_birth"
            >
              Ngày tạo
            </label>
            <div className="flex items-center">
              <FaCalendar className="mr-2 scale-125" />
              <input
                className="border-gray-900 border-2 w-36 ml-3 h-9 w-36 mx-auto text-center"
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={datecreate}
                onChange={(e) => setDateCreate(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
        <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeType"
          >
            Loại phí
        </label>
          <div className="flex justify-center items-center">
          <FaCheckCircle className="mr-2 scale-150" />
            <select
              className="h-[48px] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="feeType"
              value={feeType}
              onChange={(e)=>setFeeType(e.target.value)}
            >
              <option value={0}>Không bắt buộc</option>
              <option value={1}>Bắt buộc</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="detail"
          >
            Mô tả chỉ tiết về phí
          </label>
          <div className="flex justify-center items-center">
          <IoInformationCircle className="mr-2 scale-150" />
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="detail"
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          </div>
        </div>

        {FailAttempt && <div className="text-red-500 py-2">Có lỗi gì đó</div>}

        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
            onClick={addNewFee}
          >
            Tạo Khoản phí mới
          </button>
          <button
            className="col-span-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="reset"
            onClick={e => {navigate("/admin/quanlyphi");}}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFee;
