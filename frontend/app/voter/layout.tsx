export default function VoterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="voter-layout">
      {/* <header>Voter Header</header> */}
      <main>{children}</main>
      {/* <footer>-</footer> */}
    </div>
  );
}