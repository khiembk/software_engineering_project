import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  return (
    <div className='flex-grow m-auto text-center'>
      <p className='text-[5rem] mx-[20rem]'>Chào mừng đến với trang quản lý thu phí người dùng</p>
    </div>
  )
};