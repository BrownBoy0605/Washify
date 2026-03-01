// app/ac-vent-foam-cleaning/page.tsx
import Navbar from "../components/navbar";
import PageHero from "../components/pageHero";
import QuickShinePricing from "../components/quickShinePricing";
import FooterSection from "../components/footer";
import ServicesGrid from "../components/Services";
import ServicePageWrapper from "../components/service-page-wrapper";

export default function ACVentFoamCleaning() {
    return (
        <ServicePageWrapper>
            <div className="justify-center items-center min-h-screen dark">
                <Navbar /> 
                <div>

                <PageHero
                    title="AC Vent Foam Cleaning"
                    bgSrc="/photos/horizontalBackground3.png"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "AC Vent Foam Cleaning" },
                    ]}
                    ctas={[{ label: "Book Now", href: "/booking" }]}
                    align="center"
                    subtitle="Restore clarity and safety with our expert AC vent foam cleaning service."
                    heightClassName="h-[60vh] min-h-[360px]"
                />

                <ServicesGrid
                    services={[
                        { title: "AC Foam Cleaning", icon: "/services/ac-vent.png" },
                    ]}
                />

                <QuickShinePricing prices={[299, 299, 299, 299, 299]} />

                <FooterSection />
                </div>
            </div>
        </ServicePageWrapper>
    );
}
