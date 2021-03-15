<style>
.page-container {
  max-width: 720px;
  margin: 0 auto;
}
</style>

<script lang="ts">
import type { IUpbitCode, IUpbitMarketData } from '../models/Cryptocurrency';
import CoinItem from '../components/CoinItem.svelte';
import { onMount } from 'svelte';
export let location;
let upbitMarketDataDict: { [key: string]: IUpbitMarketData } = {};

async function fetchCodes(): Promise<IUpbitCode[]> {
  const response = await fetch(
    'https://api.upbit.com/v1/market/all?isDetails=false'
  );
  return await response.json();
}

onMount(() => {
  fetchCodes().then((data) => {
    const upbitSocket = new WebSocket('wss://api.upbit.com/websocket/v1');
    upbitSocket.binaryType = 'arraybuffer';

    const codes = data
      .filter((data) => data.market.startsWith('KRW'))
      .map((data) => data.market);

    upbitSocket.onopen = () => {
      console.log('onopen');
      return upbitSocket.send(
        JSON.stringify([
          { ticket: 'test' },
          {
            type: 'ticker',
            codes,
          },
        ])
      );
    };

    upbitSocket.onmessage = (event) => {
      const decoder = new TextDecoder();
      const message = decoder.decode(event.data);
      const upbitMarketData: IUpbitMarketData = JSON.parse(message);
      upbitMarketDataDict[upbitMarketData.code] = upbitMarketData;
    };
  });
});
</script>

<div class="page-container">
  {#each Object.values(upbitMarketDataDict) as coin (coin.code)}
    <CoinItem marketData="{coin}" />
  {/each}
</div>
