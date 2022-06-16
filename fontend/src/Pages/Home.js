import React,{useState,useEffect} from 'react'
import http from '../http'
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetchAllUsers();

    },[])
    const fetchAllUsers=()=>{
        http.get('/users').then(res=>{
            setUsers(res.data);
        }).catch((exception) => {
            console.log(exception);
        });
    }



    const deleteUser=(id)=>{
        http.delete('/users/'+id).then(res=>{
            fetchAllUsers();
        }).catch((exception) => {
            console.log(exception);
        });
    }
  return (
    <><h1>Home Page</h1>

     <table className='table'>
    
        <thead>
            <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((user,index)=>(
             <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <Link className="btn btn-info" to={{pathname:"/edits/ "+user.id}}>Edit</Link>
                    <button type='button' className='btn btn-danger m-2' 
                    onClick={()=>{deleteUser(user.id)}}
                    >Delete</button>
                </td>
            </tr>
                ))
            }

           
        </tbody>
     </table>
    
    </>
   
  )
}

export default Home