import fetch from "node-fetch";

export const handler = async () => {
  const endpoint = "https://mathtrainer.onrender.com/api/login";
  const credentials = {
    username: "x",
    password: "x",
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Keep-alive request sent successfully:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Keep-alive request successful" }),
    };
  } catch (error) {
    console.error("Error sending keep-alive request:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Keep-alive request failed",
        error: error.message,
      }),
    };
  }
};
