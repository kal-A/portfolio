function WatchFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[170px] h-[200px] shrink-0 rounded-[26px] border-4 border-neutral-900 bg-black shadow-lg overflow-hidden p-2">
      <div className="h-full w-full rounded-[18px] bg-neutral-950 text-white text-[8px] leading-tight px-2 py-2 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export function PillPalMyMedsMockup() {
  return (
    <WatchFrame>
      <div className="flex justify-between items-center">
        <span className="text-emerald-400">63 BPM</span>
        <span>10:18</span>
      </div>
      <p className="mt-1 text-neutral-300">Fri, Nov 29</p>
      <div className="flex justify-between items-center mt-2">
        <span className="font-medium">My Meds</span>
        <span className="bg-emerald-500 text-black rounded px-1.5 py-0.5 text-[7px]">Add New +</span>
      </div>
      <div className="mt-2 space-y-1 flex-1">
        {[
          { name: "Azithromycin", dose: "2", color: "bg-emerald-400" },
          { name: "Vitamin D", dose: "1", color: "bg-sky-400" },
          { name: "Hydrochlorothiazide", dose: "1", color: "bg-amber-400" },
        ].map((m) => (
          <div key={m.name} className="flex items-center justify-between border-b border-neutral-800 pb-1">
            <span className="truncate">{m.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-neutral-400">{m.dose}</span>
              <span className={`h-2 w-2 rounded-full ${m.color}`} />
            </div>
          </div>
        ))}
      </div>
    </WatchFrame>
  );
}

export function PillPalAddMedicationMockup() {
  return (
    <WatchFrame>
      <p className="text-neutral-400">← Add New Medication</p>
      <div className="mt-2 space-y-1.5 flex-1">
        <div>
          <p className="text-neutral-400">Name of Medication</p>
          <div className="h-3 bg-neutral-800 rounded mt-0.5" />
        </div>
        <div>
          <p className="text-neutral-400">Type</p>
          <div className="h-3 bg-neutral-800 rounded mt-0.5 flex items-center px-1 text-neutral-500">
            Please select ▾
          </div>
        </div>
        <div>
          <p className="text-neutral-400">Days / Week</p>
          <div className="flex gap-0.5 mt-0.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full flex items-center justify-center text-[6px] ${
                  i < 5 ? "bg-emerald-500 text-black" : "bg-neutral-800 text-neutral-500"
                }`}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-emerald-500 text-black text-center rounded py-1 mt-1 font-medium">
        Add Meds
      </div>
    </WatchFrame>
  );
}

export function PillPalReminderMockup() {
  return (
    <WatchFrame>
      <div className="flex justify-between items-center">
        <span className="text-emerald-400">63 BPM</span>
        <span>10:18</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
        <p className="text-rose-400 font-medium">Pill Reminder</p>
        <p className="text-neutral-200">Advil — 2pc</p>
        <p className="text-neutral-500">7:00 PM</p>
      </div>
      <div className="space-y-1">
        <div className="bg-emerald-500 text-black text-center rounded py-1 font-medium">Taken</div>
        <div className="border border-neutral-700 text-neutral-300 text-center rounded py-1">
          Remind Later
        </div>
      </div>
    </WatchFrame>
  );
}

export function PillPalEmergencyMockup() {
  return (
    <WatchFrame>
      <p className="text-neutral-400">Contacts</p>
      <div className="mt-2 space-y-1.5 flex-1">
        <div className="bg-rose-600 rounded px-2 py-1.5 flex items-center justify-between">
          <span>Emergency — 911</span>
          <span>📞</span>
        </div>
        <div className="bg-neutral-800 rounded px-2 py-1.5 flex items-center justify-between">
          <span className="truncate">Pharmaceutical Rep</span>
          <span>📞</span>
        </div>
        <div className="bg-neutral-800 rounded px-2 py-1.5 flex items-center justify-between">
          <span className="truncate">Non-Emergency Contact</span>
          <span>📞</span>
        </div>
      </div>
    </WatchFrame>
  );
}
