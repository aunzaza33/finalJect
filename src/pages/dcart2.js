import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';

const Dcart = () => {

    const [order_durablearticles_Id, setOrder_durablearticles_Id] = useState("");
    const [order_durablearticles_location, setOrder_durablearticles_location] = useState("");
    const [order_durablearticles_date, setOrder_durablearticles_date] = useState(new Date().toISOString().slice(0, 10));
    //const displayname = sessionStorage.getItem('displayname');
    //const username = displayname;
    const [username, setUsername] = useState("");

    const [durablearticles_name, setDurablearticles_name] = useState("");
    const [durablearticles_brand, setDurablearticles_brand] = useState("");
    const [durablearticles_unit, setDurablearticles_unit] = useState("");
    const [durablearticles_price, setDurablearticles_price] = useState("");
    const [durablearticles_order_date, setDurablearticles_order_date] = useState("");
    const [durablearticles_delivery_date, setDurablearticles_delivery_date] = useState("");
    const [durablearticles_repair_date, setDurablearticles_repair_date] = useState("");
    const [durablearticles_finish_date, setDurablearticles_finish_date] = useState("");
    const [type_durablearticles_Id, setType_durablearticles_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [room_Id, setRoom_Id] = useState("");
    const [durablearticles_status, setDurablearticles_status] = useState("");

    const navigate = useNavigate();
    const { durablearticles_Id } = useParams();

    const newstatus = "เบิกไม่ได้";

    const getDurablearticlesById = async () => {
        const response = await Axios.get(`http://localhost:3001/getdurablearticles/${durablearticles_Id}`);
        console.log(response);
        setDurablearticles_name(response.data[0].durablearticles_name);
        setDurablearticles_brand(response.data[0].durablearticles_brand);
        setDurablearticles_unit(response.data[0].durablearticles_unit);
        setDurablearticles_price(response.data[0].durablearticles_price);
        setDurablearticles_order_date(response.data[0].durablearticles_order_date);
        setDurablearticles_delivery_date(response.data[0].durablearticles_delivery_date);
        setDurablearticles_repair_date(response.data[0].durablearticles_repair_date);
        setDurablearticles_finish_date(response.data[0].durablearticles_finish_date);
        setType_durablearticles_Id(response.data[0].type_durablearticles_Id);
        setCompany_Id(response.data[0].company_Id);
        setRoom_Id(response.data[0].room_Id);
        setDurablearticles_status(response.data[0].durablearticles_status);
    };

    useEffect(() => {
        getDurablearticlesById();
    }, []);

    const addorder = async (e) => {
        e.preventDefault();
        try {
            await Axios.post(`http://localhost:3001/order_durablearticles`, {
                order_durablearticles_Id,
                order_durablearticles_location,
                order_durablearticles_date,
                username,
                durablearticles_Id,
            });
            await Axios.put(`http://localhost:3001/statusdurablearticles/${durablearticles_Id}`, {
                durablearticles_Id,
                durablearticles_status: newstatus,
            });
            navigate("/dlist");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Appcontainer">
            <div className="add2">
                <form onSubmit={addorder}>
                    <br />

                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อครุภัณฑ์ : {durablearticles_name}</label>
                    </div>

                    <div className="field1">
                        <label className="label">เบิกไปใช้ที่ไหน :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={order_durablearticles_location}
                                onChange={(e) => setOrder_durablearticles_location(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่เบิก :</label>
                        <div className="control">
                            <input
                                type="date"
                                className="input"
                                value={order_durablearticles_date}
                                onChange={(e) => setOrder_durablearticles_date(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อผู้เบิก :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-success">
                            เบิก
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dcart;