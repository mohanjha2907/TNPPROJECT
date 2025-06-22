import axios from "axios";

const refreshToken = async () => {
  try {
    const refreshTokenPrev = localStorage.getItem("refreshToken");

    const res = await axios.post(
      "https://tnp-recruitment-challenge.manitvig.live/refresh",
      { refreshToken: refreshTokenPrev }
    );

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.clear();
    window.location.href = "/login";
    return null;
  }
};

export default refreshToken;
