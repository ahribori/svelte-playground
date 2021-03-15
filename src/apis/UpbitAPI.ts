import axios from 'axios';
import type { IUpbitCurrencyCode } from '../models/Cryptocurrency';

class UpbitAPI {
  static async fetchCodes() {
    return axios.get<IUpbitCurrencyCode[]>(
      'https://api.upbit.com/v1/market/all?isDetails=false'
    );
  }
}

export default UpbitAPI;
