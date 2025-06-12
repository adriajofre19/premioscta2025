import React, { useState } from "react";
import resultats from "../../public/resultats_partits.json";

const getArbitres = () => {
  // Extrae árbitros únicos y los ordena
  return Array.from(new Set(resultats.map(p => p.arbitre_web).filter(Boolean))).sort();
};

export default function ArbitrePartits() {
  const arbitres = getArbitres();
  const [selected, setSelected] = useState("");

  const partits = selected
    ? resultats.filter(p => p.arbitre_web === selected)
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Partits per àrbitre</h2>
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="arbitre" className="font-medium text-gray-700">
          Selecciona àrbitre:
        </label>
        <select
          id="arbitre"
          className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">-- Selecciona --</option>
          {arbitres.map(nom => (
            <option key={nom} value={nom}>{nom}</option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Jornada</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Local</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Gols</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Visitant</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Gols</th>
                <th className="px-4 py-3 font-semibold text-yellow-700">Grogues</th>
                <th className="px-4 py-3 font-semibold text-red-700">Vermelles</th>
              </tr>
            </thead>
            <tbody>
              {partits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                    No hi ha partits per aquest àrbitre.
                  </td>
                </tr>
              ) : (
                partits.map((partit, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{partit.jornada ?? '-'}</td>
                    <td className="px-4 py-2">{partit.equip_local ?? '-'}</td>
                    <td className="px-4 py-2">{partit.gols_local ?? '-'}</td>
                    <td className="px-4 py-2">{partit.equip_visitant ?? '-'}</td>
                    <td className="px-4 py-2">{partit.gols_visitant ?? '-'}</td>
                    <td className="px-4 py-2 text-yellow-700 font-semibold">
                      {(partit.grogues_local || 0) + (partit.grogues_visitant || 0)}
                    </td>
                    <td className="px-4 py-2 text-red-700 font-semibold">
                      {(partit.vermelles_local || 0) + (partit.vermelles_visitant || 0)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}