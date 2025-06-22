import React, { useEffect, useState } from "react";

function PublicShare() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const shareToken = new URLSearchParams(window.location.search).get("shareToken");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${shareToken}`
        );
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    if (shareToken) fetchData();
  }, [shareToken]);

  const filteredData = data.filter((item) =>
    item.email?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Public Share Page</h1>

        <input
          className="w-full max-w-md mx-auto block mb-6 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by email..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="overflow-x-auto rounded-lg shadow mt-4">
          <table className="w-full table-auto border border-gray-200 text-left bg-white">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">Name</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">Email</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">Roll No</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-3 border-b border-gray-100">
                    {item.first_name} {item.last_name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100">{item.email}</td>
                  <td className="px-4 py-3 border-b border-gray-100">{item.roll_no}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No matching data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PublicShare;
