type Props = {
  name: string;
  price: number;
  description: string;
  image?: string;
  onClick?: () => void;
};

export const MenuContainerCard = ({
  name,
  price,
  description,
  image,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className="w-99.25 h-85.5 p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={image || "/image/Product Image.svg"}
        alt="menuCard"
        className="w-full h-52.5 object-cover rounded-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold justify-between flex text-[#EF4444]">
          {name}{" "}
          <span className="text-xl font-bold text-black">
            ${price.toFixed(2)}
          </span>
        </h3>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
};