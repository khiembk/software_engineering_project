import React, { useState,useEffect } from "react";
import {
  FaUser,
  FaKey,

  FaAddressCard,
} from "react-icons/fa";
import { fetchFunction } from "../utils/Fetch";
import { useAuth } from "../hooks/useAuth";
import { useNavigate,useParams } from "react-router-dom";

const CreateUser = () => {
  const {familyId}= useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [FailAttempt, setAttempt] = useState(null);
  
  const [familyID, setFamilyID] = useState("");
  const [fullOwnerName, setFullOwnerName] = useState("");
  const [address, setAddress] = useState("");


  function title() {
    if(familyId) return "Chỉnh sửa thông tin hộ khẩu"
    else return "Tạo hộ khẩu mới"
  }

  const savainfor = (e) =>
  {
    if(familyId) {
      e.preventDefault();
      updateFamily(e);
    }
    else addNewFamily(e);
  }

  const updateFamily = async (e) => {
    e.preventDefault();

    const respond = await fetchFunction({
      reqType: "/Family/Update", 
      accessToken: user.token,
      UserId: user.UserId,
      Address: address,
      FamilyId: familyID,
      OwnerName: fullOwnerName
    });

    if(respond.code === "200"){
      setAttempt(null);
      navigate("/admin");
    }
    else{
      setAttempt("fail");
    }
  };

  useEffect(() => {
    const fetchFamilyInfo = async () => {
      try {
        const userData = await fetchFunction({
          reqType: '/Family/GetFamilyInfoByAdmin',
          FamilyId: familyId,
          UserId: user.UserId,
          accessToken: user.token
        });
  
        if (userData.code === "200") {
          setFamilyID(userData.data[0].familyId);
          setAddress(userData.data[0].address);
          setFullOwnerName(userData.data[0].ownerName);
        } else {
          console.log("fetch error! code !== 200", user);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchFamilyInfo();
  }, []);

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
      >
        <div className="flex items-center justify-center">
          <h1 className="text-red-600 font-bold rounded text-[25px]">{title()}</h1>
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
            onClick={(e)=>savainfor(e)}
          >
            Lưu thông tin
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
