<style>
.card {
  box-sizing: border-box;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>

<script lang="ts">
import type { IUpbitTickerData } from '../models/Cryptocurrency';
import { afterUpdate } from 'svelte';

let renderCount = 0;
export let koreanName: string;
export let englishName: string;
export let tickerData: IUpbitTickerData;

afterUpdate(() => {
  renderCount++;
});
</script>

<div class="card">
  <h1>{koreanName}</h1>
  <strong>{tickerData.trade_price.toLocaleString()}</strong>
</div>
