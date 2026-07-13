import { NextResponse } from 'next/server';

function generateSparkline(startPrice: number, volatility: number) {
  let price = startPrice;
  const data = [];
  for (let i = 0; i < 24; i++) {
    price = price * (1 + (Math.random() * volatility * 2 - volatility));
    data.push({ time: `${i}:00`, price: Number(price.toFixed(2)) });
  }
  return data;
}

export async function GET() {
  const assets = [
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      price: 145.32,
      change24h: 5.2,
      balance: 14.5,
      chart: generateSparkline(138, 0.02)
    },
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 64230.10,
      change24h: -1.4,
      balance: 0.045,
      chart: generateSparkline(65000, 0.01)
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3450.75,
      change24h: 2.1,
      balance: 1.2,
      chart: generateSparkline(3380, 0.015)
    }
  ];

  const totalBalance = assets.reduce((acc, a) => acc + (a.price * a.balance), 0);
  
  // Generate 30-day portfolio chart
  let portVal = totalBalance * 0.8;
  const portfolioHistory = [];
  for(let i=30; i>0; i--) {
    portVal = portVal * (1 + (Math.random() * 0.06 - 0.025)); // slight upward bias
    portfolioHistory.push({
      day: `Day ${31-i}`,
      value: Number(portVal.toFixed(2))
    });
  }
  // Set last day to current exact balance
  portfolioHistory[portfolioHistory.length-1].value = Number(totalBalance.toFixed(2));

  return NextResponse.json({
    assets,
    totalBalance,
    portfolioHistory
  });
}
