import Axios from 'axios'
import React from "react";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

function Dreturnlist() {

    const [orderd, setOrderd] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        getOrderd();
    }, []);

    const getOrderd = async () => {
        const response = await Axios.get('http://localhost:3001/order_durablearticles3');
        setOrderd(response.data);
    };

    // Filter orders by status "อนุมัติ"
    const filteredOrderd = orderd.filter((val) => val.order_durablearticles_status === "อนุมัติ");

    // Filter orders by search query
    const searchedOrderd = filteredOrderd.filter((val) => {
        const searchRegex = new RegExp(searchQuery, "i");
        return searchRegex.test(val.durablearticles_name) || searchRegex.test(val.order_durablearticles_location) || searchRegex.test(val.username);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchedOrderd.filter(val =>
        val.durablearticles_name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(searchedOrderd.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="field">
                    <div className="control">
                        <input className="input" type="text" placeholder="ค้นหาครุภัณฑ์" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ลำดับ</th>
                            <th scope="col">เลขครุภัณฑ์</th>
                            <th scope="col">ชื่อครุภัณฑ์</th>
                            <th scope="col">เบิกไปใช้ที่ไหน</th>
                            <th scope="col">วันที่</th>
                            <th scope="col">ชื่อผู้เบิก</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((val, index) => (
                            <tr key={val.order_durablearticles_Id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{val.durablearticles_Id}</td>
                                <td>{val.durablearticles_name}</td>
                                <td>{val.order_durablearticles_location}</td>
                                <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                <td>{val.username}</td>
                                <td>
                                    {val.durablearticles_status === "เบิกไม่ได้" ? (
                                        currentItems.filter(
                                            (o) =>
                                                o.durablearticles_Id === val.durablearticles_Id &&
                                                o.order_durablearticles_status === "อนุมัติ"
                                        ).sort((a, b) =>
                                            a.order_durablearticles_Id > b.order_durablearticles_Id ? -1 : 1
                                        )[0].order_durablearticles_Id === val.order_durablearticles_Id ? (
                                            <Link
                                                to={`/dreturn/${val.order_durablearticles_Id}`}
                                                className="btn btn-success"
                                            >
                                                คืน
                                            </Link>
                                        ) : (
                                            <button class="btn btn-danger" disabled>
                                                คืน
                                            </button>
                                        )
                                    ) : (
                                        ""
                                    )}
                                </td>
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

export default Dreturnlist;
