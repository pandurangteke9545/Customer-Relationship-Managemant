import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadById } from "../redux/slices/leadSlice";
import { useParams, Link } from "react-router-dom";

const ViewLead = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { lead, loading } = useSelector((state) => state.leads);

  useEffect(() => {
    if (id) dispatch(fetchLeadById(id));
  }, [id, dispatch]);

  if (loading || !lead) {
    return <div className="text-center text-white mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1>This is View Page</h1>

      <div className="bg-gray-800/40 p-6 rounded-3xl shadow-xl max-w-xl mx-auto">
        <h2 className="text-3xl font-bold">{lead.name}</h2>
        <p className="mt-2">Email: {lead.email}</p>
        <p>Phone: {lead.phone}</p>
        <p>Status: {lead.status}</p>

        <Link
          to={`/lead/edit/${lead.lead_id}`}
          className="inline-block mt-4 bg-blue-600 px-4 py-2 rounded-xl"
        >
          Edit Lead
        </Link>
      </div>
    </div>
  );
};

export default ViewLead;
