import { useContext } from "react";
import { BookContext } from "./bookContext";

export function useAppContext() {
  return useContext(BookContext);
}
