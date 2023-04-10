import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Mshow() {

  const [orderm, setOrderm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrderm();
  }, []);

  const getOrderm = async () => {
    const response = await Axios.get('http://localhost:3001/repair2');
    setOrderm(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const displayname = sessionStorage.getItem('displayname');

  const filtered = orderm.filter(val =>
    val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">ชื่อครุภัณฑ์</th>
              <th scope="col">ห้อง</th>
              <th scope="col">รูป</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ชื่อผู้แจ้ง</th>
              <th scope="col">วันที่แจ้ง</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((val, index) => {
              if (val.Informer === displayname) {
                return (
                  <tr key={val.repair_durablearticles_Id}>
                    <td>{index + 1}</td>
                    <td>{val.durablearticles_name}</td>
                    <td>{val.room}</td>
                    <td>{val.repair_img}</td>
                    <td>{val.repair_detail}</td>
                    <td>{val.Informer}</td>
                    <td>{(val.repair_durablearticles_date == null) ? "" : new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                    <td>{val.repair_status}</td>
                  </tr>
                )
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Mshow