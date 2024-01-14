export default function Navbar() {
    function showMenu() {
        let x = document.getElementById("menu")
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    }

    return (
        <div className="fixed size-full">
            <nav className="bg-gray-800">
                <div className="mx-auto px-2">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center ml-1">
                            <button type="button"
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:outline-none transition ease-in-out delay-150 hover:bg-gray-700 hover:text-white hover:scale-105"
                                    onClick={showMenu}>
                                <svg className="block h-8 w-8" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                                </svg>
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                     stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="hidden w-1/6 h-screen bg-gray-800" id="menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    <a href="#"
                       className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">X</a>
                    <a href="#"
                       className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">X</a>
                </div>
            </div>
        </div>
    )
}