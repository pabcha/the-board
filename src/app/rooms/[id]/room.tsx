"use client";

import { supabase } from "../../_lib/supabase";
import { Button } from "@/components";

interface Room {
  id: string;
  created_at: string;
  name: string;
}

interface Props {
  room: Room
}

export default function RoomComponent({ room: roomProp }: Props) {
  async function handleClick(value: string) {
    const { data } = await supabase
      .from('cards')
      .select()
      .eq('user', 'pablo')
      .eq('room_id', 'a22ae03b-ba13-4ee3-81d9-818ca6465a8e');

    if (!data?.length) {
      // insert if not exist
      await supabase
        .from('cards')
        .insert({ 
          user: 'pablo', 
          room_id: 'a22ae03b-ba13-4ee3-81d9-818ca6465a8e',
          estimation: value
        });
    } else {
      // update if exist
      await supabase
        .from('cards')
        .update({ estimation: value })
        .eq('user', 'pablo')
        .eq('room_id', 'a22ae03b-ba13-4ee3-81d9-818ca6465a8e');
    }
  }

  return (
    <section>
      <h1>Room: {roomProp.name}</h1>
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