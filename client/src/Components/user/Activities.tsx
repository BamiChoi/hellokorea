function Activities() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-2 mb-8 border-b-2 border-main pb-4">
      <div className="bg-main flex justify-center items-center text-white rounded-md">
        total posts
      </div>
      <div className="bg-main flex justify-center items-center text-white rounded-md">
        total comments
      </div>
      <div className="bg-main flex justify-center items-center text-white rounded-md">
        total upvote
      </div>
      <div className="text-center text-3xl">234</div>
      <div className="text-center text-3xl">120</div>
      <div className="text-center text-3xl">100</div>
    </div>
  );
}

export default Activities;
