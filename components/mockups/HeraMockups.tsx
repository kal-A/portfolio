function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[220px] shrink-0 rounded-[28px] border-4 border-neutral-900 bg-white shadow-lg overflow-hidden">
      <div className="h-full flex flex-col text-[10px] leading-tight">{children}</div>
    </div>
  );
}

export function HeraOnboardingMockup() {
  return (
    <PhoneFrame>
      <div className="bg-rose-500 text-white px-4 pt-6 pb-8">
        <p className="text-[9px] opacity-80">Welcome to</p>
        <p className="text-sm font-serif">Hera Financing</p>
      </div>
      <div className="flex-1 px-4 py-4 space-y-3">
        <p className="font-medium text-neutral-800">Let&apos;s get you started</p>
        <div className="space-y-2">
          {["Estimated treatment cost", "Preferred monthly payment", "Employment status"].map(
            (label) => (
              <div key={label} className="border border-neutral-200 rounded-lg px-3 py-2">
                <p className="text-neutral-400 text-[9px]">{label}</p>
                <div className="h-2 w-3/4 bg-neutral-100 rounded mt-1" />
              </div>
            )
          )}
        </div>
        <div className="bg-rose-500 text-white text-center rounded-lg py-2 mt-2 text-[9px] font-medium">
          Continue
        </div>
        <div className="flex justify-center gap-1 pt-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-rose-500" : "bg-neutral-200"}`}
            />
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

export function HeraPaymentPlanMockup() {
  return (
    <PhoneFrame>
      <div className="px-4 pt-5 pb-2">
        <p className="text-neutral-400 text-[9px]">Step 2 of 3</p>
        <p className="font-medium text-neutral-800 mt-1">Choose your payment plan</p>
      </div>
      <div className="flex-1 px-4 pb-4 space-y-2">
        {[
          { term: "12 months", amount: "$210/mo", tag: null },
          { term: "24 months", amount: "$118/mo", tag: "Most popular" },
          { term: "36 months", amount: "$84/mo", tag: null },
        ].map((plan) => (
          <div
            key={plan.term}
            className={`rounded-lg border px-3 py-2 flex items-center justify-between ${
              plan.tag ? "border-rose-400 bg-rose-50" : "border-neutral-200"
            }`}
          >
            <div>
              <p className="text-neutral-800 font-medium">{plan.term}</p>
              {plan.tag && <p className="text-rose-500 text-[8px]">{plan.tag}</p>}
            </div>
            <p className="text-neutral-800">{plan.amount}</p>
          </div>
        ))}
        <div className="bg-rose-500 text-white text-center rounded-lg py-2 mt-3 text-[9px] font-medium">
          Confirm plan
        </div>
      </div>
    </PhoneFrame>
  );
}

export function HeraDashboardMockup() {
  return (
    <PhoneFrame>
      <div className="px-4 pt-5 pb-2 flex items-center justify-between">
        <p className="font-medium text-neutral-800">My Financing</p>
        <span className="h-5 w-5 rounded-full bg-neutral-100" />
      </div>
      <div className="flex-1 px-4 pb-4 space-y-3">
        <div className="rounded-xl bg-rose-500 text-white px-3 py-3">
          <p className="text-[8px] opacity-80">Remaining balance</p>
          <p className="text-sm font-serif">$1,890.00</p>
          <div className="h-1.5 bg-white/30 rounded-full mt-2">
            <div className="h-1.5 bg-white rounded-full w-2/3" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-neutral-400 text-[9px]">Upcoming payments</p>
          {["Nov 1 — $118.00", "Dec 1 — $118.00"].map((row) => (
            <div key={row} className="border border-neutral-200 rounded-lg px-3 py-2 flex justify-between">
              <span className="text-neutral-700">{row.split(" — ")[0]}</span>
              <span className="text-neutral-800 font-medium">{row.split(" — ")[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
