import React, { useState } from 'react';

const FamilyList = ({ items }) => {
  const itemsPerPage = 5; // Adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

  return (
    <div style={{margin: '10px'}}>
      <table className="mt-4 table w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-2">Mã hộ khẩu</th>
            <th className="py-2 px-4 border-2">Chủ hộ</th>
            <th className="py-2 px-4 border-2">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
          <tr key={index}>
              <td className="px-4 py-2 border-2">{item.familyId}</td>
              <td className="px-4 py-2 border-2">{item.ownerName}</td>
              <td className="px-4 py-2 border-2">{item.address}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '10px', textAlign: 'center', alignContent: '' }}>
        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: '3px',
              padding: '5px',
              border: '1px solid #ccc',
              background: currentPage === index + 1 ? '#eee' : 'transparent',
              borderRadius: '1rem'
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FamilyList;