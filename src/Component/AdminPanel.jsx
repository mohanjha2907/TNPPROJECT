import React, { useState } from "react";

function AdminPanel() {
  const [token, setToken] = useState("");
  const [shareLink, setShareLink] = useState("");

  async function handleLogin() {
    const res = await fetch("https://tnp-recruitment-challenge.manitvig.live/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "admin", password: "admin" }),
    });
    const data = await res.json();
    setToken(data.accessToken);
  }

  async function generateShareToken() {
    const res = await fetch("https://tnp-recruitment-challenge.manitvig.live/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setShareLink(`http://localhost:5173/public?shareToken=${data.shareToken}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
        <div className="space-x-4 mb-6">
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Login as Admin
          </button>
          <button
            onClick={generateShareToken}
            disabled={!token}
            className={`${
              token ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"
            } text-white font-semibold py-2 px-6 rounded shadow`}
          >
            Generate Link
          </button>
        </div>
        {shareLink && (
          <div className="mt-6">
            <p className="text-gray-700 mb-2 font-medium">Share this link:</p>
            <a
              href={shareLink}
              className="text-blue-600 break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shareLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
