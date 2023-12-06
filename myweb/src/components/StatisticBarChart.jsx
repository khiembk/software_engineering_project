import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
    },
  };

const valueFormatter = (value) => `${value}mm`;

const StatisticBarChart = ({dataset}) => {
    return(
        <div className="flex justify-center">
            <BarChart 
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[
                { dataKey: 'trantime', label: 'Số lần thực hiện giao dịch', valueFormatter },
                { dataKey: 'tranmoney', label: 'Tổng số tiền dùng để thực hiện giao dịch', valueFormatter }
            ]}
            {...chartSetting}
            />
        </div>
    );
};

export default StatisticBarChart;