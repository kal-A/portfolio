// Reconstructed web-app screens for the Hera Fertility case study.
// These are not preserved production screens -- no final UI survived the
// internship. Each screen rebuilds the logic shown in the original wireframes
// (financial app wireframes.pdf, payment plans designs.pdf, Near me design.pdf)
// as a realistic desktop web layout, since every source sketch is a browser
// wireframe, not a native app screen.

const NAVY = "#1f3a52";
const BLUE = "#3a6b93";
const SKY = "#6fa0c4";

function BrowserFrame({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b" style={{ borderColor: "#e5e1d4", background: "#f6f4ec" }}>
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e2b7ab" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#e8d29a" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#a9cdb2" }} />
        <span
          className="ml-2.5 flex-1 truncate rounded-full bg-white px-3 py-1 text-[10px] font-medium text-neutral-400 border"
          style={{ borderColor: "#e5e1d4" }}
        >
          {url}
        </span>
      </div>
      <div className="text-[11px] leading-tight">{children}</div>
    </div>
  );
}

function FieldBox({ label, value, static: isStatic }: { label: string; value: string; static?: boolean }) {
  return (
    <div>
      <p className="text-[9px] text-neutral-400 mb-1">{label}</p>
      <div
        className={`rounded-md border px-2.5 py-2 text-[10px] ${isStatic ? "text-neutral-400" : "text-neutral-700"}`}
        style={{ borderColor: BLUE }}
      >
        {value}
      </div>
    </div>
  );
}

export function HeraFinancingFlowMockup() {
  return (
    <BrowserFrame url="herafertility.co/get-prequalified">
      <div className="p-6 grid grid-cols-[1fr_150px] gap-5">
        <div>
          <p className="font-serif text-base text-neutral-800">Get Prequalified</p>
          <div className="flex gap-1.5 mt-2 mb-4">
            <span className="h-1.5 flex-1 rounded-full" style={{ background: BLUE }} />
            <span className="h-1.5 flex-1 rounded-full" style={{ background: "#e5e1d4" }} />
          </div>
          <p className="text-[9px] text-neutral-400 mb-0.5">Step 2 of 3 &middot; Step back</p>
          <p className="font-medium text-neutral-800 mb-0.5">Place of residence</p>
          <p className="text-[9px] text-neutral-400 mb-3">Where do you live?</p>
          <FieldBox label="Address" value="1234 Street Rd, New York, NY 12345" />
          <p className="text-[8.5px] mt-2" style={{ color: BLUE }}>
            &#10003; Autofills all address parameters with one interaction
          </p>
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <FieldBox label="Phone #" value="(XXX)-XXX-XXXX" static />
            <FieldBox label="Date of birth" value="XX/XX/XXXX" static />
          </div>
          <div className="text-white text-center rounded-md py-2 mt-4 text-[10px] font-semibold" style={{ background: BLUE }}>
            Continue
          </div>
        </div>
        <div className="rounded-lg border px-3 py-3 h-fit" style={{ borderColor: "#e5e1d4" }}>
          <div className="flex items-center justify-between">
            <p className="text-[9px] text-neutral-400">Requested amount</p>
            <span className="text-[8px] font-semibold" style={{ color: BLUE }}>Change</span>
          </div>
          <p className="font-serif text-base text-neutral-800 mt-1">$12,000</p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1 flex-1 rounded-full bg-neutral-100" />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function HeraPaymentPlanMockup() {
  const treatments = [
    { name: "IVF Treatment", rows: ["Synopsis", "Basic procedure"] },
    { name: "Egg Freezing", rows: ["Synopsis"] },
    { name: "IUI Freezing", rows: ["Basics", "Goal"] },
  ];
  return (
    <BrowserFrame url="herafertility.co/payment-plans">
      <div className="p-6">
        <p className="font-serif text-base text-neutral-800 mb-3">Payment plans by treatment</p>
        <div className="grid grid-cols-3 gap-3">
          {treatments.map((t) => (
            <div key={t.name} className="rounded-lg text-white p-3" style={{ background: NAVY }}>
              <p className="font-medium text-[10.5px] mb-2">{t.name}</p>
              {t.rows.map((r) => (
                <div key={r} className="mb-2">
                  <p className="text-[8px] opacity-70 mb-1">{r}</p>
                  <div className="h-1 bg-white/25 rounded-full w-full mb-1" />
                  <div className="h-1 bg-white/25 rounded-full w-4/5" />
                </div>
              ))}
              <div className="text-center rounded-md py-1.5 mt-2 text-[8.5px] font-semibold" style={{ background: SKY, color: NAVY }}>
                Payment plans
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9px] text-neutral-400 uppercase tracking-wide font-semibold mt-6 mb-2">
          IVF payment plans
        </p>
        <div className="grid grid-cols-3 gap-3">
          {["Option 1", "Option 2", "Option 3"].map((opt) => (
            <div key={opt} className="rounded-lg border px-3 py-3" style={{ borderColor: BLUE }}>
              <p className="font-medium text-[10px] text-neutral-800">{opt}</p>
              <p className="text-[9px] text-neutral-400 mt-0.5">$Price / time</p>
              <div className="text-white text-center rounded-md py-1.5 mt-2 text-[8.5px] font-semibold" style={{ background: BLUE }}>
                Get started
              </div>
              <p className="text-[8px] text-neutral-400 mt-2">Contains</p>
              <div className="h-1 bg-neutral-100 rounded-full w-full mt-1" />
              <div className="h-1 bg-neutral-100 rounded-full w-3/4 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

export function HeraClinicSearchMockup() {
  const results = [
    { tag: "IVF", name: "Metropolitan Reproductive Medicine, PC" },
    { tag: "Egg Freezing", name: "Metropolitan Reproductive Medicine, PC" },
    { tag: "Mind-Body", name: "Metropolitan Reproductive Medicine, PC" },
    { tag: "IVF", name: "Metropolitan Reproductive Medicine, PC" },
  ];
  return (
    <BrowserFrame url="herafertility.co/clinics/near-me">
      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 rounded-md border px-2.5 py-1.5 text-[9.5px] text-neutral-400" style={{ borderColor: "#e5e1d4" }}>
            Search by clinic
          </div>
          <div className="flex-1 rounded-md border px-2.5 py-1.5 text-[9.5px] text-neutral-400" style={{ borderColor: "#e5e1d4" }}>
            Search by location
          </div>
          <div className="rounded-md border px-2.5 py-1.5 text-[9.5px] text-neutral-400" style={{ borderColor: "#e5e1d4" }}>
            Categories &#9662;
          </div>
          <div className="rounded-md text-white px-3.5 py-1.5 text-[9.5px] font-semibold" style={{ background: BLUE }}>
            Search
          </div>
        </div>
        <div className="grid grid-cols-[150px_1fr] gap-3">
          <div className="rounded-md border px-2.5 py-2" style={{ borderColor: "#e5e1d4" }}>
            <p className="text-[8.5px] text-neutral-400 mb-1.5">Radius (mi)</p>
            <div className="rounded border px-2 py-1 text-[9px] text-neutral-500 mb-3" style={{ borderColor: "#e5e1d4" }}>
              Filter &#9662;
            </div>
            <div className="rounded-md h-24 flex items-center justify-center text-[8.5px] text-neutral-400" style={{ background: "#eef1f5" }}>
              Map
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-2.5">
              {results.map((r, i) => (
                <div key={i} className="rounded-md border px-2.5 py-2" style={{ borderColor: "#e5e1d4" }}>
                  <span
                    className="inline-block rounded-full px-1.5 py-0.5 text-[7.5px] font-semibold mb-1"
                    style={{ background: "#eaf1f7", color: BLUE }}
                  >
                    Fertility &middot; {r.tag}
                  </span>
                  <p className="text-[9.5px] font-medium text-neutral-800 leading-tight">{r.name}</p>
                  <p className="text-[8px] text-neutral-400 mt-1">422 West End Ave, New York</p>
                  <p className="text-[8px] text-neutral-400">Clinic score &#9733; &middot; sort: distance</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function HeraClinicDetailMockup() {
  return (
    <BrowserFrame url="herafertility.co/clinics/kofinas-fertility-group">
      <div className="p-5">
        <span
          className="inline-block rounded-full px-2 py-0.5 text-[7.5px] font-semibold mb-1.5"
          style={{ background: "#eaf1f7", color: BLUE }}
        >
          Fertility clinic
        </span>
        <p className="font-serif text-base text-neutral-800">Kofinas Fertility Group</p>
        <p className="text-[9px] text-neutral-400 mt-1">65 Broadway, 4th Floor, New York, NY 10006</p>
        <p className="text-[9px] text-neutral-400">+1 (212) 345-4000</p>

        <div className="grid grid-cols-[1fr_150px] gap-4 mt-3">
          <div className="rounded-md h-20 flex items-center justify-center text-[8.5px] text-neutral-400" style={{ background: "#eef1f5" }}>
            Map
          </div>
          <div>
            <p className="text-[8.5px] text-neutral-400 mb-1">Hours of operation</p>
            <p className="text-[9px] text-neutral-600 leading-snug">Mon &ndash; Thu: 8:00am &ndash; 5:00pm</p>
            <p className="text-[9px] text-neutral-600 leading-snug">Fri: 8:00am &ndash; 1:00pm</p>
          </div>
        </div>

        <div className="flex gap-2 mt-3.5">
          <div className="rounded-md text-white text-center flex-1 py-1.5 text-[9px] font-semibold" style={{ background: BLUE }}>
            Contact / connect
          </div>
          <div className="rounded-md text-center flex-1 py-1.5 text-[9px] font-semibold border" style={{ borderColor: BLUE, color: BLUE }}>
            Get pre-approved
          </div>
        </div>
        <p className="text-[8px] text-neutral-400 mt-2">
          People also view: <span style={{ color: BLUE }}>Loan calculator</span> &middot;{" "}
          <span style={{ color: BLUE }}>FAQ</span>
        </p>

        <p className="text-[8.5px] text-neutral-400 uppercase tracking-wide font-semibold mt-4 mb-1.5">
          Related listings
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-md border px-2 py-1.5" style={{ borderColor: "#e5e1d4" }}>
              <span
                className="inline-block rounded-full px-1.5 py-0.5 text-[7px] font-semibold mb-1"
                style={{ background: "#eaf1f7", color: BLUE }}
              >
                Fertility clinic
              </span>
              <p className="text-[8.5px] font-medium text-neutral-800 leading-tight">
                Metropolitan Reproductive Medicine, PC
              </p>
              <p className="text-[7.5px] text-neutral-400 mt-1">422 West End Ave, New York</p>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
