// app/rubbing-polishing/page.tsx
import Navbar from "../components/navbar";
import PageHero from "../components/pageHero";
import QuickShinePricing from "../components/quickShinePricing";
import FooterSection from "../components/footer";
import ServicesGrid from "../components/Services";

export default function RubbingPolishing() {
    return (
        <div className="justify-center items-center min-h-screen dark">
            <Navbar />
            <div>

            <PageHero
                title="Rubbing & Polishing"
                bgSrc="/photos/horizontalBackground3.png"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Rubbing & Polishing" },
                ]}
                ctas={[{ label: "Book Now", href: "/booking" }]}
                align="center"
                subtitle="Deep paint restoration with machine rubbing & premium wax polish."
                heightClassName="h-[60vh] min-h-[360px]"
            />

            <ServicesGrid
                services={[
                    { title: "Shampoo Wash", icon: "/services/exterior.png" },
                    { title: "Sandpaper Rubbing", icon: "/services/sandpaper.png" },
                    { title: "Roof Buffing", icon: "/services/roof-rubbing.png" },      // use your roof buffing image here
                    { title: "Bonet Rubbing", icon: "/services/bonnet.png" },           // file is bonnet.png
                    { title: "Doors Rubbing", icon: "/services/doorsRub.png" },
                    { title: "Headlight Rubbing", icon: "/services/headlight-rubbing.png" },
                    { title: "Boot Buffing", icon: "/services/boot-buffing .png" },      // remove space in file if needed
                    { title: "Exterior Wax Polishing", icon: "/services/exteriorWAX.png" },
                ]}
            />

            <QuickShinePricing prices={[1399, 1599, 1599, 1799, 1799]} />

            <FooterSection />
            </div>
        </div>
    );
}
