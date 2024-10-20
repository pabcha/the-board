"use client";

import { useUser } from "@clerk/nextjs";
import { supabase } from "../../_lib/supabase";
import { Button } from "@/components";
import { useEffect, useState } from "react";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface Card {
  created_at: 'string',
  estimation: 'string',
  room_id: 'string',
  user: 'string'
}

interface Room {
  id: string;
  created_at: string;
  name: string;
}

interface Props {
  room: Room,
  cards: Card[]
}

export default function RoomComponent({ room: roomProp, cards: cardsProp }: Props) {
  const [cardsMap, setCardsMap] = useState<Map<string, Card>>(new Map());
  const { user } = useUser();

  useEffect(() => {
    const channel = supabase
      .channel('realtime cards table')
      .on(
        'postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'cards'
        }, 
        (payload: RealtimePostgresChangesPayload<Card>) => {
          console.log(payload);
          if (payload.new) {
            setCardsMap((prevCardMap) => {
              const CardMap = new Map(prevCardMap);
              const card = payload.new as Card
              CardMap.set(card.user, card);
              return CardMap;
            })
          }
        })
      .subscribe();    

    return () => {
      supabase.removeChannel(channel)
    }
  }, []);

  useEffect(() => {
    const newMap = new Map<string, Card>();
    cardsProp.forEach((card) => {
      newMap.set(card.user, card)
    });
    setCardsMap(newMap);
  }, [cardsProp])

  async function handleClick(value: string) {
    const { data } = await supabase
      .from('cards')
      .select()
      .eq('user', user?.username)
      .eq('room_id', roomProp.id);

    if (!data?.length) {
      await supabase
        .from('cards')
        .insert({ 
          user: user?.username, 
          room_id: roomProp.id,
          estimation: value
        });
    } else {
      await supabase
        .from('cards')
        .update({ estimation: value })
        .eq('user', user?.username)
        .eq('room_id', roomProp.id);
    }
  }

  return (
    <section>
      <h1>Room: {roomProp.name}</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from(cardsMap.entries()).map(([user, card]) => (
          <div key={user} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-xl font-semibold mb-2">{user}</h2>
            <p className="text-4xl font-bold text-gray-700">{card.estimation}</p>
          </div>
        ))}
      </div>
      <div>
        <Button onClick={() => handleClick('1')}>1</Button>
        <Button onClick={() => handleClick('2')}>2</Button>
        <Button onClick={() => handleClick('3')}>3</Button>
        <Button onClick={() => handleClick('5')}>5</Button>
        <Button onClick={() => handleClick('8')}>8</Button>
        <Button onClick={() => handleClick('13')}>13</Button>
        <Button onClick={() => handleClick('?')}>?</Button>
        <Button onClick={() => handleClick('cafe')}>cafe</Button>
      </div>
    </section>
  );
}