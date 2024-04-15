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

export const compareFlights = async (year, from, to) => {
  let arcs = [];
  let max = 0;
  let startData = await getFlights(year[0], from, to);
  let endData = await getFlights(year[1], from, to);
  startData.forEach((entry, index) => {
    let matchingEntry = endData.find(
      (entry) =>
        entry["flyFrom"] === startData[index]["flyFrom"] &&
        entry["flyTo"] === startData[index]["flyTo"]
    );
    let num_flights = matchingEntry
      ? matchingEntry["num_flights"] - entry["num_flights"]
      : 0;
    if (Math.abs(num_flights) > max) {
      max = Math.abs(num_flights);
    }
    let color = num_flights > 0 ? [144, 194, 144] : [252, 61, 3];
    arcs.push({
      source: entry["source"],
      dest: entry["dest"],
      num_flights: num_flights,
      flyFrom: entry["flyFrom"],
      flyTo: entry["flyTo"],
      color: color,
      change: (num_flights / entry["num_flights"]) * 100,
    });
  });
  return { arcs: arcs, max: max };
};
