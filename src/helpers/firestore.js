import { firestore } from "./firebase-helpers";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import jsonData from "../data/combined_data.json";

export const jsonToFirestore = async () => {
  const data = jsonData;

  console.log(data);
  data.forEach(async (entry) => {
    try {
      console.log(entry);
      await addDoc(collection(firestore, `${entry["year"]}`), entry);
    } catch (e) {
      console.error(e);
    }
  });
};

export const getFlights = async (year, from = "", to = "") => {
  let data = [];
  const q = collection(firestore, `${year}`);
  let queryRef = q;
  if (from === "" && to !== "") {
    queryRef = query(queryRef, where("flyTo", "==", to));
  } else if (from !== "" && to === "") {
    queryRef = query(queryRef, where("flyFrom", "==", from));
  }
  const querySnapshot = await getDocs(queryRef);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  if (from !== "" && to !== "") {
    data = data.filter((entry) => entry["flyTo"] === to);
  }
  return data;
};
