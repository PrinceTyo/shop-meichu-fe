import "@/styles/globals.css";
import { CartProvider } from "@/context/cart-provider";
import { FooterProvider } from "@/context/footer-provider";
import { SearchProvider } from "@/context/search-provider";

export default function UserSpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <CartProvider>
        <FooterProvider>{children}</FooterProvider>
      </CartProvider>
    </SearchProvider>
  );
}
