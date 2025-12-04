import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";
import { API_URL } from "../../utils/config";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_URL}/leave`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data)
  };
  
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data)
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          
          {/* Responsive Filter Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:border-teal-500"
              onChange={filterByInput}
            />
            
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-md transition" onClick={() => filterByButton("Pending")}>Pending</button>
              <button className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-md transition" onClick={() => filterByButton("Approved")}>Approved</button>
              <button className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-md transition" onClick={() => filterByButton("Rejected")}>Rejected</button>
            </div>
          </div>

          <div className="mt-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <div style={{ minWidth: '1000px' }}>
                    <DataTable 
                        columns={columns} 
                        data={filteredLeaves} 
                        pagination 
                        customStyles={{
                            headRow: {
                                style: {
                                    backgroundColor: '#f9fafb',
                                    borderBottom: '1px solid #e5e7eb',
                                },
                            },
                            headCells: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    color: '#374151',
                                },
                            },
                            cells: {
                                style: {
                                    fontSize: '14px',
                                    padding: '12px',
                                },
                            },
                        }}
                    />
                </div>
            </div>
          </div>

        </div>
      ) : ( <div>Loading.....</div> )}
    </>
  );
};
export default Table;