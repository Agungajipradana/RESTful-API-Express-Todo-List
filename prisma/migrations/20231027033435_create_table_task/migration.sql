-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "todoList" VARCHAR(225),
    "todoListOnProgress" VARCHAR(225),
    "todoListDone" VARCHAR(225),

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_fkey" FOREIGN KEY ("id") REFERENCES "project_names"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
