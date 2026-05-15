import { db, auth } from "@/features/authentication/firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import type { CoinSearchResponse } from "../types/coinResponseType";
import type { PortfolioItem } from "../types/coinPortfolio";


export const addCoinToPortfolio = async (coin: CoinSearchResponse, amount: number) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const portfolioRef = collection(db, "users", user.uid, "portfolio");

  const data = {
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.large || coin.thumb,
    amount: amount,
  };

  await addDoc(portfolioRef, data);
};

export const getPortfolio = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const portfolioRef = collection(db, "users", user.uid, "portfolio");
  const querySnapshot = await getDocs(portfolioRef);

  return querySnapshot.docs.map(doc => ({
    ...doc.data()
  })) as PortfolioItem[];
};