<script lang="ts">
interface IUpbitCode {
  english_name: string;
  korean_name: string;
  market: string;
}

interface IUpbitTickerData {
  type: string;
  code: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  prev_closing_price: number;
  acc_trade_price: number;
  change: string;
  change_price: number;
  signed_change_price: number;
  change_rate: number;
  signed_change_rate: number;
  ask_bid: string;
  trade_volume: number;
  acc_trade_volume: number;
  trade_date: string;
  trade_time: string;
  trade_timestamp: number;
  acc_ask_volume: number;
  acc_bid_volume: number;
  highest_52_week_price: number;
  highest_52_week_date: string;
  lowest_52_week_price: number;
  lowest_52_week_date: string;
  trade_status: any;
  market_state: string;
  market_state_for_ios: any;
  is_trading_suspended: boolean;
  delisting_date: any;
  market_warning: string;
  timestamp: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  stream_type: string;
}

let upbitMarketDataDict: { [key: string]: IUpbitTickerData } = {};

async function fetchCodes(): Promise<IUpbitCode[]> {
  const response = await fetch(
    'https://api.upbit.com/v1/market/all?isDetails=false'
  );
  return await response.json();
}

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
    const data: IUpbitTickerData = JSON.parse(message);
    upbitMarketDataDict[data.code] = data;
  };
});
</script>
