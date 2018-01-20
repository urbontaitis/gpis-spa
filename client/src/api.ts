import axios from "axios";

export default {
  alerts: {
    fetchAll: (lang: string) =>
      axios.get(`http://localhost:8080/api/alerts?lang=${lang}`)
  }
};
