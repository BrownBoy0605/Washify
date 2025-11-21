import nodemailer, { Transporter } from "nodemailer";

// Configure your Gmail credentials
const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use Gmail App Password, not regular password
  },
});

export interface BookingNotification {
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
  bookingId: string;
}

export async function sendBookingNotification(
  booking: BookingNotification
): Promise<boolean> {
  try {
    const packagesList = booking.packages.join(", ");
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.OWNER_EMAIL, // Set this to owner's email
      subject: `🚗 New Booking Received - ID: ${booking.bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E81E25 0%, #c4171d 100%); padding: 20px; border-radius: 8px; color: white;">
            <h1 style="margin: 0;">New Booking Received! 🎉</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; margin-top: 20px;">
            <h2 style="color: #E81E25; border-bottom: 2px solid #E81E25; padding-bottom: 10px;">Booking Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; font-weight: bold; width: 150px;">Booking ID:</td>
                <td style="padding: 10px; background: #fff; border-radius: 4px; font-family: monospace; color: #E81E25;">${booking.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Customer Name:</td>
                <td style="padding: 10px;">${booking.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Phone:</td>
                <td style="padding: 10px;"><a href="tel:${booking.phone}">${booking.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">City:</td>
                <td style="padding: 10px;">${booking.city}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Address:</td>
                <td style="padding: 10px;">${booking.address}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Booking Date:</td>
                <td style="padding: 10px;">${booking.date}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Time Slot:</td>
                <td style="padding: 10px;">${booking.timeSlot}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Car Type:</td>
                <td style="padding: 10px;">${booking.car}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Services:</td>
                <td style="padding: 10px;">${packagesList}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Price:</td>
                <td style="padding: 10px; font-size: 18px; color: #E81E25; font-weight: bold;">₹ ${booking.price}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Water & Electricity Available:</td>
                <td style="padding: 10px;">${booking.waterPower ? "✅ Yes" : "❌ No"}</td>
              </tr>
            </table>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>This is an automated notification from Washify Booking System</p>
            <p>Please respond to the customer as soon as possible to confirm the booking.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Booking notification email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false;
  }
}

export async function sendCustomerConfirmation(
  email: string,
  booking: BookingNotification
): Promise<boolean> {
  try {
    const packagesList = booking.packages.join(", ");
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `✅ Booking Confirmed - Your Service ID: ${booking.bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #E81E25 0%, #c4171d 100%); padding: 20px; border-radius: 8px; color: white; text-align: center;">
            <h1 style="margin: 0;">✅ Booking Confirmed!</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; margin-top: 20px;">
            <p style="font-size: 16px;">Dear <strong>${booking.name}</strong>,</p>
            <p>Thank you for booking with Washify! Your booking has been confirmed.</p>
            
            <h3 style="color: #E81E25; border-bottom: 2px solid #E81E25; padding-bottom: 10px;">Booking Summary</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Service ID:</td>
                <td style="padding: 8px; font-family: monospace; color: #E81E25; font-weight: bold;">${booking.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Date:</td>
                <td style="padding: 8px;">${booking.date}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Time:</td>
                <td style="padding: 8px;">${booking.timeSlot}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Services:</td>
                <td style="padding: 8px;">${packagesList}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Amount:</td>
                <td style="padding: 8px; font-size: 16px; color: #E81E25; font-weight: bold;">₹ ${booking.price}</td>
              </tr>
            </table>
          </div>
          
          <div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0;"><strong>⏰ What's Next?</strong></p>
            <p style="margin-top: 10px;">Our team will contact you shortly to confirm the exact location and answer any questions. Please keep your phone available.</p>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>If you need to cancel or reschedule, please contact us at least 12 hours before your scheduled time.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Customer confirmation email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Error sending customer confirmation:", error);
    return false;
  }
}
