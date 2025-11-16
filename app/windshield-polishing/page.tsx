// app/rubbing-polishing/page.tsx
import Navbar from "../components/navbar";
import PageHero from "../components/pageHero";
import QuickShinePricing from "../components/quickShinePricing";
import FooterSection from "../components/footer";
import ServicesGrid from "../components/Services";

export default function WindShieldPolishing() {
    return (
        <div className="justify-center items-center min-h-screen dark">
            <Navbar />
            <div className="pt-14">

            <PageHero
                title="Windshield Polishing"
                bgSrc="/photos/horizontalBackground3.png"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Windshield Polishing" },
                ]}
                ctas={[{ label: "Book Now", href: "/book/windshield-polishing" }]}
                align="center"
                subtitle="Restore clarity and safety with our expert windshield polishing service."
                heightClassName="h-[60vh] min-h-[360px]"
            />

            <ServicesGrid
                services={[
                    { title: "Shampoo Wash", icon: "/services/exterior.png" },
                    { title: "Sandpaper Rubbing", icon: "/services/sandpaper.png" },
                    { title: "Windshield Rubbing", icon: "/services/windshield.png" },
                    { title: "Headlight Rubbing", icon: "/services/headlight-rubbing.png" },
                ]}
            />

            <QuickShinePricing prices={[799, 899, 899, 999, 999]} />

            <FooterSection />
            </div>
        </div>
    );
}
