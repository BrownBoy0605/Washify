"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import FooterSection from "../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Phone, MapPin, Calendar, Clock, Wrench, Car, Droplet, Trash2 } from "lucide-react";

interface Booking {
  id: string;
  name: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  timeSlot: string;
  packages: string[];
  car: string;
  price: number;
  waterPower: boolean;
  createdAt: string;
}

const PACKAGE_NAMES: Record<string, string> = {
  quick: "Quick Shine",
  deep: "Deep Cleaning",
  rubbing: "Rubbing & Polishing",
  windshield: "Windshield Polishing",
};

const CAR_NAMES: Record<string, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  compact: "Compact SUV",
  suv5: "SUV 5 Seater",
  suv7: "SUV 7 Seater",
};

const PRICING: Record<string, Record<string, number>> = {
  quick: { hatchback: 399, sedan: 399, compact: 399, suv5: 449, suv7: 449 },
  deep: { hatchback: 799, sedan: 999, compact: 999, suv5: 1199, suv7: 1399 },
  rubbing: { hatchback: 1399, sedan: 1599, compact: 1599, suv5: 1799, suv7: 1799 },
  windshield: { hatchback: 799, sedan: 899, compact: 899, suv5: 999, suv7: 999 },
};

export default function AllBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [displayedBookings, setDisplayedBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchAllBookings();
  }, []);

  async function fetchAllBookings() {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");
      const data = await response.json();
      // Sort by latest first
      const sorted = data.sort(
        (a: Booking, b: Booking) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBookings(sorted);
      setDisplayedBookings(sorted.slice(0, itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  function calculatePrice(packages: string[], car: string): number {
    let total = 0;
    packages.forEach((pkg) => {
      total += PRICING[pkg]?.[car] ?? 0;
    });
    return total;
  }

  async function deleteBooking(bookingId: string) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
      setDeleting(bookingId);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from state
        const updatedBookings = bookings.filter((b) => b.id !== bookingId);
        setBookings(updatedBookings);
        setDisplayedBookings(updatedBookings.slice(0, itemsPerPage));
        setCurrentPage(1);
        setExpandedId(null);
      } else {
        alert("Failed to delete booking");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting booking");
    } finally {
      setDeleting(null);
    }
  }

  function loadMore() {
    const nextPage = currentPage + 1;
    const startIndex = nextPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newBookings = bookings.slice(0, endIndex);
    setDisplayedBookings(newBookings);
    setCurrentPage(nextPage);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getTimeSlotLabel(slotId: string) {
    const slots: Record<string, string> = {
      slot1: "9am - 11am",
      slot2: "11am - 1pm",
      slot3: "1pm - 3pm",
      slot4: "3pm - 5pm",
    };
    return slots[slotId] || slotId;
  }

  const hasMore = displayedBookings.length < bookings.length;

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 md:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">All Bookings</h1>
          <p className="text-muted-foreground">
            Total bookings: <span className="font-semibold text-foreground">{bookings.length}</span>
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No bookings found</p>
            </CardContent>
          </Card>
        )}

        {/* Bookings List */}
        {!loading && displayedBookings.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayedBookings.map((booking, index) => {
                const calculatedPrice = calculatePrice(booking.packages, booking.car);
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-lg">{booking.name}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                ₹{calculatedPrice}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {booking.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.city}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteBooking(booking.id)}
                              disabled={deleting === booking.id}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              {deleting === booking.id ? (
                                <span className="animate-spin">⟳</span>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                            <motion.button
                              onClick={() =>
                                setExpandedId(expandedId === booking.id ? null : booking.id)
                              }
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <motion.div
                                animate={{ rotate: expandedId === booking.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5" />
                              </motion.div>
                            </motion.button>
                          </div>
                        </div>
                      </CardHeader>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {expandedId === booking.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-border">
                              <CardContent className="pt-4 space-y-4">
                                {/* Booking Details */}
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                      DATE & TIME
                                    </p>
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {formatDate(booking.date)}
                                      </div>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Clock className="w-4 h-4 text-primary" />
                                        {getTimeSlotLabel(booking.timeSlot)}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                      LOCATION
                                    </p>
                                    <p className="text-sm">{booking.address}</p>
                                  </div>
                                </div>

                                {/* Services */}
                                <div>
                                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                                    SERVICES
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {booking.packages.map((pkg) => (
                                      <Badge key={pkg} variant="outline" className="text-xs">
                                        <Wrench className="w-3 h-3 mr-1" />
                                        {PACKAGE_NAMES[pkg] || pkg}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Car & Options */}
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                                      VEHICLE
                                    </p>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Car className="w-4 h-4 text-primary" />
                                      {CAR_NAMES[booking.car] || booking.car}
                                    </div>
                                  </div>

                                  {booking.waterPower && (
                                    <div>
                                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                                        ADD-ONS
                                      </p>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Badge variant="secondary" className="text-xs">
                                          <Droplet className="w-3 h-3 mr-1" />
                                          Water Power
                                        </Badge>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="pt-2 border-t border-border space-y-2">
                                  <div className="text-sm">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                                      PRICE BREAKDOWN
                                    </p>
                                    {booking.packages.map((pkg) => (
                                      <div key={pkg} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                          {PACKAGE_NAMES[pkg]}:
                                        </span>
                                        <span className="font-medium">
                                          ₹{PRICING[pkg]?.[booking.car] ?? 0}
                                        </span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border mt-2">
                                      <span>Total:</span>
                                      <span>₹{calculatedPrice}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Timestamps */}
                                <div className="pt-2 border-t border-border">
                                  <p className="text-xs text-muted-foreground">
                                    Booked on {formatDate(booking.createdAt)}
                                  </p>
                                </div>
                              </CardContent>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={loadMore}
              size="lg"
              className="px-8"
              variant="outline"
            >
              Load More Bookings ({bookings.length - displayedBookings.length} remaining)
            </Button>
          </motion.div>
        )}

        {/* End Message */}
        {!hasMore && bookings.length > 0 && (
          <motion.div
            className="mt-8 text-center text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>You've reached the end of all bookings</p>
          </motion.div>
        )}
      </div>

      <FooterSection />
    </main>
  );
}
