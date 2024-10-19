import { supabase } from "../../_lib/supabase";

interface Props {
  params: { id: string }
}

export default async function Room({ params: { id } }: Props) {
  const { data: room } = await supabase.from('rooms').select().match({ id }).single();
  return <pre>{JSON.stringify(room, null, 2)}</pre>
}