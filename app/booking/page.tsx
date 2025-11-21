"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import FooterSection from "../components/footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

// Assets expected:
// /public/cars/{compact-suv.jpg,hatchback.jpg,sedan.jpg,suv-5-seater.jpg,suv-7-seater.jpg}
// /public/services/{quick-shine.png,deep.png,rubbing.png,windshield.png}

const cities = ["Jaipur", "Gurgaon", "Delhi", "Noida", "Pune", "Bengaluru"]; // adjust as needed

const PACKAGES = [
  { key: "quick", label: "Quick Shine", img: "/services/quick-shine.png", desc: "Exterior wash + quick dry" },
  { key: "deep", label: "Deep Cleaning", img: "/services/deep.png", desc: "Interior shampoo + vacuum + exterior wash" },
  { key: "rubbing", label: "Rubbing & Polishing", img: "/services/rubbing.png", desc: "Paint correction + polish" },
  { key: "windshield", label: "WindShield Polishing", img: "/services/windshield.png", desc: "Glass polishing + water repellent" },
] as const;

const CARS = [
  { key: "hatchback", label: "Hatchback", img: "/cars/hatchback.jpg" },
  { key: "sedan", label: "Sedan", img: "/cars/sedan.jpg" },
  { key: "compact", label: "Compact SUV", img: "/cars/compact-suv.jpg" },
  { key: "suv5", label: "SUV 5 Seater", img: "/cars/suv-5-seater.jpg" },
  { key: "suv7", label: "SUV 7 Seater", img: "/cars/suv-7-seater.jpg" },
] as const;

const PRICING: Record<string, Record<string, number>> = {
  quick: { hatchback: 399, sedan: 399, compact: 399, suv5: 449, suv7: 449 },
  deep: { hatchback: 799, sedan: 999, compact: 999, suv5: 1199, suv7: 1399 },
  rubbing: { hatchback: 1399, sedan: 1599, compact: 1599, suv5: 1799, suv7: 1799 },
  windshield: { hatchback: 799, sedan: 899, compact: 899, suv5: 999, suv7: 999 },
};

const TIME_SLOTS = [
  { id: "slot1", label: "9am - 11am" },
  { id: "slot2", label: "11am - 1pm" },
  { id: "slot3", label: "1pm - 3pm" },
  { id: "slot4", label: "3pm - 5pm" },
];

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Jaipur");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<Set<(typeof PACKAGES)[number]["key"]>>(new Set());
  const [car, setCar] = useState<typeof CARS[number]["key"] | null>(null);
  const [agree, setAgree] = useState(false);
  const [waterPower, setWaterPower] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("bookingFormData");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.name) setName(data.name);
        if (data.phone) setPhone(data.phone);
        if (data.city) setCity(data.city);
        if (data.address) setAddress(data.address);
        if (data.packages && Array.isArray(data.packages)) {
          setSelectedPackages(new Set(data.packages));
        }
        if (data.car) setCar(data.car);
        if (data.waterPower) setWaterPower(data.waterPower);
      } catch (error) {
        console.error("Failed to load form data from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    const dataToSave = {
      name,
      phone,
      city,
      address,
      packages: Array.from(selectedPackages),
      car,
      waterPower,
    };
    localStorage.setItem("bookingFormData", JSON.stringify(dataToSave));
  }, [name, phone, city, address, selectedPackages, car, waterPower]);

  const price = useMemo(() => {
    if (!car || selectedPackages.size === 0) return 0;
    let total = 0;
    selectedPackages.forEach((pkgKey) => {
      total += PRICING[pkgKey]?.[car] ?? 0;
    });
    return total;
  }, [selectedPackages, car]);

  function togglePackage(key: (typeof PACKAGES)[number]["key"]) {
    setSelectedPackages((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function getMinDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function validate() {
    const e: string[] = [];
    if (name.trim().length < 2) e.push("Please enter your full name.");
    if (!/^\d{10}$/.test(phone)) e.push("Phone number must be exactly 10 digits.");
    if (!date) e.push("Please select a booking date.");
    else if (new Date(date) < new Date(new Date().toISOString().split('T')[0])) e.push("Booking date must be today or later.");
    if (!timeSlot) e.push("Please choose a time slot.");
    if (selectedPackages.size === 0) e.push("Please select at least one package.");
    if (!car) e.push("Please select a car type.");
    if (!agree) e.push("You must agree to the Terms and Conditions.");
    setErrors(e);
    return e.length === 0;
  }

  function clearForm() {
    setName("");
    setPhone("");
    setCity("Jaipur");
    setAddress("");
    setDate("");
    setTimeSlot(null);
    setSelectedPackages(new Set());
    setCar(null);
    setAgree(false);
    setWaterPower(false);
    setErrors([]);
    localStorage.removeItem("bookingFormData");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      name,
      phone,
      city,
      address,
      date,
      timeSlot,
      packages: Array.from(selectedPackages),
      car,
      price,
      waterPower,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`✅ Booking confirmed! Your booking ID is: ${data.bookingId}`);
        // Reset only date and time slot, keep frequently used data in localStorage
        setDate("");
        setTimeSlot(null);
        setAgree(false);
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.error || "Failed to create booking"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-20 pb-16">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">New</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Book a Service</h1>
            <p className="text-muted-foreground mt-1">Fast, safe and eco-friendly car care — pick multiple packages if you like.</p>
          </div>
          <div className="hidden md:flex gap-3">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Selected Date</div>
              <div className="font-medium">{date || "—"}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Time Slot</div>
              <div className="font-medium">{timeSlot || "—"}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Form - left two columns */}
          <div className="md:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground">Tell us a few details and we’ll schedule your service.</CardTitle>
              </CardHeader>
              <CardContent>
                {errors.length > 0 && (
                  <div className="mb-4 rounded-xl border bg-destructive/10 p-4 text-destructive">
                    <ul className="list-inside list-disc space-y-1 text-sm">
                      {errors.map((er, i) => (
                        <li key={i}>{er}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone No.</Label>
                      <Input
                        id="phone"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      />
                      <p className="text-xs text-muted-foreground">Phone number must be exactly 10 digits.</p>
                    </div>
                  </section>

                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="House no., street, landmark..." value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                  </section>

                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Booking Date</Label>
                      <Input id="date" type="date" min={getMinDate()} value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Time Slot</Label>
                      <RadioGroup className="grid grid-cols-2 gap-2 md:grid-cols-4" value={timeSlot ?? ""} onValueChange={(v: string) => setTimeSlot(v)}>
                        {TIME_SLOTS.map((s) => (
                          <div key={s.id} className="flex items-center gap-2 rounded-xl border p-2">
                            <RadioGroupItem id={s.id} value={s.label} />
                            <Label htmlFor={s.id} className="cursor-pointer text-sm">{s.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </section>

                  {/* Packages */}
                  <section>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-base font-semibold">Choose Package</div>
                      <div className="text-sm text-muted-foreground">{selectedPackages.size} selected</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {PACKAGES.map((p) => {
                        const selected = selectedPackages.has(p.key);
                        return (
                          <motion.button
                            key={p.key}
                            type="button"
                            onClick={() => togglePackage(p.key)}
                            initial={false}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all hover:shadow-md ${selected ? "ring-2 ring-primary" : ""}`}
                          >
                            <div className="relative aspect-[4/3] w-full">
                              <Image src={p.img} alt={p.label} fill className="object-contain p-2" />
                            </div>
                            <div className="mt-2 flex items-start justify-between gap-2">
                              <div>
                                <div className="text-sm font-medium">{p.label}</div>
                                <div className="text-xs text-muted-foreground">{p.desc}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold">₹ {car ? PRICING[p.key][car] : "—"}</div>
                                {selected && <Badge>Selected</Badge>}
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Car */}
                  <section>
                    <div className="mb-3 text-base font-semibold">Select Car Type</div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                      {CARS.map((c) => {
                        const selected = car === c.key;
                        return (
                          <button key={c.key} type="button" onClick={() => setCar(c.key)} className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all hover:shadow-md ${selected ? "ring-2 ring-primary" : ""}`}>
                            <div className="relative aspect-[4/3] w-full">
                              <Image src={c.img} alt={c.label} fill className="object-contain p-2" />
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-sm font-medium">{c.label}</span>
                              {selected && <Badge>Selected</Badge>}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <section className="grid gap-4 md:grid-cols-2 items-start">
                    <div>
                      <div className="flex items-start gap-3">
                        <Checkbox id="agree" checked={agree} onCheckedChange={(v: boolean) => setAgree(v)} />
                        <div className="text-sm">
                          I agree to the
                          <Dialog>
                            <DialogTrigger asChild>
                              <button type="button" className="ml-1 underline text-primary">Terms and Conditions</button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Terms & Conditions</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-2 text-sm text-muted-foreground">
                                <p><strong>1. Booking:</strong> Booking confirmation is subject to availability. We will attempt to honor your slot but may contact you if we need to reschedule.</p>
                                <p><strong>2. Payment:</strong> Prices shown are indicative. Final charges may vary for extra services or damages. Payment is collected on completion unless otherwise agreed.</p>
                                <p><strong>3. Liability:</strong> We handle vehicles with care. Minor scratches/paint issues existing prior to service should be reported. We are not responsible for pre-existing damages.</p>
                                <p><strong>4. Cancellation:</strong> Cancel 12 hours before the slot to avoid a small cancellation fee.</p>
                                <p><strong>5. Privacy:</strong> Your contact details are used only for booking and service-related communication.</p>
                                <p className="text-xs text-muted-foreground">This is a sample T&C. Replace with your legal terms before going live.</p>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => { /* dialog closes automatically via Dialog implementation */ }}>Close</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <Checkbox id="wp" checked={waterPower} onCheckedChange={(v: boolean) => setWaterPower(v)} />
                        <Label htmlFor="wp" className="text-sm font-normal">Water & Electricity Available</Label>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button size="lg" type="submit" className="rounded-2xl px-8" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </section>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary - right column */}
          <div>
            <div className="sticky top-24">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Selected Packages</div>
                      <div className="mt-2 space-y-2">
                        {Array.from(selectedPackages).length === 0 ? (
                          <div className="text-sm text-muted-foreground">No packages selected</div>
                        ) : (
                          Array.from(selectedPackages).map((key) => (
                            <div key={key} className="flex items-center justify-between">
                              <div className="text-sm">{PACKAGES.find((p) => p.key === key)?.label}</div>
                              <div className="font-medium">₹ {car ? PRICING[key][car] : "—"}</div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Car Type</div>
                      <div className="mt-2 font-medium">{car ? CARS.find((c) => c.key === car)?.label : "—"}</div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="text-sm text-muted-foreground">Slot</div>
                      <div className="mt-2 font-medium">{date ? `${date} • ${timeSlot || "—"}` : "—"}</div>
                    </div>

                    <div className="rounded-lg border p-3 bg-muted/10">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Total</div>
                        <div className="text-xl font-semibold">{price ? `₹ ${price}` : "—"}</div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">Taxes & extras may apply.</div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={clearForm} className="flex-1">Reset</Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="flex-1">Preview T&C</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Terms & Conditions</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-2 text-sm text-muted-foreground">
                            <p><strong>1. Booking:</strong> Booking confirmation is subject to availability. We will attempt to honor your slot but may contact you if we need to reschedule.</p>
                            <p><strong>2. Payment:</strong> Prices shown are indicative. Final charges may vary for extra services or damages. Payment is collected on completion unless otherwise agreed.</p>
                            <p><strong>3. Liability:</strong> We handle vehicles with care. Minor scratches/paint issues existing prior to service should be reported. We are not responsible for pre-existing damages.</p>
                            <p><strong>4. Cancellation:</strong> Cancel 12 hours before the slot to avoid a small cancellation fee.</p>
                            <p><strong>5. Privacy:</strong> Your contact details are used only for booking and service-related communication.</p>
                            <p className="text-xs text-muted-foreground">Please read all T&C carefully.</p>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button>Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 text-center text-xs text-muted-foreground">Need help? Contact our support at <a className="underline">support@washify.example</a></div>
            </div>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
