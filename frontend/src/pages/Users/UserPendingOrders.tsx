import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const orders = [
  {
    id: 1,
    artwork: "Echoes Of Blue",
    artist: "Omar Rashid",
    date: "12 July 2026",
    quantity: 1,
    price: "$320",
    status: "Pending",
    artImage: art1,
  },

  {
    id: 2,
    artwork: "Ethereal Motion",
    artist: "Sophia Laurent",
    date: "15 July 2026",
    quantity: 2,
    price: "$540",
    status: "Pending",
    artImage: art2,
  },
];

const UserPendingOrders = () => {
  return (
    <section>
      <div className="mb-8">
        <p
          className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
        >
          User Dashboard
        </p>

        <h1
          className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}
        >
          My Pending Orders
        </h1>

        <p
          className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}
        >
          Track all your pending artwork orders.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              group
              rounded-[30px]
              border
              border-[#e6dfd4]
              bg-white
              p-5
              shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.22)]
              hover:border-[#d4cdc1]
            "
          >
            <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center 2xl:justify-between">

              {/* LEFT SIDE */}
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

                {/* ART IMAGE */}
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src={order.artImage}
                    alt={order.artwork}
                    className="
                      h-[170px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                      sm:w-[230px]
                    "
                  />

                  <span
                    className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[11px] text-white`}
                  >
                    Pending Order
                  </span>
                </div>

                {/* ORDER INFO */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                  <Info
                    label="Artwork"
                    value={order.artwork}
                  />

                  <Info
                    label="Artist Name"
                    value={order.artist}
                  />

                  <Info
                    label="Order Date"
                    value={order.date}
                  />

                  <Info
                    label="Quantity"
                    value={String(order.quantity)}
                  />

                  <Info
                    label="Total Price"
                    value={order.price}
                  />

                  <div>
                    <p
                      className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
                    >
                      Status
                    </p>

                    <span
                      className={`${bodyFont} mt-3 inline-flex rounded-full bg-[#f7f4ee] px-4 py-1.5 text-[12px] text-[#111]`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="flex items-center gap-3">
                <button
                  className={`${bodyFont} rounded-full border border-red-200 bg-red-50 px-6 py-3 text-[13px] text-red-600 transition hover:bg-red-100`}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p
        className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
      >
        {label}
      </p>

      <h3
        className={`${headingFont} mt-2 text-[24px] leading-none text-[#111]`}
      >
        {value}
      </h3>
    </div>
  );
};

export default UserPendingOrders;