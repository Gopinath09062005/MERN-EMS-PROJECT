import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, SERVER_URL } from "../../utils/config";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`${API_URL}/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center md:justify-start">
              <img
                src={`${SERVER_URL}/uploads/${leave.employeeId.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border w-72 h-72 object-cover"
              />
            </div>
            <div>
              {/* Name */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium text-lg">{leave.employeeId.userId.name}</p>
              </div>

              {/* Employee ID */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium text-lg">{leave.employeeId.employeeId}</p>
              </div>

              {/* Department */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium text-lg">{leave.employeeId.department.dep_name}</p>
              </div>

              {/* Leave Type */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Leave Type:</p>
                <p className="font-medium text-lg">{leave.leaveType}</p>
              </div>

              {/* Reason */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Reason:</p>
                <p className="font-medium text-lg">{leave.reason}</p>
              </div>

              {/* Start Date */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Start Date:</p>
                <p className="font-medium text-lg">{new Date(leave.startDate).toLocaleDateString()}</p>
              </div>

              {/* End Date */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">End Date:</p>
                <p className="font-medium text-lg">{new Date(leave.endDate).toLocaleDateString()}</p>
              </div>

              {/* Status & Actions */}
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">
                  {leave.status === "Pending" ? "Action:" : "Status:"}
                </p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p className="font-medium text-lg">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-xl font-bold">Loading Details...</div>
      )}
    </>
  );
};

export default Detail;