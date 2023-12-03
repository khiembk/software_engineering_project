import FeeList from '../components/FeeList';

export default function FeePay() {
  const items = [{name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}];
  return (
    <div>
      <h1 className="text-center font-semibold">Các khoản phí còn lại</h1>
      <FeeList items={items} />
    </div>
  )
};