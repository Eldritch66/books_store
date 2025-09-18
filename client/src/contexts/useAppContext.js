import { useContext } from "react";
import { BookContext } from "./bookContext";

export function useAppContext() {
  const context = useContext(BookContext);
  if (context === undefined)
    throw new Error("your using context outside provider!");
  return context;
}
