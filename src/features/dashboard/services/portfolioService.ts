import { db, auth } from "@/features/authentication/firebase/firebase";
import { collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import type { CoinSearchResponse } from "../types/coinResponseType";
import type { PortfolioItem } from "../types/coinPortfolio";


export const addCoinToPortfolio = async (coin: CoinSearchResponse, amount: number) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "users", user.uid, "portfolio", coin.id);

  const data = {
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.large || coin.thumb,
    amount: amount,
  };

  await setDoc(docRef, data);
};

export const getPortfolio = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const portfolioRef = collection(db, "users", user.uid, "portfolio");
  const res = await getDocs(portfolioRef);

  if (res.empty) return [];
  return res.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as PortfolioItem[];
};

export const removePortfolio = async (coinId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const portfolioRef = doc(db, "users", user.uid, "portfolio", coinId);
  await deleteDoc(portfolioRef);
}

export const updatePortfolioCoin = async (coinId: string, amount: number) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  const docRef = doc(db, "users", user.uid, "portfolio", coinId);
  await setDoc(docRef, { amount }, { merge: true });
};