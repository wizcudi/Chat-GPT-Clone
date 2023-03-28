

export const getModels = async () => {
    const response = await fetch("http://localhost:3080/models");
    const data = await response.json();
    return data.models;
};
  
export const sendMessage = async (messages, currentModel) => {
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      }),
    });
    const data = await response.json();
    return data;
};
  