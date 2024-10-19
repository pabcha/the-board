"use client";
import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../_lib/supabase";
import { useUser } from "@clerk/nextjs";

export default function Profile() {
  const { user, isSignedIn } = useUser();
  const [showScores, setShowScores] = useState(true);
  const [points, setPoints] = useState<Map<string, number | string>>(new Map());
  const channel = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!channel.current) {
      channel.current = supabase.channel("poker-room", {
        config: {
          broadcast: {
            self: true,
          },
        },
      });

      channel.current
        .on("broadcast", { event: "point" }, ({ payload }) => {
          setPoints((prevPointsMap) => {
            const updatedPointsMap = new Map(prevPointsMap);
            updatedPointsMap.set(payload.point.user, payload.point.value);
            return updatedPointsMap;
          });
        })
        .subscribe();
    }
    return () => {
      channel.current?.unsubscribe();
      channel.current = null;
    };
  }, []);

  const toggleScores = () => setShowScores(!showScores);

  function handleClick(value: string | number) {
    if (!channel.current || !isSignedIn) return;
    channel.current.send({
      type: "broadcast",
      event: "point",
      payload: { point: { value, user: user.username } },
    });
  }

  return (
    <main className="bg-gray-100">
      <div>
        <button onClick={toggleScores}
          className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600">
          {showScores ? 'Ocultar Puntajes' : 'Mostrar Puntajes'}
        </button>
      </div>
      <div className="flex p-6 space-x-4">
        <div className="grid grid-cols-4 gap-6">
          {Array.from(points.entries()).map(([user, value]) => (
            <div key={user} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
              <h2 className="text-xl font-semibold mb-2">{user}</h2>
              {showScores ? (
                <p className="text-4xl font-bold text-gray-700">{value}</p>
              ) : '-'}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 w-64 lg:w-48 md:w-24 sm:w-16 xs:w-12 transition-all duration-500 ease-in-out">
          <h2 className="text-2xl font-bold mb-4 text-center hidden md:block">Selecciona un puntaje</h2>
          <ul className="space-y-4 text-center">
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(1)}>
                1
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(2)}>
                2
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(3)}>
                3
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(5)}>
                5
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(8)}>
                8
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick(13)}>
                13
              </button>
            </li>
            <li>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hidden md:inline-block" onClick={() => handleClick('?')}>
                ?
              </button>
            </li>
            <li>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 hidden md:inline-block" onClick={() => handleClick('coffee')}>
                Cafecito
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
