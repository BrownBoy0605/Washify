"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "../components/navbar";
import FooterSection from "../components/footer";

// Place this file at: app/booking/page.tsx (App Router)
// Image assets:
// /public/cars/{compact-suv.jpg,hatchback.jpg,sedan.jpg,suv-5-seater.jpg,suv-7-seater.jpg}
// /public/services/image.png/{quick-shine.png,deep.png,rubbing.png,windshield.png}

const cities = ["Jaipur", "Gurgaon", "Delhi", "Noida", "Pune", "Bengaluru"]; // adjust as needed

const PACKAGES = [
  { key: "quick", label: "Quick Shine", img: "/services/quick-shine.png" },
  { key: "deep", label: "Deep Cleaning", img: "/services/deep.png" },
  { key: "rubbing", label: "Rubbing & Polishing", img: "/services/rubbing.png" },
  { key: "windshield", label: "WindShield Polishing", img: "/services/windshield.png" },
] as const;

const CARS = [
  { key: "hatchback", label: "Hatchback", img: "/cars/hatchback.jpg" },
  { key: "sedan", label: "Sedan", img: "/cars/sedan.jpg" },
  { key: "compact", label: "Compact SUV", img: "/cars/compact-suv.jpg" },
  { key: "suv5", label: "SUV 5 Seater", img: "/cars/suv-5-seater.jpg" },
  { key: "suv7", label: "SUV 7 Seater", img: "/cars/suv-7-seater.jpg" },
] as const;

// Simple example pricing (₹)
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
  const [date, setDate] = useState(""); // yyyy-mm-dd
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [pkg, setPkg] = useState<typeof PACKAGES[number]["key"] | null>(null);
  const [car, setCar] = useState<typeof CARS[number]["key"] | null>(null);
  const [agree, setAgree] = useState(false);
  const [waterPower, setWaterPower] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const price = useMemo(() => {
    if (!pkg || !car) return 0;
    return PRICING[pkg][car] ?? 0;
  }, [pkg, car]);

  function validate() {
    const e: string[] = [];
    if (name.trim().length < 2) e.push("Please enter your full name.");
    if (!/^\d{10}$/.test(phone)) e.push("Phone number must be exactly 10 digits.");
    if (!date) e.push("Please select a booking date.");
    if (!timeSlot) e.push("Please choose a time slot.");
    if (!pkg) e.push("Please select a package.");
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
    setPkg(null);
    setCar(null);
    setAgree(false);
    setWaterPower(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name,
      phone,
      city,
      address,
      date,
      timeSlot,
      package: pkg,
      car,
      price,
      waterPower,
    };

    // Log for now (can send to API route instead)
    console.log("Booking submission:", payload);
    alert("Thanks! Your booking details have been logged to the console.");
    clearForm();
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
        <Navbar></Navbar>
      <div className="mx-auto max-w-5xl px-3 md:px-6 pt-14">
        <div className="mb-6 flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full px-3 py-1 text-sm">New</Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Booking Form</h1>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-muted-foreground">
              Tell us a few details and we’ll schedule your service.
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <div className="mb-6 rounded-xl border bg-destructive/10 p-4 text-destructive">
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {errors.map((er, i) => (
                    <li key={i}>{er}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Contact */}
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

              {/* Location & Address */}
              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="House no., street, landmark..." value={address} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)} />
                </div>
              </section>

              {/* Date & Time */}
              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Booking Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Available Time Slot</Label>
                  <RadioGroup className="grid grid-cols-2 gap-2 md:grid-cols-4" value={timeSlot ?? ""} onValueChange={(v: string) => setTimeSlot(v)}>
                    {TIME_SLOTS.map((s) => (
                      <div key={s.id} className="flex items-center gap-2 rounded-xl border p-2">
                        <RadioGroupItem id={s.id} value={s.label} />
                        <Label htmlFor={s.id} className="cursor-pointer text-sm">
                          {s.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </section>

              {/* Packages */}
              <section>
                <div className="mb-3 text-base font-semibold">Choose Package</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {PACKAGES.map((p) => {
                    const selected = pkg === p.key;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setPkg(p.key)}
                        className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all hover:shadow-md ${
                          selected ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image src={p.img} alt={p.label} fill className="object-contain p-2" />
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-medium">{p.label}</span>
                          {selected && <Badge>Selected</Badge>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Car Types */}
              <section>
                <div className="mb-3 text-base font-semibold">Select Car Type</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                  {CARS.map((c) => {
                    const selected = car === c.key;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setCar(c.key)}
                        className={`group relative overflow-hidden rounded-2xl border p-3 text-left transition-all hover:shadow-md ${
                          selected ? "ring-2 ring-primary" : ""
                        }`}
                      >
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

              {/* Price & Agreements */}
              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" value={price ? `₹ ${price}` : "--"} readOnly className="font-semibold" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox id="agree" checked={agree} onCheckedChange={(v: boolean) => setAgree(v)} />
                    <Label htmlFor="agree" className="text-sm font-normal">
                      I agree to the <a className="underline" href="#">Terms and Conditions</a> as set out by the user agreement.
                    </Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="wp" checked={waterPower} onCheckedChange={(v: boolean) => setWaterPower(v)} />
                    <Label htmlFor="wp" className="text-sm font-normal">Water & Electricity Available</Label>
                  </div>
                </div>
              </section>

              <div className="flex justify-end">
                <Button size="lg" type="submit" className="rounded-2xl px-8">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
        <FooterSection></FooterSection>
    </main>
  );
}
