import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const STORAGE_KEY = "people";

  // Load people from AsyncStorage
  useEffect(() => {
    const loadPeople = async () => {
      const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPeople) setPeople(JSON.parse(savedPeople));
    };
    loadPeople();
  }, []);

  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
    };
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const addGift = async (id, gift) => {
    const updatedPeople = people.map((person) => {
      if (person.id === id) {
        return { ...person, gifts: [...(person.gifts || []), gift] };
      }
      return person;
    });
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const removePerson = async (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };

  const removeGift = (personId, giftName) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) => {
        if (person.id === personId) {
          return {
            ...person,
            gifts: person.gifts.filter((gift) => gift.name !== giftName),
          };
        }
        return person;
      })
    );
  };

  return (
    <PeopleContext.Provider value={{ people, addPerson, removePerson, addGift, removeGift  }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;