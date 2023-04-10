import React, { useState, useEffect } from "react";
import axios from "axios";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export default function Repair() {
  const [material, setMaterial] = useState([]);
  const storageRepairType = sessionStorage.getItem("repairType");
  const durablearticles_Id = storageRepairType;
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [informer, setInformer] = useState("");
  const [du_name, setDurablearticlesName] = useState("");
  const [typeId, setTypeDurablearticlesId] = useState("");
  const repair_durablearticles_Id = "";

  const [dataUri, setDataUri] = useState(null);

  function handleTakePhoto(dataUri) {
    setDataUri(dataUri);
  }

  useEffect(() => {
    async function getMaterial() {
      try {
        const response = await axios.get("http://localhost:3001/durablearticles");
        const jsonData = response.data;
        setMaterial(jsonData);
        const foundData = jsonData.find((data) => data.durablearticles_Id === durablearticles_Id);
        if (foundData) {
          setDurablearticlesName(foundData.durablearticles_name);
          setTypeDurablearticlesId(foundData.type_durablearticles_Id);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getMaterial();
  }, [durablearticles_Id]);

  function dataURItoFile(dataURI, fileName) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new Blob([ab], { type: mimeString });
    file.lastModifiedDate = new Date();
    file.name = fileName;
    return file;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!informer) {
      alert("Please fill in the informer field.");
      return;
    }

    if (!dataUri) {
      alert("Please take a photo.");
      return;
    }

    const data = {
      repair_durablearticles_Id,
      du_name,
      durablearticles_Id,
      room,
      description,
      Informer: informer,
      repair_detail: description,
    };

    const file = dataURItoFile(dataUri, "photo.jpg");

    const formData = new FormData();
    formData.append("photo", file, file.name);
    formData.append("data", JSON.stringify(data));

    try {
      const response = await axios.post("http://localhost:3001/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "room") {
      setRoom(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "Informer") {
      setInformer(value);
    }
  }

  return(
    <div>
      <br></br><br></br>
      <h2>แจ้งซ่อมครุภัณฑ์</h2>
      <form onSubmit={handleSubmit}>
          <label>ID:{durablearticles_Id}  </label><br /><br />
          <label>ชื่อ:{du_name} </label><br /><br />
          <label>ประเภท:{typeId} </label><br /><br />
          <label>ห้อง:</label>
          <select name="room" value={room} onChange={handleInputChange}>
            <option value="select">select</option>
            <option value="78-601">78-601</option>
          </select><br /><br />
          <div>
      {dataUri ? (
        <img src={dataUri} alt="captured" />
      ) : (
        <Camera
  onTakePhoto={handleTakePhoto}
  idealFacingMode={FACING_MODES.ENVIRONMENT}
  idealResolution={{ width: 200, height: 200 }}
  imageType={IMAGE_TYPES.JPG}
  imageCompression={0.97} // เพิ่ม property นี้เข้ามา
/>
      )}
    </div>
          <label>รายละเอียดเพิ่มเติม:</label>
          <input type="text" onChange={handleInputChange} value={description} name="description" />
          <br /><br />
          <label>ผู้แจ้ง:</label>
          <input type="text" onChange={handleInputChange} value={informer} name="Informer" /><br />
          <br /><br />
          <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}