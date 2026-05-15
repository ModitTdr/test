interface CoinDataProps {
  image: string;
  name: string;
  symbol: string;
}
const CoinData = ({ image, name, symbol }: CoinDataProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="flex flex-col uppercase text-start">
        <span className="text-sm font-black">{symbol}</span>
        <span className="text-[10px] opacity-60 tracking-wider">{name}</span>
      </div>
    </div>
  )
}

export default CoinData