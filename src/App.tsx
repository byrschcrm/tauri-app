import "./App.css";
import Grid from "./Grid";

function App() {
  return (
    <>
      <div >
        Calendar
      </div>
      <Grid cols={7} isEditable={false} />
      <div >
        Task
      </div>
      <Grid cols={4} isEditable={true} />
    </>
  );
}

export default App;
