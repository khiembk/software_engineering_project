import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const { logout } = useAuth();
  const btn_Click = async e => {
    e.preventDefault();
    logout();
  }
  
  return (
    <div>
      <h>
       <button class="bg-transparent hover:bg-red-300 text-red-400 font-semibold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded" onClick={btn_Click}>Logout</button>
      </h>
      <div>
        <p><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Thong tin</button></p>
        <p><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Thu phi</button></p>
        <p><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Thong ke</button></p>
        <p><button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">?</button></p>
      </div>
    </div>
  )
};