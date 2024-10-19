import { supabase } from "../_lib/supabase";
import RoomsComponent from "./rooms";

export default async function Rooms() {
  const { data } = await supabase.from('rooms').select();
  if (!data) return;
  return <RoomsComponent rooms={data} />
}