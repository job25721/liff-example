import liff from "@line/liff";
import React, { useContext } from "react";
import { AppContext } from "../App";

interface ButtonProps {
  children?: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
  btnType?: "default" | "link" | "ghost";
}
const Button = ({
  children,
  danger = false,
  primary = false,
  btnType = "default",
  ...props
}: ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  const selectButtonType = (): string => {
    if (primary) {
      return "focus:bg-blue-400 focus:text-white";
    }
    if (danger) {
      return "focus:bg-red-400 focus:text-white";
    }

    return "";
  };

  const { className, ...rest } = props;

  return (
    <button
      className={`px-4 py-2 ${
        btnType === "default"
          ? "border hover:bg-gray-100 "
          : btnType === "link"
          ? "underline"
          : btnType === "ghost"
          ? "focus:text-gray-300"
          : ""
      } rounded-sm ${selectButtonType()} transition-all last:m-0 mr-2 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

// const Card = ({ children }: { children?: React.ReactNode }) => {
//   return (
//     <div className="rounded-md bg-blue-400 h-44 cursor-pointer mb-4">
//       {children}
//     </div>
//   );
// };

function Index() {
  const { user } = useContext(AppContext);
  const login = () => {
    liff.login();
  };

  return (
    <div>
      <div className="p-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-widest">GLASSER</h2>
        </div>
        <div className="flex items-center">
          {!user ? (
            <Button onClick={login}>Login</Button>
          ) : (
            <div className="flex items-center mr-4">
              <img
                src={user.pictureUrl}
                alt=""
                className="rounded-full w-10 h-10 mr-4"
              />
              <span>{user.displayName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="px-4">
        {/* <Card />
        <Card />
        <Card />
        <Card /> */}
      </div>
    </div>
  );
}

export default Index;
