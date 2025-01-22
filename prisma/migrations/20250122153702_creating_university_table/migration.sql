-- CreateTable
CREATE TABLE "Universitas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "akreditasi" TEXT NOT NULL,

    CONSTRAINT "Universitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jurusan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Jurusan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversitasJurusan" (
    "id" SERIAL NOT NULL,
    "universitasId" INTEGER NOT NULL,
    "jurusanId" INTEGER NOT NULL,

    CONSTRAINT "UniversitasJurusan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Universitas_nama_key" ON "Universitas"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Jurusan_nama_key" ON "Jurusan"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "UniversitasJurusan_universitasId_jurusanId_key" ON "UniversitasJurusan"("universitasId", "jurusanId");

-- AddForeignKey
ALTER TABLE "UniversitasJurusan" ADD CONSTRAINT "UniversitasJurusan_universitasId_fkey" FOREIGN KEY ("universitasId") REFERENCES "Universitas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversitasJurusan" ADD CONSTRAINT "UniversitasJurusan_jurusanId_fkey" FOREIGN KEY ("jurusanId") REFERENCES "Jurusan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
