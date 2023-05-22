import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Currency from "./Currency";
import{FormControl} from "react-bootstrap"
function Carencies(){
  const[carencies,setCarencies]=useState([]);
  const[filterSearch,setFilterSearch]=useState([]);
  const[searchValue,setSearchValue]=useState(``);
 

  const[data,setData]=useState(``);
 
  useEffect(()=>{
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${data}&json`).then(res=>res.json()).then(data=>
    setCarencies(data))
 },[data])
 

function filteredSearch(name){
    setSearchValue(name);
const result=carencies.filter(currency=>currency.txt.toLowerCase().includes(name))
setFilterSearch(result)
  }
return <>
<input defaultValue={data} onChange={e=> setData(e.currentTarget.value.replaceAll(`-`,``))} type="date" className="form-control mb-3"></input>

<FormControl className="mb-3"
placeholder="Search"
aria-label="Search"
onKeyUp={e=>{filteredSearch (e.currentTarget.value.trim().toLocaleLowerCase())}}
/>


<Table striped bordered hover>

<thead>
    <th>Name</th>    <th>Rate</th>    <th>CC</th>    <th>Date</th> <th>ID</th>
</thead>
<tbody>
    {(searchValue.length  ? filterSearch : carencies).map(currency=> <Currency key={currency.r030} currency={currency}/>)}
</tbody>

</Table>
</>
}

export default Carencies;