import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
import User from "../../components/User.jsx";
import Cookies from "js-cookie";
import { Pagination } from "antd";

const urlEnv = process.env.REACT_APP_URL;

const Users = () => {
  const tableTitles = [
    "Username",
    "Country",
    "Email",
    "Role",
    "Phone",
    "ID",
    "Delete",
  ];
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState();

  const pageSize = 10;

  const getAllUsers = () => {
    axios
      .get(`${urlEnv}/user/users`, {
        headers: {
          auth_token: `${Cookies.get("auth_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.response.docs);
        setUsers(res.data.response.docs);
        setTotalDocs(res.data.response.totalDocs);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(getAllUsers, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return !users ? (
    <Loader isComponent={true} />
  ) : (
    <div className="users-container">
      <div className="users-table-container w-100">
        <h2 className="title center">Users Table</h2>

        <table>
          <thead>
            <tr>
              <td style={{ padding: 0 }}>
                <form style={{ marginBottom: "10px" }}>
                  <input
                    placeholder="Search"
                    type="text"
                    className="input"
                    style={{
                      display: "block",
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </form>
              </td>
            </tr>
            <tr>
              {tableTitles.map((title) => {
                return (
                  <th key={tableTitles.indexOf(title)}>
                    {title.toUpperCase()}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((user) => {
                  return search.toLocaleLowerCase() === ""
                    ? user
                    : user.username.toLowerCase().includes(search) ||
                        user.email.toLowerCase().includes(search) ||
                        user.role.toLowerCase().includes(search) ||
                        user.phone.toLowerCase().includes(search);
                })
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map(
                  ({ role, phone, country, username, email, _id, isAdmin }) => (
                    <User
                      adminsView={false}
                      getAllUsers={getAllUsers}
                      role={role}
                      phone={phone}
                      country={country}
                      key={_id}
                      username={username}
                      email={email}
                      _id={_id}
                      isAdmin={isAdmin}
                    />
                  )
                )}
            <tr>
              <td colSpan={8}>
                <strong>Total</strong>: {users.length}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="dashboard-users-pagination-container">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalDocs}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;
