export default function HexagonBees() {
  return (
    <div className="main">
      <div className="container">
        {[...Array(60)].map((_, idx) => {return(<div key={idx}/>);})}
      </div>
    </div>
  );
}