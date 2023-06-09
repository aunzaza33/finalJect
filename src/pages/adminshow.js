import Axios from 'axios'
import React from "react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import './add.css';

function Adminshow() {

    const [admin, setadmin] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const displayname = sessionStorage.getItem('displayname');

    useEffect(() => {
        getadmin();
    }, []);

    const getadmin = async () => {
        const response = await Axios.get('http://localhost:3001/getadmin');
        setadmin(response.data);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = admin.filter(val =>
        val.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(admin.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteAdmin = async (id) => {
        try {
            Swal.fire({
                title: 'Delete Success!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
              });
            await Axios.delete(`http://localhost:3001/deleteadmin/${id}`);
            // Reload the list of admins after deleting the admin
            getadmin();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="field">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="ค้นหาชื่อ admin"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">ลำดับ</th>
                            <th scope="col" className="col-4">ชื่อ admin</th>
                            {displayname === "admin" && (<th scope="col" className="col-4">ลบ admin</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((val, index) => (
                            <tr key={val.Id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{val.name}</td>
                                {displayname === "admin" && (
                                    <td>
                                        <button onClick={() => deleteAdmin(val.Id)}>Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <nav style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(1)} className="page-link">หน้าแรก</button>
                        </li>
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(currentPage - 1)} className="page-link">ก่อนหน้า</button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => {
                            if (index + 1 === currentPage) {
                                return (
                                    <li key={index} className="page-item active">
                                        <button className="page-link">{index + 1}</button>
                                    </li>
                                );
                            } else if (
                                index + 1 >= currentPage - 9 &&
                                index + 1 <= currentPage + 9 &&
                                index + 1 !== totalPages
                            ) {
                                return (
                                    <li key={index} className="page-item">
                                        <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                                    </li>
                                );
                            } else if (index + 1 === currentPage - 10 || index + 1 === currentPage + 10) {
                                return (
                                    <li key={index} className="page-item disabled">
                                        <button className="page-link">...</button>
                                    </li>
                                );
                            } else if (index + 1 === totalPages) {
                                return (
                                    <li key={index} className="page-item">
                                        <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
                                    </li>
                                );
                            }
                            return null;
                        })}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button onClick={() => paginate(currentPage + 1)} className="page-link">ถัดไป</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Adminshow;