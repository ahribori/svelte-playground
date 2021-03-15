import { writable } from 'svelte/store';
import type { IUpbitTickerData } from '../models/Cryptocurrency';

export const upbitMarket = writable<{ [key: string]: IUpbitTickerData }>({});
