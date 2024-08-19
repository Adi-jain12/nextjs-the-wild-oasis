-- CreateTable
CREATE TABLE "Guests" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT,
    "email" TEXT NOT NULL,
    "nationality" TEXT,
    "countryFlag" TEXT,
    "national_id" TEXT,

    CONSTRAINT "Guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "cabinId" INTEGER NOT NULL,
    "guestId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "numNights" INTEGER NOT NULL,
    "numGuests" INTEGER NOT NULL,
    "cabinPrice" DOUBLE PRECISION NOT NULL,
    "extrasPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "hasBreakfast" BOOLEAN NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "observations" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cabins" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "regularPrice" INTEGER NOT NULL,
    "Discount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Cabins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minBookingLength" INTEGER NOT NULL,
    "maxBookingLength" INTEGER NOT NULL,
    "maxGuestsPerBooking" INTEGER NOT NULL,
    "breakfastPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guests_email_key" ON "Guests"("email");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_cabinId_fkey" FOREIGN KEY ("cabinId") REFERENCES "Cabins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
