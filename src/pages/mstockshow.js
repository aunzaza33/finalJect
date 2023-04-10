import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Mstockshow() {

  const [stockm, setStockm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getStockm();
  }, []);

  const getStockm = async () => {
    const response = await Axios.get('http://localhost:3001/stock_material2');
    setStockm(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockm.filter(val =>
    val.material_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(stockm.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาวัสดุ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">เลขวัสดุ</th>
              <th scope="col">ชื่อวัสดุ</th>
              <th scope="col">จำนวนที่เพิ่ม</th>
              <th scope="col">วันที่</th>
              <th scope="col">ชื่อผู้เพิ่ม</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.stock_material_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.stock_material_add}</td>
                <td>{(val.stock_material_date == null) ? "" : new Date(val.stock_material_date).toLocaleDateString('en-GB',{day: 'numeric', month: 'numeric', year: 'numeric'})}</td>
                <td>{val.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Mstockshow