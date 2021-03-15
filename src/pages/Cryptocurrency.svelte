<style>
.page-container {
  font-family: 'Nanum Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  max-width: 720px;
  margin: 4rem auto;
}
</style>

<script lang="ts">
import type {
  IUpbitCurrencyCode,
  IUpbitTickerData,
} from '../models/Cryptocurrency';
import CoinItem from '../components/CryptocurrencyItem.svelte';
import { onMount } from 'svelte';
import { upbitMarket } from '../stores/cryptocurrency';
import UpbitAPI from '../apis/UpbitAPI';
import UpbitWebsocketAPI from '../apis/websocket/UpbitWebsocketAPI';

export let location;
let messageReceived = 0;
let upbitMarketCodes: { [key: string]: IUpbitCurrencyCode } = {};
let upbitTickerDataDict: { [key: string]: IUpbitTickerData } = {};

onMount(async () => {
  try {
    const fetchCodesResponse = await UpbitAPI.fetchCodes();
    const upbitWebsocket = new UpbitWebsocketAPI().getSocket();

    const codes = fetchCodesResponse.data
      .filter((data) => data.market.startsWith('KRW'))
      .map((data) => {
        upbitMarketCodes[data.market] = data;
        return data.market;
      });

    upbitWebsocket.onopen = () => {
      console.log('onopen');
      return upbitWebsocket.send(
        JSON.stringify([
          { ticket: 'test' },
          {
            type: 'ticker',
            codes,
          },
        ])
      );
    };

    upbitWebsocket.onmessage = (event) => {
      const decoder = new TextDecoder();
      const message = decoder.decode(event.data);
      const tickerData: IUpbitTickerData = JSON.parse(message);
      messageReceived++;
      upbitMarket.update((value) => ({
        ...value,
        [tickerData.code]: tickerData,
      }));
    };

    upbitMarket.subscribe((value) => {
      upbitTickerDataDict = value;
    });
  } catch (e) {
    throw e;
  }
});
</script>

<div class="page-container">
  <h1>Message received: {messageReceived}</h1>
  {#each Object.values(upbitTickerDataDict) as tickerData (tickerData.code)}
    <CoinItem
      tickerData="{tickerData}"
      koreanName="{upbitMarketCodes[tickerData.code].korean_name}"
      englishName="{upbitMarketCodes[tickerData.code].english_name}" />
  {/each}
</div>
