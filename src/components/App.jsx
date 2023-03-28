import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import NavBar from "./NavBar";
import Body from "./Body";
import { Input, Modal, message } from "antd";
import Axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    var local_username = localStorage.getItem("username");
    if (local_username!==null){
      setUserName(local_username);
      setIsModalOpen(false);
    }
  }, [])

  const handleOk = () => {
    if(name.length){
        setUserName(name);
        setName("");
        setIsModalOpen(false);
    }else{
        messageApi.open({
            type: "error",
            content: "Enter a Valid Username"
        });
    }
  };

  const handleCancel = () => {
    setName("");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setName("");
    setIsModalOpen(false);
  };

  function handleName(event) {
    const x = event.target.value;
    setName(x);
    localStorage.setItem("username",x);
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title="Enter UserName"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={handleClose}
        maskClosable={false}
      >
        <Input
          onChange={handleName}
          placeholder="UserName"
          name="UserName"
          value={name}
          autoComplete="off"
        />
      </Modal>
      <NavBar userName={userName}/>
      <Body /> 

      {/* <h1>Hello </h1>
      <button onClick={randomJoke}>Click me</button> */}
    </div>
  );
}