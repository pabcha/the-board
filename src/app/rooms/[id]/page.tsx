import { supabase } from "../../_lib/supabase";
import RoomComponent from "./room";

interface Props {
  params: { id: string }
}

export default async function Room({ params: { id } }: Props) {
  const { data: room } = await supabase.from('rooms').select().match({ id }).single();
  if (!room) return;
  return <RoomComponent room={room} />
}