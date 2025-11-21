# Database Setup Instructions

## What I've Done:

1. ✅ **Installed Prisma** - Added `@prisma/client` and `prisma`
2. ✅ **Created Prisma Schema** - Defined `Booking` model with all booking fields
3. ✅ **Created API Route** - Set up `/api/bookings` endpoint to store form data
4. ✅ **Updated Booking Form** - Changed from logging to sending data to the database

## Next Steps:

1. **Login to Prisma** - Complete the browser login that should have appeared
2. **Verify DATABASE_URL** - Ensure your `.env` file has the correct connection string from Vercel Prisma Postgres
3. **Run Migration** - Execute this command:
   ```bash
   npx prisma migrate dev --name init
   ```

## Environment Variables Needed:
In your `.env` file, you should have:
- `DATABASE_URL` - Your Prisma Postgres connection string

## How It Works:

- **Booking Form** → Validates data → Sends to API → Stores in database
- **Bookings Table** automatically tracks:
  - Customer name, phone, city, address
  - Service details (date, time, packages, car type)
  - Price and water power preference
  - Created/Updated timestamps

## API Endpoints:

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Fetch all bookings (for admin dashboard later)
