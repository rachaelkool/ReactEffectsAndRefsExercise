import React, { useEffect, useState} from "react";
import Card from "./Card";
import axios from "axios";


const base_url = "http://deckofcardsapi.com/api/deck";

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);

    useEffect(() => {
        async function getData() {
            let new_deck = await axios.get(`${base_url}/new/shuffle/`);
            setDeck(new_deck.data);
        }
        getData();
    }, [setDeck]);

    async function getCard() {
        let deck_id = deck.deck_id;

        try {
            let next_card = await axios.get(`${base_url}/${deck_id}/draw/`);

            if (next_card.data.remaining === 0) {
                throw new Error("no cards remaining!");
            }

            const card = next_card.data.cards[0];

            setDrawn(c => [...c,
                {id: card.code,
                name: card.suit + " of " + card.value,
                image: card.image}]);
        } catch (err) {
            alert(err);
        }
    }

    const cards = drawn.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ));

    return (
        <div>
            <button onClick={getCard}>Draw Card</button>
            <div>{cards}</div>
        </div>
    );
}

export default Deck;