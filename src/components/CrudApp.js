import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import {helpHttp} from "../helpers/helpHttp"
import Loader from "./Loader";
import Message from "./Message";

const CrudApp = () => {
  const [data, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  let api = helpHttp();
  //FAKE API URL
  let url = "http://localhost:5000/teams"
  let options = {
  }

  useEffect(() => {
    setIsLoading(true)
    api.get(url,options)
    .then((res)=>{
      if (!res.err){
        setData(res)
        setError(null)
      }else {
        setData(null)
        setError(res)
      }
      setIsLoading(false)
    })
  }, [url])

  const createData = (newData) => {
    newData.id = Date.now();
    let options = {
      body: newData, 
      headers: {"content-type":"application/json"}
    }
    api.post(url,options)
    .then((res) => {
      if (!res.err){
        setData([...data,res])
      }else {
        setError(res)
      }
    })
  };

  const updateData = (upData) => {
    let endPoint = `${url}/${upData.id}`
    let options = {
      body: upData, 
      headers: {"content-type":"application/json"}
    }
    api.put(endPoint,options)
    .then((res) => {
      if (!res.err){
        let tmpData = data.map((el)=> (el.id===upData.id ? upData : el))
        setData(tmpData);
      }else {
        setError(res)
      }
    })
    
  };
  const deleteData = (id) => {
      let isDelete = window.confirm(`Are you Sure? ${id}`);

      if (isDelete){
        let endPoint = `${url}/${id}`
        let options = {
          headers: {"content-type":"application/json"}
        }
        api.del(endPoint,options)
        .then((res) => {
          if (!res.err){
            let tempData = data.filter((el)=>el.id !== id)
            setData(tempData)
          }else {
            setError(res)
          }
        })
      }else{
          return;
      }

  };

  return (
    <div>
      <h2>CRUD APP</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      {isLoading && <Loader /> }
      {error && <Message msg={`Error ${error.status}: ${error.statusText}
       `} bgColor='#dc3545'/>}
      {data && <CrudTable
      data={data}
      deleteData={deleteData}
      setDataToEdit={setDataToEdit}
      />}
      
    </div>
  );
};

export default CrudApp;
