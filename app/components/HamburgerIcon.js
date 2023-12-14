function HamburgerIcon() {
  return (
    <button className="relative group md:hidden">
      <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] bg-red-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md open`}>
        <div className="flex flex-col justify-between w-[20px] h-[20px] duration-300 origin-center overflow-hidden">
          <div className={`bg-white h-[2px] w-7 duration-300 origin-left `}></div>
          <div className={`bg-white h-[2px] w-7 rounded duration-300 `}></div>
          <div className={`bg-white h-[2px] w-7 duration-300 origin-left`}></div>
        </div>
      </div>
    </button>
  )
}

export default HamburgerIcon