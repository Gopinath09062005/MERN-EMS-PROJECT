import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../utils/config";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) {
        query.append("date", dateFilter);
      }

      const response = await axios.get(
        `${API_URL}/attendance/report?${query.toString()}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        if (skip === 0) {
          setReport(response.data.groupData);
        } else {
          setReport((prevData) => ({ ...prevData, ...response.data.groupData }));
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  const handleLoadmore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Attendance Report</h3>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 p-4 bg-white shadow-sm rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700">Filter by Date</h2>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 shadow-sm"
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0);
          }}
        />
      </div>

      {loading && skip === 0 ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        Object.keys(report).length > 0 ? (
          Object.entries(report).map(([date, record]) => (
            <div className="mt-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden" key={date}>
              
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center">
                <span className="font-bold text-gray-700 uppercase tracking-wide">{date}</span>
              </div>

              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm text-left text-gray-500" style={{ minWidth: '800px' }}>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                    <tr>
                      {/* FIX: Fixed Widths for Columns */}
                      <th className="px-6 py-3 font-bold w-16">S No</th>
                      <th className="px-6 py-3 font-bold w-32">Employee ID</th>
                      <th className="px-6 py-3 font-bold w-1/4">Name</th>
                      <th className="px-6 py-3 font-bold w-1/4">Department</th>
                      <th className="px-6 py-3 font-bold w-32">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.map((data, i) => (
                      <tr key={i} className="bg-white border-b hover:bg-gray-50 transition duration-200">
                        <td className="px-6 py-4 font-medium text-gray-900">{i + 1}</td>
                        <td className="px-6 py-4">{data.employeeId}</td>
                        <td className="px-6 py-4">{data.employeeName}</td>
                        <td className="px-6 py-4">{data.departmentName}</td>
                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                ${data.status === "Present" ? "bg-green-100 text-green-700" : 
                                  data.status === "Absent" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>
                                {data.status}
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10 bg-white shadow-sm rounded-lg">
            <p className="text-xl">No Attendance Records Found</p>
          </div>
        )
      )}

      {Object.keys(report).length > 0 && (
          <div className="text-center mt-6 mb-6">
            <button
                className="px-6 py-2 border border-teal-600 text-teal-600 rounded-full hover:bg-teal-600 hover:text-white transition duration-300 font-semibold"
                onClick={handleLoadmore}
            >
                Load More Records
            </button>
          </div>
      )}
    </div>
  );
};

export default AttendanceReport;