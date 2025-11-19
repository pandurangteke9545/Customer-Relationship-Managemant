import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../redux/slices/leadSlice";
import { Link } from "react-router-dom";

const Leads = () => {
  const dispatch = useDispatch();
  const { leads, loading } = useSelector((state) => state.leads);
    console.log("these are the all leads",leads)
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold drop-shadow-lg">All Leads</h1>

          <Link
            to="/lead/addlead"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl shadow-[0_0_25px_rgba(0,112,244,0.7)] hover:shadow-[0_0_40px_rgba(0,112,244,1)] transition font-semibold"
          >
            + Add Lead
          </Link>
        </div>

        {/* 3D Glass Table */}
        <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)] overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-900/60">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&  leads.length == 0 &&(
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No leads found.
                  </td>
                </tr>
              )}

              {!loading &&
                leads?.map((lead) => (
                  <tr
                    key={lead.lead_id}
                    className="hover:bg-gray-700/40 transition cursor-pointer"
                  >
                    <td className="p-4">{lead.name}</td>
                    <td className="p-4">{lead.email}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4">{lead.company}</td>

                    <td className="p-4 flex gap-3">
                      <Link
                         to={`/lead/view/${lead.lead_id}`}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-lg shadow-md"
                      >
                        View
                      </Link>

                      <Link
                        to={`/lead/edit/${lead.lead_id}`}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-md"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/lead/${lead.lead_id}/activities`}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
                      >
                        Activities
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
