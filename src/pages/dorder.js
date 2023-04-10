import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function Dshow() {

  const [orderd, setOrderd] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getOrderd();
  }, []);

  const getOrderd = async () => {
    const response = await Axios.get('http://localhost:3001/order_durablearticles2');
    setOrderd(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderd.filter(val =>
    val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderd.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาครุภัณฑ์"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <CSVLink
              data={orderd}
              filename={"order_durablearticles.csv"}
              className="button is-link "
              class="btn btn-success"
              target="_blank"
            >
              ดาวน์โหลดเป็นไฟล์ Excel
            </CSVLink>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">เลขครุภัณฑ์</th>
              <th scope="col">ชื่อครุภัณฑ์</th>
              <th scope="col">วันที่เบิก</th>
              <th scope="col">ชื่อผู้เบิก</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              val.order_durablearticles_status === 'อนุมัติ' || val.order_durablearticles_status === 'ไม่อนุมัติ' ? (
                <tr key={val.order_durablearticles_Id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{val.durablearticles_Id}</td>
                  <td>{val.durablearticles_name}</td>
                  <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB',{day: 'numeric', month: 'numeric', year: 'numeric'})}</td>
                  <td>{val.username}</td>
                  <td>{val.order_durablearticles_status}</td>
                </tr>
              ) : null
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
    </div >
  );
};

export default Dshow