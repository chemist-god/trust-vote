

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="candidate-layout">
      {/* <header>Candidate Header</header> */}
      <main>{children}</main>
      {/* <footer>Candidate Footer</footer> */}
    </div>
  );
}