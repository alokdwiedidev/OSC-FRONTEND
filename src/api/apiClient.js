import axios from "axios";

export const apiClient = {
  post: async (url, payload) => {
    try {
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      console.log("error in catch", error);
    }
  },
};
