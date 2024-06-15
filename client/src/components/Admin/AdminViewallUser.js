import React, { useEffect, useState } from 'react'
import './Admin.css'
import axiosInstance from '../../apis/axiosInstance'

function AdminViewallUser() {

  const [data, setData] = useState([])

  useEffect(() => {
    axiosInstance.post("/viewUsers")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          setData(res.data.data || [])
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
  }, [])

  return (
    <div>
      <button className='admin-view-user-btn mt-5 ms-5'>View Users</button><br></br>
      <label className='mt-5 ms-5'>Rows per page</label>{" "}
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>

      {data.length !== 0 ? (
        <div className="table-container">
          <table className='table'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Active/Inactive</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.firstname} {item.lastname}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                    <div>
                    <label  className="toggle-label">
                    {item.status ? 'Active' : 'Inactive'}
                  </label>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}
      <div className="pagination">
        <span>1 - 10</span>
        <button>&lt;</button>
        <button>&gt;</button>
      </div>

    </div>
  )
}

export default AdminViewallUser
