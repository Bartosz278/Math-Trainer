
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/keep-alive/keep-alive.mjs
import fetch from "node-fetch";
var keep_alive_default = async (req) => {
  try {
    const response = await fetch("https://mathtrainer.onrender.com/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "x",
        // Podstawowy użytkownik
        password: "x"
        // Podstawowe hasło
      })
    });
    const data = await response.json();
    console.log("Received event! Response from server:", data);
    return {
      statusCode: response.status,
      body: JSON.stringify({ success: true, data })
      // Zwracamy odpowiedź
    };
  } catch (error) {
    console.error("Error during keep-alive request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
var config = {
  schedule: "*/1 * * * *"
  // Uruchamianie funkcji co minutę
};
export {
  config,
  keep_alive_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMva2VlcC1hbGl2ZS9rZWVwLWFsaXZlLm1qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IGZldGNoIGZyb20gXCJub2RlLWZldGNoXCI7IC8vIFVcdTAxN0N5d2FteSAnbm9kZS1mZXRjaCcgZG8gd3lrb255d2FuaWEgemFweXRhXHUwMTQ0IEhUVFBcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHJlcSkgPT4ge1xuICB0cnkge1xuICAgIC8vIFd5a29udWplbXkgemFweXRhbmllIFBPU1QgZG8gZW5kcG9pbnR1ICdodHRwczovL21hdGh0cmFpbmVyLm9ucmVuZGVyLmNvbS9hcGkvbG9naW4nXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vbWF0aHRyYWluZXIub25yZW5kZXIuY29tL2FwaS9sb2dpblwiLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICB1c2VybmFtZTogXCJ4XCIsIC8vIFBvZHN0YXdvd3kgdVx1MDE3Q3l0a293bmlrXG4gICAgICAgIHBhc3N3b3JkOiBcInhcIiwgLy8gUG9kc3Rhd293ZSBoYXNcdTAxNDJvXG4gICAgICB9KSxcbiAgICB9KTtcblxuICAgIC8vIE9kY3p5dHVqZW15IG9kcG93aWVkXHUwMTdBIHcgZm9ybWFjaWUgSlNPTlxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIGV2ZW50ISBSZXNwb25zZSBmcm9tIHNlcnZlcjpcIiwgZGF0YSk7IC8vIExvZ3VqZW15IG9kcG93aWVkXHUwMTdBIHNlcndlcmFcblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSksIC8vIFp3cmFjYW15IG9kcG93aWVkXHUwMTdBXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIGtlZXAtYWxpdmUgcmVxdWVzdDpcIiwgZXJyb3IpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSxcbiAgICB9O1xuICB9XG59O1xuXG4vLyBLb25maWd1cmFjamEgcGxhbnUgdXJ1Y2hhbWlhbmlhIGZ1bmtjamkgY28gbWludXRcdTAxMTlcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIHNjaGVkdWxlOiBcIiovMSAqICogKiAqXCIsIC8vIFVydWNoYW1pYW5pZSBmdW5rY2ppIGNvIG1pbnV0XHUwMTE5XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVztBQUVsQixJQUFPLHFCQUFRLE9BQU8sUUFBUTtBQUM1QixNQUFJO0FBRUYsVUFBTSxXQUFXLE1BQU0sTUFBTSw4Q0FBOEM7QUFBQSxNQUN6RSxRQUFRO0FBQUEsTUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLE1BQzlDLE1BQU0sS0FBSyxVQUFVO0FBQUEsUUFDbkIsVUFBVTtBQUFBO0FBQUEsUUFDVixVQUFVO0FBQUE7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNILENBQUM7QUFHRCxVQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFFakMsWUFBUSxJQUFJLHlDQUF5QyxJQUFJO0FBRXpELFdBQU87QUFBQSxNQUNMLFlBQVksU0FBUztBQUFBLE1BQ3JCLE1BQU0sS0FBSyxVQUFVLEVBQUUsU0FBUyxNQUFNLEtBQUssQ0FBQztBQUFBO0FBQUEsSUFDOUM7QUFBQSxFQUNGLFNBQVMsT0FBTztBQUNkLFlBQVEsTUFBTSxvQ0FBb0MsS0FBSztBQUN2RCxXQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsTUFDWixNQUFNLEtBQUssVUFBVSxFQUFFLFNBQVMsT0FBTyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQUEsSUFDL0Q7QUFBQSxFQUNGO0FBQ0Y7QUFHTyxJQUFNLFNBQVM7QUFBQSxFQUNwQixVQUFVO0FBQUE7QUFDWjsiLAogICJuYW1lcyI6IFtdCn0K
