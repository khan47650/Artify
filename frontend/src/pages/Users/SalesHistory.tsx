import {
    FaDownload,
    FaDollarSign,
    FaCheckCircle,
    FaChartLine,
} from "react-icons/fa";

import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import art3 from "@/assets/explore_3.png";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const sales = [
    {
        id: 1,
        artwork: "Echoes Of Blue",
        buyer: "Muhammad Abdullah",
        date: "18 July 2026",
        amount: "$420",
        quantity: 1,
        image: art1,
    },

    {
        id: 2,
        artwork: "Golden Shadows",
        buyer: "Sarah Khan",
        date: "20 July 2026",
        amount: "$760",
        quantity: 2,
        image: art2,
    },

    {
        id: 3,
        artwork: "Silent Nature",
        buyer: "Ayesha Noor",
        date: "25 July 2026",
        amount: "$590",
        quantity: 1,
        image: art3,
    },
];

const SalesHistory = () => {
    return (
        <section className="w-full overflow-hidden">
            {/* HEADER */}
            <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p
                        className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                    >
                        Seller Dashboard
                    </p>

                    <h1
                        className={`${headingFont} mt-2 text-[36px] leading-none text-[#111] sm:text-[46px] lg:text-[58px]`}
                    >
                        Sales History
                    </h1>

                    <p
                        className={`${bodyFont} mt-3 max-w-[650px] text-[14px] leading-6 text-[#6f6a63]`}
                    >
                        Track your sold artworks, completed transactions and earnings on
                        Artify marketplace.
                    </p>
                </div>

                {/* TOTAL EARNINGS */}
                <div
                    className="
            rounded-[24px]
            border
            border-[#ebe4d9]
            bg-gradient-to-br
            from-black
            to-[#1d1d1d]
            px-6
            py-5
            shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]
          "
                >
                    <p
                        className={`${bodyFont} text-[10px] uppercase tracking-[0.24em] text-white/60`}
                    >
                        Total Earnings
                    </p>

                    <h3
                        className={`${headingFont} mt-3 text-[38px] leading-none text-white`}
                    >
                        $1,770
                    </h3>
                </div>
            </div>

            {/* STATS */}
            <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                    ["Total Orders", sales.length],

                    ["Items Sold", sales.reduce((sum, s) => sum + s.quantity, 0)],

                    [
                        "Top Sale",
                        `$${Math.max(...sales.map(s => parseFloat(s.amount.replace("$", ""))))}`
                    ],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="
              rounded-[22px]
              border
              border-[#ebe4d9]
              bg-gradient-to-br
              from-white
              to-[#f8f5ef]
              p-4
              shadow-[0_10px_30px_-22px_rgba(0,0,0,0.18)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_45px_-22px_rgba(0,0,0,0.22)]
            "
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p
                                    className={`${bodyFont} text-[10px] uppercase tracking-[0.24em] text-[#8a847c]`}
                                >
                                    {label}
                                </p>

                                <h3
                                    className={`${headingFont} mt-3 text-[34px] leading-none text-[#111]`}
                                >
                                    {value}
                                </h3>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg">
                                <FaChartLine className="text-[14px]" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* SALES LIST */}
            <div className="space-y-5">
                {sales.map((sale) => (
                    <div
                        key={sale.id}
                        className="
              group
              overflow-hidden
              rounded-[28px]
              border
              border-[#ebe4d9]
              bg-white/90
              backdrop-blur-xl
              p-4
              shadow-[0_14px_35px_-24px_rgba(0,0,0,0.16)]
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:shadow-[0_24px_55px_-24px_rgba(0,0,0,0.22)]
            "
                    >
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                            {/* LEFT */}
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                                {/* IMAGE */}
                                <div className="relative overflow-hidden rounded-[22px]">
                                    <img
                                        src={sale.image}
                                        alt={sale.artwork}
                                        className="
                      h-[180px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                      sm:w-[220px]
                    "
                                    />

                                    <span
                                        className={`${bodyFont} absolute left-4 top-4 rounded-full bg-black/90 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white`}
                                    >
                                        Sold Artwork
                                    </span>
                                </div>

                                {/* INFO */}
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                    <Info
                                        label="Artwork"
                                        value={sale.artwork}
                                    />

                                    <Info
                                        label="Buyer Name"
                                        value={sale.buyer}
                                    />

                                    <Info
                                        label="Sold Date"
                                        value={sale.date}
                                    />

                                    <Info
                                        label="Quantity"
                                        value={String(sale.quantity)}
                                    />

                                    <Info
                                        label="Revenue"
                                        value={sale.amount}
                                    />

                                    {/* STATUS */}
                                    <div>
                                        <p
                                            className={`${bodyFont} text-[10px] uppercase tracking-[0.2em] text-[#8a847c]`}
                                        >
                                            Payment Status
                                        </p>

                                        <div className="mt-3">
                                            <span
                                                className={`${bodyFont} inline-flex items-center gap-2 rounded-full bg-[#eef7ea] px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#4d8f35]`}
                                            >
                                                <FaCheckCircle />
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ACTION */}
                            <div className="flex items-center">
                                <button
                                    className={`
                    ${bodyFont}
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-black
                    px-6
                    py-3
                    text-[12px]
                    uppercase
                    tracking-[0.12em]
                    text-white
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:bg-black/90
                    hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]
                  `}
                                >
                                    <FaDownload />
                                    Download Invoice
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
        <div className="min-w-[120px]">
            <p
                className={`${bodyFont} text-[10px] uppercase tracking-[0.2em] text-[#8a847c]`}
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

export default SalesHistory;