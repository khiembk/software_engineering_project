import React, { useState } from "react";

const CreateFee = () => {
  const [title, setTitle] = useState("Tạo khoản thu phí mới");
  const [feeID, setFeeID] = useState("");
  const [money, setMoney] = useState(0);
  const [timeCreate, setTimeCreate] = useState(new Date());
  const [feeName, setFeeName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [detail, setDetail] = useState("");
  const [feeType, setFeeType] = useState("Bắt Buộc");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeeID("");
    setMoney("");
    setTimeCreate(new Date());
    setFeeName("");
    setDeadline(new Date());
    setDetail("");
  };

  return (
    <div className="items-center justify-center ">
      <form
        className="bg-white shadow rounded border-2 p-6 mx-auto max-w-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center">
          <h3 className="text-red-600 font-bold rounded">{title}</h3>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeID"
          >
            Mã phí
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeID"
            type="text"
            placeholder="Fee ID"
            value={feeID}
            onChange={(e) => setFeeID(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="money"
          >
            Số tiền phải đóng (VNĐ)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="money"
            type="text"
            placeholder="Money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeName"
          >
            Tên phí
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeName"
            type="text"
            placeholder="Fee Name"
            value={feeName}
            onChange={(e) => setFeeName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="feeType"
          >
            Loại phí
          </label>
          <select
            className="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feeType"
            value={feeType}
            onChange={(e) => setFeeType(e.target.value)}
          >
            <option value="mandatory">Bắt Buộc</option>
            <option value="voluntary">Tự Nguyện</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="timeCreate"
          >
            Ngày bắt đầu thu phí
          </label>
          <input
            className="border-gray-900 border-2 w-48 ml-3 h-9 "
            type="datetime-local"
            id="timeCreate"
            name="timeCreate"
            value={timeCreate}
            onChange={(e) => setTimeCreate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deadline"
          >
            Hạn cuối thu phí
          </label>
          <input
            className="border-gray-900 border-2 w-48 h-9 ml-3 "
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="detail"
          >
            Mô tả chỉ tiết về phí
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="detail"
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="col-span-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
            type="submit"
          >
            Tạo Khoản phí mới
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

export default CreateFee;
