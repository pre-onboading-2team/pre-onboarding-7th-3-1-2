import { AxiosInstance } from "axios";

interface SickService {
  getSickList(params?: any): Promise<any>;
}

export class SickServiceImp implements SickService {
  private httpClient;

  constructor(httpsClient: AxiosInstance) {
    this.httpClient = httpsClient;
  }

  getSickList(params?: any): Promise<any> {
    return this.httpClient.get("/sick", { params });
  }
}
