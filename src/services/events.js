import api from "./axios";

const events = {
  async getAll(){
    try {      
      const { data } = await api.get();
      return data;

    } catch (error) {

      return error;  
    }
    
  }
};

export default events;