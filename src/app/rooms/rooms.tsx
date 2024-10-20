"use client";

import { useEffect, useState } from "react";
import { supabase } from "../_lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { Button } from "@/components";

interface Room {
  id: string;
  created_at: string;
  name: string;
}

interface Props {
  rooms: Room[]
}

export default function RoomsComponent({ rooms: roomsProp }: Props) {
  const [rooms, setRooms] = useState<Room[]>(roomsProp);

  useEffect(() => {
    const channel = supabase
      .channel('realtime rooms')
      .on(
        'postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'rooms'
        }, 
        (payload: RealtimePostgresChangesPayload<Room>) => {
          setRooms((prev) => [...prev, (payload.new as Room)])
        })
      .subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  }, [setRooms]);

  function handleClick(value: string) {
    console.log("value", value);
  }

  return (
    <section>
      <h1>Rooms available</h1>
      {rooms?.map((room) => (
        <article key={room.id}>
          <strong>{room.name}</strong>
        </article>
      ))}
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