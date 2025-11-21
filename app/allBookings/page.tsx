"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";
import FooterSection from "../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Wrench, 
  Car, 
  Droplet, 
  Trash2,
  Search,
  ArrowUpDown,
  CheckCircle2,
  Circle
} from "lucide-react";

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
  status: "upcoming" | "completed";
  createdAt: string;
}

type FilterType = "all" | "upcoming" | "completed";
type SortType = "date-newest" | "date-oldest" | "name" | "price-high" | "price-low";

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
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [displayedBookings, setDisplayedBookings] = useState<Booking[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Filter and Search
  const [filterType, setFilterType] = useState<FilterType>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState<SortType>("date-newest");

  useEffect(() => {
    fetchAllBookings();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allBookings, filterType, searchQuery, sortType]);

  async function fetchAllBookings() {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setAllBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  function applyFiltersAndSort() {
    let filtered = [...allBookings];

    // Apply filter
    if (filterType !== "all") {
      filtered = filtered.filter((b) => b.status === filterType);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.phone.includes(query) ||
          b.city.toLowerCase().includes(query) ||
          b.address.toLowerCase().includes(query)
      );
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortType) {
        case "date-newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setCurrentPage(1);
    setDisplayedBookings(filtered.slice(0, itemsPerPage));
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
        const updatedBookings = allBookings.filter((b) => b.id !== bookingId);
        setAllBookings(updatedBookings);
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

  async function updateBookingStatus(bookingId: string, newStatus: "upcoming" | "completed") {
    try {
      setUpdatingStatus(bookingId);
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedBookings = allBookings.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus } : b
        );
        setAllBookings(updatedBookings);
      } else {
        alert("Failed to update booking status");
      }
    } catch (error) {
      console.error("Update status error:", error);
      alert("Error updating booking status");
    } finally {
      setUpdatingStatus(null);
    }
  }

  function loadMore() {
    const allFiltered = getFilteredAndSortedBookings();
    const nextPage = currentPage + 1;
    const startIndex = nextPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedBookings(allFiltered.slice(0, endIndex));
    setCurrentPage(nextPage);
  }

  function getFilteredAndSortedBookings() {
    let filtered = [...allBookings];

    if (filterType !== "all") {
      filtered = filtered.filter((b) => b.status === filterType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.phone.includes(query) ||
          b.city.toLowerCase().includes(query) ||
          b.address.toLowerCase().includes(query)
      );
    }

    filtered.sort((a, b) => {
      switch (sortType) {
        case "date-newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return filtered;
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

  const allFiltered = getFilteredAndSortedBookings();
  const hasMore = displayedBookings.length < allFiltered.length;

  const upcomingCount = allBookings.filter((b) => b.status === "upcoming").length;
  const completedCount = allBookings.filter((b) => b.status === "completed").length;

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 md:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">All Bookings</h1>
          <p className="text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{allBookings.length}</span> • 
            <span className="ml-2">Upcoming: <span className="font-semibold text-foreground">{upcomingCount}</span></span> •
            <span className="ml-2">Completed: <span className="font-semibold text-foreground">{completedCount}</span></span>
          </p>
        </div>

        {/* Controls Section */}
        {!loading && allBookings.length > 0 && (
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, phone, city, or address..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                {(["all", "upcoming", "completed"] as const).map((filter) => (
                  <Button
                    key={filter}
                    variant={filterType === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterType(filter)}
                    className="capitalize"
                  >
                    {filter === "all" ? "All" : filter === "upcoming" ? "Upcoming" : "Completed"}
                  </Button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground self-center" />
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value as SortType)}
                  className="px-3 py-1 rounded-md border border-input bg-background text-sm"
                >
                  <option value="date-newest">Date (Newest)</option>
                  <option value="date-oldest">Date (Oldest)</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="price-low">Price (Low to High)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {displayedBookings.length} of {allFiltered.length} booking{allFiltered.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && allBookings.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No bookings found</p>
            </CardContent>
          </Card>
        )}

        {/* No Results for Filters */}
        {!loading && allBookings.length > 0 && displayedBookings.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No bookings match your search or filters</p>
            </CardContent>
          </Card>
        )}

        {/* Bookings List */}
        {!loading && displayedBookings.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {displayedBookings.map((booking, index) => {
                const calculatedPrice = calculatePrice(booking.packages, booking.car);
                const isCompleted = booking.status === "completed";
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={`border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden cursor-pointer ${
                        isCompleted ? "opacity-75 bg-muted/30" : ""
                      }`}
                      onClick={() => {
                        if ((event?.target as HTMLElement)?.closest('[data-action-btn]')) {
                          return;
                        }
                        setExpandedId(expandedId === booking.id ? null : booking.id);
                      }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <CardTitle className={`text-lg ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                                {booking.name}
                              </CardTitle>
                              <Badge 
                                variant={isCompleted ? "outline" : "secondary"} 
                                className="text-xs"
                              >
                                ₹{calculatedPrice}
                              </Badge>
                              <Badge 
                                variant={isCompleted ? "secondary" : "outline"} 
                                className="text-xs"
                              >
                                {isCompleted ? "Completed" : "Upcoming"}
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
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(booking.date)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateBookingStatus(
                                  booking.id,
                                  isCompleted ? "upcoming" : "completed"
                                );
                              }}
                              disabled={updatingStatus === booking.id}
                              data-action-btn
                              title={isCompleted ? "Mark as Upcoming" : "Mark as Completed"}
                            >
                              {updatingStatus === booking.id ? (
                                <span className="animate-spin">⟳</span>
                              ) : isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground" />
                              )}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteBooking(booking.id);
                              }}
                              disabled={deleting === booking.id}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              data-action-btn
                            >
                              {deleting === booking.id ? (
                                <span className="animate-spin">⟳</span>
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>

                            <motion.div
                              animate={{ rotate: expandedId === booking.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-muted-foreground flex-shrink-0"
                              data-action-btn
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
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
              Load More Bookings ({allFiltered.length - displayedBookings.length} remaining)
            </Button>
          </motion.div>
        )}

        {/* End Message */}
        {!hasMore && displayedBookings.length > 0 && (
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
