<style>
.card {
  box-sizing: border-box;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border: 1px solid transparent;
}

.col-1 {
  width: 150px;
}

.crypto_name {
  font-weight: 700;
}

.crypto_price {
  font-size: 1.3rem;
  font-weight: 700;
}

.EVEN {
  color: #2b2b2b;
}

.RISE {
  color: #d60000;
}

.FALL {
  color: #0051c7;
}

.upward_highlight {
  animation: up_highlight_anime 500ms ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.downward_highlight {
  animation: down_highlight_anime 500ms ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

@keyframes up_highlight_anime {
  from {
    background-color: #fff0f3;
    border-color: #d60000;
  }
  to {
    background-color: #ffffff;
    border-color: transparent;
  }
}

@keyframes down_highlight_anime {
  from {
    background-color: #e2ebff;
    border-color: #0051c7;
  }
  to {
    background-color: #ffffff;
    border-color: transparent;
  }
}
</style>

<script lang="ts">
import type { IUpbitTickerData } from '../models/Cryptocurrency';
import { afterUpdate } from 'svelte';

let renderCount = 0;
let trade_price;
let isUpward = false;

export let koreanName: string;
export let englishName: string;
export let tickerData: IUpbitTickerData;

afterUpdate(() => {
  renderCount++;
  if (trade_price && trade_price != tickerData.trade_price) {
    isUpward = trade_price < tickerData.trade_price;
  }
  trade_price = tickerData.trade_price;
});
</script>

<div
  class="{`card ${
    trade_price ? (isUpward ? 'upward_highlight' : 'downward_highlight') : null
  }`}">
  <div class="md:flex">
    <div class="col-1">
      <h1 class="crypto_name">{koreanName}</h1>
      <strong class="crypto_price {tickerData.change}"
        >{tickerData.trade_price.toLocaleString()}</strong>
    </div>

    <div class="mx-8">
      <h1>전일대비</h1>
      <div class="{tickerData.change}">
        <div>
          {(tickerData.signed_change_rate * 100).toFixed(2)}%
        </div>
        {tickerData.signed_change_price.toLocaleString()}
      </div>
    </div>

    <div class="mx-8">
      <h1>거래대금</h1>
      {tickerData.acc_trade_price.toLocaleString()}
    </div>
  </div>
</div>
