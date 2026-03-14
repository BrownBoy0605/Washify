import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotification, sendCustomerConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      city,
      address,
      date,
      timeSlot,
      packages,
      car,
      price,
      waterPower,
    } = body;

    // Validate required fields
    if (!name || !phone || !city || !address || !date || !timeSlot || !packages || !car) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking in database
    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        city,
        address,
        date,
        timeSlot,
        packages,
        car,
        price: parseInt(price) || 0,
        waterPower: waterPower || false,
      },
    });

    // Send notification emails
    await sendBookingNotification({
      name,
      phone,
      city,
      address,
      date,
      timeSlot,
      packages,
      car,
      price: parseInt(price) || 0,
      waterPower: waterPower || false,
      bookingId: booking.id,
    });

    // Optionally send customer confirmation (requires customer email - for now just logs)
    console.log(`✅ Booking #${booking.id} created and owner notified`);

    return NextResponse.json(
      { success: true, bookingId: booking.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
