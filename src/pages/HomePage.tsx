import type { JSX } from "react";
import PostList from "../components/PostList";

const HomePage = (): JSX.Element => {
  return (
    <div className='flex flex-col items-center text-white h-screen border-l border-gray-600/40 overflow-y-auto'>
      <PostList />
    </div>
  );
};

export default HomePage;
