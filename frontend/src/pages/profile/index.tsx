import { useAuthContext } from "../../context/authContext";

const ProfilePage = () => {
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
      <div className="flex gap-10 items-center mt-10">
        <div className="bg-gray-300 w-24 h-24 flex items-center justify-center text-white text-[24px] font-bold rounded-full">
          {userNameInitials}
        </div>
        <div>
          <h2 className="text-[18px] font-medium">{currentUser?.name}</h2>
          <p className="text-[14px]">{currentUser?.email}</p>
        </div>
      </div>

      <div className="w-full mt-20">
        <h2 className="text-4xl font-medium mb-10">Suas compras</h2>
        {currentUser?.cartItems && currentUser?.cartItems.length > 0 ? (
          currentUser?.cartItems.map(() => <></>)
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
