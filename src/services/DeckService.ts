import axios from "axios";
const url = "https://www.deckofcardsapi.com/api";
const DeckService = {
  createDeck,
  getCards,
};

export default DeckService;

function createDeck() {
  return axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle`);
}

function getCards(deckId: string, count: number) {
  return axios.get(`${url}/deck/${deckId}/draw/?count=${count}`);
}
