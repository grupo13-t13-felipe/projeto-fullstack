-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(127) NOT NULL,
    "email" VARCHAR(127) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "password" VARCHAR(127) NOT NULL,
    "description" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "is_seller" BOOLEAN NOT NULL DEFAULT false,
    "birth_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "state" VARCHAR(64) NOT NULL,
    "city" VARCHAR(64) NOT NULL,
    "street" VARCHAR(64) NOT NULL,
    "number" VARCHAR(8) NOT NULL,
    "complement" VARCHAR(128) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_address_id_key" ON "users"("address_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
