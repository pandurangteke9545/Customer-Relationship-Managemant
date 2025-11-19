import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BarChart3, UserPlus, ClipboardList, Users, Activity } from "lucide-react";

const Home = () => {
  const { leads } = useSelector((state) => state.leads);
  const { activities } = useSelector((state) => state.activities || { activities: [] });

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const pendingLeads = leads.filter((l) => l.status === "Qualified").length;
  const assignedLeads = leads.filter((l) => l.status === "Contacted").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold drop-shadow-lg mb-10 text-center">
          CRM Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Total Leads */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.6)]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total Leads</h2>
              <BarChart3 size={32} className="text-blue-400" />
            </div>

            <p className="text-5xl font-bold mt-4">{totalLeads}</p>

            <Link
              to="/leads"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,112,244,0.7)]"
            >
              View Leads
            </Link>
          </motion.div>

       
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.6)]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">New Leads</h2>
              <UserPlus size={32} className="text-green-400" />
            </div>

            <p className="text-5xl font-bold mt-4">{newLeads}</p>

            <Link
              to="/leads"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,200,80,0.7)]"
            >
              View
            </Link>
          </motion.div>

          {/* Pending Leads */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.6)]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pending Leads</h2>
              <ClipboardList size={32} className="text-yellow-400" />
            </div>

            <p className="text-5xl font-bold mt-4">{pendingLeads}</p>

            <Link
              to="/leads"
              className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(255,200,0,0.7)]"
            >
              View
            </Link>
          </motion.div>

          {/* Assigned Leads */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.6)]"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assigned</h2>
              <Users size={32} className="text-purple-400" />
            </div>

            <p className="text-5xl font-bold mt-4">{assignedLeads}</p>

            <Link
              to="/leads"
              className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(140,0,255,0.7)]"
            >
              View
            </Link>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-14 bg-gray-800/30 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center mb-6">
            <Activity size={28} className="text-blue-400 mr-3" />
            <h2 className="text-3xl font-bold">Recent Activities</h2>
          </div>

          {activities.length === 0 ? (
            <p className="text-gray-400">No activities found.</p>
          ) : (
            <ul className="space-y-4">
              {activities.map((act) => (
                <li
                  key={act.id}
                  className="bg-gray-900/40 p-4 rounded-xl border border-gray-700"
                >
                  <p className="text-lg font-medium">{act.title}</p>
                  <p className="text-gray-400 text-sm">{act.created_at}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
