import React, { useEffect, useState } from "react";
import refreshToken from "../utils/refreshToken"; 

function AdminPanel() {
  const [shareLink, setShareLink] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    } else {
      alert("You are not authenticated. Redirecting to login.");
      window.location.href = "/login";
    }
  }, []);

  const requestShareToken = async (tokenToUse) => {
    const response = await fetch("https://tnp-recruitment-challenge.manitvig.live/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenToUse}`,
      },
    });
    return response;
  };

  const handleGenerateLink = async () => {
    try {
      let response = await requestShareToken(accessToken);

      if (response.status === 401) {
        const newToken = await refreshToken();
        if (!newToken) return;

        setAccessToken(newToken);
        response = await requestShareToken(newToken);
      }

      const data = await response.json();
  const link = `${window.location.origin}/?shareToken=${data.shareToken}`;
      setShareLink(link);
    } catch (error) {
      console.error("Error generating share link:", error);
      alert("Something went wrong while generating the share link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

        <button
          onClick={handleGenerateLink}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
        >
          Generate Share Link
        </button>

        {shareLink && (
          <div className="mt-6">
            <p className="text-gray-700 mb-2 font-medium">Here is your shareable link:</p>
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
