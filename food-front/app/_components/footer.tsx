export const Footer = () => {
  return (
    <footer className="bg-[#18181B] text-white w-full mx-auto h-[650px] flex flex-col">
      <div className="flex mt-15 pl-25 gap-10.4 bg-[#EF4444] h-23 w-full items-center justify-between text-white text-lg font-bold">
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
        <p>Fresh fast delivered</p>
      </div>
      <div className="pl-22 pt-19 justify-center gap-25 flex flex-row">
        <div className="flex flex-col gap-2 "
        >
          <img
            src="/icons/BrandLogo.svg"
            alt="logoFood"
            width={46}
            height={37}
          />
          <div>
            {" "}
            <p className="font-inter text-white p-0 m-0 h-0">
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <br />
            <p className="text-xs font-medium  text-white flex flex-col">
              Swift delivery
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-18">
          <div className="flex-col text-white">
            <p className="font-bold text-[#71717A]">NOMNOM</p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex-col text-white">
            <p className="font-bold text-[#71717A]">MENU</p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishes</p>
            <p>Desserts</p>
          </div>
          <div className="flex-col text-white">
            <p className="font-bold  text-transparent">.</p>
            <p>Slice dish</p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="flex-col text-white">
            <p className="font-bold text-[#71717A]">FOLLOW US</p>
            <div className="flex flex-row gap-2">
              <img src="/icons/Social icon.svg" alt="facebookLogo" />
              <img src="/icons/instagram.png" alt="instagramLogo" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-26 px-22 w-full">
        <div className="flex gap-12 w-full py-8 border-t border-(--border-border-toast-destructive,#F4F4F566)">
          {" "}
          <div className="flex gap-1 ">
            <p>Copy right 2024</p>
            <p>©</p>
            <p>Nomnom LLC</p>
          </div>
          <p>Privacy policy </p>
          <p>Terms of service</p>
          <p>Cookie policy</p>
        </div>
      </div>
    </footer>
  );
};
