import { useAuthContext } from "../../context/authContext";
import { useProfile } from "./useProfile";

//components
import ProductCard from "../../components/molecules/ProductCard";

const ProfilePage = () => {
  const { loading, handleClearCart } = useProfile();
  const { currentUser } = useAuthContext();
  const userNameInitials = currentUser
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <div className="w-full max-w-[1200px] m-auto p-10 min-h-[60vh]">
      <div className="flex gap-10 items-center mt-10 justify-between">
        <div className="flex gap-8 items-center">
          <div className="bg-gray-300 w-24 h-24 flex items-center justify-center text-white text-[24px] font-bold rounded-full">
            {userNameInitials}
          </div>
          <div>
            <h2 className="text-[18px] font-medium">{currentUser?.name}</h2>
            <p className="text-[14px]">{currentUser?.email}</p>
          </div>
        </div>

        {currentUser?.cartItems && currentUser?.cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            disabled={loading}
            className="border border-red-400 p-4 text-red-400 cursor-pointer hover:bg-red-500 hover:text-white transition text-2xl rounded disabled:bg-gray-300 disabled:text-white"
          >
            Limpar carrinho
          </button>
        )}
      </div>
      <div className="w-full mt-20">
        <h2 className="text-4xl font-medium mb-10">Suas compras</h2>
        {currentUser?.cartItems && currentUser?.cartItems.length > 0 ? (
          currentUser?.cartItems.map((item) => (
            <ProductCard
              id={item.productId}
              quantity={item.quantity}
              cartId={item.id}
            />
          ))
        ) : (
          <div className="bg-gray-300 p-4 rounded h-[120px] flex items-center justify-center">
            <p className="text-white text-[14px]">Você não tem compras.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
