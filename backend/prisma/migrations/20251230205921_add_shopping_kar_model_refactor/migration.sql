-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShoppingCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ShoppingCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShoppingCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShoppingCart" ("createdAt", "id", "productId", "quantity", "userId") SELECT coalesce("createdAt", CURRENT_TIMESTAMP) AS "createdAt", "id", "productId", "quantity", "userId" FROM "ShoppingCart";
DROP TABLE "ShoppingCart";
ALTER TABLE "new_ShoppingCart" RENAME TO "ShoppingCart";
CREATE UNIQUE INDEX "ShoppingCart_userId_productId_key" ON "ShoppingCart"("userId", "productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
