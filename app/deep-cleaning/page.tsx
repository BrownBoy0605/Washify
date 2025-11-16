import Image from "next/image";
import Navbar from "../components/navbar";
import PageHero from "../components/pageHero";
import ServicesGrid from "../components/Services";
import FooterSection from "../components/footer";
import QuickShinePricing from "../components/quickShinePricing";

export default function DeepCleaning() {
    return (
        <div className="justify-center items-center min-h-screen dark">
            <Navbar />
            <div>
            <PageHero
                title="Deep Cleaning"
                subtitle="Premium interior & exterior detailing for a like-new finish."
                bgSrc="/photos/horizontalBackground2.png"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Deep Cleaning" }]}
                ctas={[
                    { label: "Book Now", href: "/book/deep-cleaning" },
                    { label: "View Packages", href: "/services/deep-cleaning", variant: "secondary" },
                ]}
                align="center"
                heightClassName="h-[60vh] min-h-[360px]"
            />
            <ServicesGrid
                services={[
                    { title: "Vaccum Cleaning", icon: "/services/vaccum.png" },
                    { title: "Seats DryCleaning", icon: "/services/seats.png" },
                    { title: "Doors DryCleaning", icon: "/services/doors.png" },
                    { title: "Dashboard DryCleaning", icon: "/services/dashboard.png" },
                    { title: "Roof DryCleaning", icon: "/services/roof.png" },

                    { title: "Matts DryCleaning", icon: "/services/matts.png" },
                    { title: "Trunk DryCleaning", icon: "/services/boot.png" },
                    { title: "Shampoo Wash", icon: "/services/exterior.png" },
                    { title: "Interior Polishing", icon: "/services/interior.png" },
                    { title: "Tyre Polishing", icon: "/services/tyre.png" },
                ]}
            />

            <QuickShinePricing prices={[799, 999, 999, 1199, 1399]} />
            <FooterSection />
            </div>
        </div>
    );
}
