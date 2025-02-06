const axios = require("axios");

async function getAuthToken() {
  try {
    const response = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      {
        api_key:
          "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBeU1qQTRNU3dpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5XLVdXSUFJTHBHVUEwSkJ0aU9HMEl4MnNuTmc1NU5fZGxZX3B4WktETVFDY3E0SG4yTGRSSTNwOS04V1ZiU3owejdEQi1rZkRLNEYyOVYtc2RhMmdhQQ==",
      }
    );
    // console.log("paymob api response successfull");
    console.log("✅ Auth Token:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("Error getting auth token:", error.response.data);
  }
}

getAuthToken().then((token) => console.log("Auth Token:", token));
