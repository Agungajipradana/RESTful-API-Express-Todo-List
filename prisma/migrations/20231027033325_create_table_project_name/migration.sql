-- CreateTable
CREATE TABLE "project_names" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_names_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_names" ADD CONSTRAINT "project_names_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
