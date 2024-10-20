import { supabase } from "../../_lib/supabase";
import RoomComponent from "./room";

interface Props {
  params: { id: string }
}

export default async function Room({ params: { id } }: Props) {
  const { data: room } = await supabase.from('rooms').select().match({ id }).single();
  const { data: cards } = await supabase.from('cards').select().match({ room_id: id });
  if (!room || !cards) return;
  return <RoomComponent room={room} cards={cards} />
}