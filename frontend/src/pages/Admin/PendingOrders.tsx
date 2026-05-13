import art1 from "@/assets/explore_1.png";
import art2 from "@/assets/explore_2.png";
import payment1 from "@/assets/art-rose.jpg";

const headingFont = "font-['Luvy_Mode'] font-normal";
const bodyFont = "font-['Encode_Sans_Condensed']";

const orders = [
    {
        id: 1,
        customer: "Muhammad Abdullah",
        artwork: "Echoes Of Blue",
        artist: "Omar Rashid",
        location: "Lahore, Pakistan",
        date: "12 July 2026",
        quantity: 1,
        // Artwork image
        artImage: art1,

        // Payment screenshot
        paymentScreenshot: payment1,
    },

    {
        id: 2,
        customer: "Sarah Khan",
        artwork: "Ethereal Motion",
        artist: "Sophia Laurent",
        location: "Karachi, Pakistan",
        date: "15 July 2026",
        quantity: 2,

        // Artwork image
        artImage: art2,

        // No payment uploaded yet
        paymentScreenshot: null,
    },
];

const PendingOrders = () => {
    return (
        <section>
            <div className="mb-8">
                <p
                    className={`${bodyFont} text-[11px] uppercase tracking-[0.28em] text-[#777]`}
                >
                    Admin Dashboard
                </p>

                <h1
                    className={`${headingFont} mt-2 text-[38px] leading-none text-[#111] lg:text-[56px]`}
                >
                    Pending Orders
                </h1>

                <p
                    className={`${bodyFont} mt-3 text-[14px] text-[#6f6a63]`}
                >
                    Review customer payments and confirm orders.
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
                                        Ordered Artwork
                                    </span>
                                </div>

                                {/* ORDER INFO */}
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                                    <Info
                                        label="Customer Name"
                                        value={order.customer}
                                    />

                                    <Info
                                        label="Artwork"
                                        value={order.artwork}
                                    />
                                    <Info
                                        label="Artist Name"
                                        value={order.artist}
                                    />

                                    <Info
                                        label="Location"
                                        value={order.location}
                                    />

                                    <Info
                                        label="Order Date"
                                        value={order.date}
                                    />

                                    <Info
                                        label="Quantity"
                                        value={String(order.quantity)}
                                    />

                                    {/* PAYMENT STATUS */}
                                    <div>
                                        <p
                                            className={`${bodyFont} text-[11px] uppercase tracking-[0.22em] text-[#888]`}
                                        >
                                            Payment Status
                                        </p>

                                        {order.paymentScreenshot ? (
                                            <div className="mt-3">
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
                                                    className={`${bodyFont} mt-2 inline-flex rounded-full bg-[#eef7ea] px-3 py-1 text-[11px] text-[#4d8f35]`}
                                                >
                                                    Payment Uploaded
                                                </span>
                                            </div>
                                        ) : (
                                            <span
                                                className={`${bodyFont} mt-3 inline-flex rounded-full bg-[#f7f4ee] px-4 py-1.5 text-[12px] text-[#111]`}
                                            >
                                                Pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex items-center gap-3">
                                <button
                                    className={`${bodyFont} rounded-full bg-black px-6 py-3 text-[13px] text-white transition hover:bg-black/90`}
                                >
                                    Confirm
                                </button>

                                <button
                                    className={`${bodyFont} rounded-full border border-[#d8d2c8] bg-white px-6 py-3 text-[13px] text-[#111] transition hover:bg-[#f7f4ee]`}
                                >
                                    Cancel
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

export default PendingOrders;