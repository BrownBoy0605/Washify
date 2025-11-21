import Image from "next/image";
import Navbar from "../components/navbar";
import PageHero from "../components/pageHero";
import QuickShinePricing from "../components/quickShinePricing";
import FooterSection from "../components/footer";
import ServicesGrid from "../components/Services";
import ServicePageWrapper from "../components/service-page-wrapper";

export default function QuickShine() {
    return (
        <ServicePageWrapper>
            <div className="justify-center items-center min-h-screen dark">
                <Navbar />
                <div>
                <PageHero
                    title="Quick Shine"
                    bgSrc="/photos/horizontalBackground.png"
                    breadcrumbs={[{ label: "Home", href: "/" }, { label: "Quick Shine" }]}
                    ctas={[{ label: "Book Now", href: "/booking" }]}
                    align="center"
                    subtitle="Fast and professional exterior shine with premium finishing."
                    heightClassName="h-[60vh] min-h-[360px]"
                />
                <ServicesGrid
                    services={[
                        { title: "Vacuum Cleaning", icon: "/services/vaccum.png" },
                        { title: "Interior Dusting", icon: "/services/interiorDusting.png" },
                        { title: "Shampoo Washing", icon: "/services/exterior.png" },
                        { title: "Dashboard Polishing", icon: "/services/dashboard.png" },
                        { title: "Tyre Polish", icon: "/services/tyre.png" },
                    ]}
                />
                <QuickShinePricing prices={[349, 399, 399, 449, 449]} />
                <FooterSection />
                </div>
            </div>
        </ServicePageWrapper>
    );
}
