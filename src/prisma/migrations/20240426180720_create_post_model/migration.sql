-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Passwords" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "second_verification" BOOLEAN NOT NULL,
    "verificarion_software" TEXT NOT NULL,
    "image_verification_software" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Passwords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Passwords" ADD CONSTRAINT "Passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
