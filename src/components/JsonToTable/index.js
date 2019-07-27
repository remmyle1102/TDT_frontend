import React, { useState } from 'react';
import { Table } from 'reactstrap';

function JsonToTable(props){
  function getKeys(){
    if (props.data[0] ===  undefined){
      props.data[0] = []
    }
    return Object.keys(props.data[0])
  }

  function getHeader() {
  let keys = getKeys()
    return keys.map( (key, index) => {
      return <th key={index}>{key}</th>
    } )
  }

  function getRowsData() {
    let items = props.data;
    let keys = getKeys();
    return items.map((row, index)=>{
      return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
    })
  }

  return (
    <Table responsive>
      <thead>
      <tr>{getHeader()}</tr>
      </thead>
      <tbody>
      {getRowsData()}
      </tbody>
    </Table>
  );
};

const RenderRow = (props) =>{
  return props.keys.map((key, index)=> {
    if (typeof(props.data[key]) === 'boolean') {
      props.data[key] = props.data[key].toString()
    }
    return <td key={index}>{props.data[key]}</td>
  })
}
export default JsonToTable;
