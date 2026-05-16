import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import payment1 from "@/assets/art-rose.jpg";
import payment2 from "@/assets/explore_3.png";

import {
  FaCheckCircle,
  FaTrashAlt,
} from "react-icons/fa";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const historyOrders = [
  {
    id: 1,
    artwork: "Echoes Of Blue",
    artist: "Omar Rashid",
    location: "Lahore, Pakistan",
    completedDate: "18 July 2026",
    quantity: 1,
    total: "$420",
    artImage: art1,
    paymentScreenshot: payment1,
  },

  {
    id: 2,
    artwork: "Ethereal Motion",
    artist: "Ayesha Khan",
    location: "Karachi, Pakistan",
    completedDate: "20 July 2026",
    quantity: 2,
    total: "$860",
    artImage: art2,
    paymentScreenshot: payment2,
  },
];

const OrdersHistory = () => {
  return (
    <section>
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p
            className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
          >
            User Dashboard
          </p>

          <h1
            className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}
          >
            Orders History
          </h1>

          <p
            className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}
          >
            View and manage your previous order history.
          </p>
        </div>

        {/* CLEAR HISTORY BUTTON */}
        <button
          className={`${bodyFont} inline-flex items-center justify-center gap-2 rounded-full border border-[#d8d2c8] bg-white px-6 py-3 text-[13px] text-[#111] transition hover:bg-[#f7f4ee]`}
        >
          <FaTrashAlt />
          Clear History
        </button>
      </div>

      {/* ORDERS */}
      <div className="space-y-5">
        {historyOrders.map((order) => (
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

              {/* LEFT */}
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

                {/* ART IMAGE */}
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src={order.artImage}
                    alt={order.artwork}
                    className="
                      h-[180px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                      sm:w-[240px]
                    "
                  />

                  <span
                    className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[11px] text-white`}
                  >
                    Order History
                  </span>
                </div>

                {/* INFO */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                  <Info
                    label="Artwork"
                    value={order.artwork}
                  />

                  <Info
                    label="Artist"
                    value={order.artist}
                  />

                  <Info
                    label="Location"
                    value={order.location}
                  />

                  <Info
                    label="Completed Date"
                    value={order.completedDate}
                  />

                  <Info
                    label="Quantity"
                    value={String(order.quantity)}
                  />

                  <Info
                    label="Total Amount"
                    value={order.total}
                  />

                  {/* PAYMENT */}
                  <div>
                    <p
                      className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
                    >
                      Payment Status
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={order.paymentScreenshot}
                        alt="Payment Screenshot"
                        className="
                          h-[70px]
                          w-[90px]
                          rounded-[14px]
                          border
                          border-[#ddd]
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <span
                        className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-[#eef7ea] px-4 py-1.5 text-[11px] text-[#4d8f35]`}
                      >
                        <FaCheckCircle />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTION */}
              <div className="flex items-center gap-3">
                <button
                  className={`${bodyFont} inline-flex items-center gap-2 rounded-full border border-[#e2cfcf] bg-[#fff5f5] px-6 py-3 text-[13px] text-[#b42318] transition hover:bg-[#ffecec]`}
                >
                  <FaTrashAlt />
                  Clear From History
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

export default OrdersHistory;