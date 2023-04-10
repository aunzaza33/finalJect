import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";

function Materialshow() {

    const [material, setMaterial] = useState([]);

    useEffect(() => {
        getMaterial();
    }, []);

    const getMaterial = async () => {
        const response = await Axios.get('http://localhost:3001/material');
        const materials = response.data.filter(material => material.material_remaining < 5);
        setMaterial(materials);
    };

    return (
        <div style={{ paddingTop: "15px"}}>
            <div style={{ backgroundColor: "#f8d7da", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                <h1 style={{ color: "red" }}>วัสดุที่เหลือน้อย <span role="img" aria-label="warning">⚠️</span> ควรสั่งซื้อเพิ่ม</h1>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <table className='warn2' style={{ borderCollapse: "collapse", width: "80%", margin: "0 auto", marginTop: "10px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5c6cb" }}>
                                <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>เลขวัสดุ</th>
                                <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>ชื่อ</th>
                                <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>คงเหลือ</th>
                                <th style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>หน่วยนับ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {material.map((val, index) => (
                                <tr key={val.material_Id} style={{ backgroundColor: val.material_remaining < 10 ? "#ffe6e6" : "transparent" }}>
                                    <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{val.material_Id}</td>
                                    <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{val.material_name}</td>
                                    <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{val.material_remaining}</td>
                                    <td style={{ padding: "10px", textAlign: "center", border: "1px solid #ddd" }}>{val.material_unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Materialshow