import HistoryFeeList from '../components/HistoryFeeList';

export default function PayHistory() {
  const items = [{tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}, {tid: "1", fee: {name: "Tiền điện", detail: "Tiền điện tháng 10", money: "300000", expirydate: "11/1/2021"}, date: "1/1/2023", state: "Thành công"}];
  return (
    <div>
      <h1 className="text-center font-semibold">Các giao dịch nộp phí đã thực hiện</h1>
      <HistoryFeeList items={items} />
    </div>
  )
};