import Navbar from "../Navbar";
import TodoList from "../TodoList";
function Home() {
  return (
    <div className="bg-[url('./image1.jpg')] w-[100%] h-[100vh]">
      <Navbar />
      <TodoList />
    </div>
  );
}

export default Home;
