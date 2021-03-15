<style>
.card {
  box-sizing: border-box;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>

<script lang="ts">
import type { IUpbitMarketData } from '../models/Cryptocurrency';

export let marketData: IUpbitMarketData;
</script>

<div class="card">
  <h1>{marketData.code}</h1>
  <strong>{marketData.trade_price.toLocaleString()}</strong>
</div>
