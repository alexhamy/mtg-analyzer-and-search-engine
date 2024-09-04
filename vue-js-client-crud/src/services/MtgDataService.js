
import http from "../http-common";

class MtgDataService {
  getAll(params) {
    return http.get("/mtg", { params });
  }

  get(id) {
    return http.get(`/mtg/${id}`);
  }

  create(data) {
    return http.post("/mtg", data);
  }

  update(id, data) {
    return http.put(`/mtg/${id}`, data);
  }

  delete(id) {
    return http.delete(`/mtg/${id}`);
  }

  findByName(name) {
    return http.get(`/mtg?name=${name}`, );
  }
}

export default new MtgDataService();
