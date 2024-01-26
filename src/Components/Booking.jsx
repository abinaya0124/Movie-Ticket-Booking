import { useEffect, useState } from "react";

const ChoosingSeats = () => {
  const status = ["N/A", "Selected", "Occupied"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  const seats = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48,
  ];

  const movies = [
    { name: "Select", price: 0 },
    { name: "Avengers End game (150)", price: 150 },
    { name: "Barbie (200)", price: 200 },
    { name: "Openheimer (250)", price: 250 },
  ];

  const handleSelect = (e) => {
    const selectMovie = movies.find((movie) => movie.name === e.target.value);
    setSelectedMovie(selectMovie);
  };

  //   const handleSeatSelect = (id) => {
  //     const currentBookedSeats = bookedSeats[selectedMovie.name] || [];

  //     if (selectedSeat.includes(id)) {
  //       setSelectedSeat(selectedSeat.filter((i) => i !== id));
  //     } else if (currentBookedSeats.includes(id)) {
  //       return;
  //     } else {
  //       setSelectedSeat((seats) => [...seats, id]);
  //     }
  //   };

  const handleSeatSelect = (id) => {
    const currentBookedSeats = bookedSeats[selectedMovie.name] || [];
    const isSelected = selectedSeat.includes(id);

    if (currentBookedSeats.includes(id)) {
      return;
    }

    if (isSelected) {
      setSelectedSeat(selectedSeat.filter((i) => i !== id));
    } else {
      setSelectedSeat((seats) => [...seats, id]);
    }
  };

  const handleSubmit = () => {
    const currentBookedSeats = bookedSeats[selectedMovie.name] || [];
    setBookedSeats({
      ...bookedSeats,
      [selectedMovie.name]: [...currentBookedSeats, ...selectedSeat],
    });
    setSelectedSeat([]);
  };

  const handlePrice = () => {
    return selectedSeat.length * selectedMovie.price;
  };

  useEffect(() => {
    const storedSelectedSeats =
      JSON.parse(localStorage.getItem("selectedSeat")) || {};
    setBookedSeats(storedSelectedSeats);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSeat", JSON.stringify(bookedSeats));
  }, [bookedSeats]);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="flex gap-5 mb-5">
        <label className="text-lg">SELECT A MOVIE</label>
        <select
          onChange={handleSelect}
          value={selectedMovie ? selectedMovie.name : ""}
          className="border-2 rounded"
        >
          {movies.map((it, id) => (
            <option key={id} value={it.name}>
              {it.name}
            </option>
          ))}
        </select>
      </div>
      {selectedMovie && (
        <>
          <div className="bg-[#e2dfdf] p-2 rounded flex gap-5 mb-8">
            {status.map((it, id) => (
              <div key={id} className="flex items-center gap-2 ">
                <div
                  className={`w-[20px] h-[20px] ${
                    it === "N/A"
                      ? "bg-white"
                      : it === "Selected"
                      ? "bg-green-900"
                      : it === "Occupied"
                      ? "bg-blue-950"
                      : ""
                  } `}
                ></div>
                <p>{it}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="grid grid-cols-8 gap-2 w-[470px] ">
              {seats.map((seat, id) => (
                <div
                  key={id}
                  className={`w-[20px] h-[20px]  ${
                    (bookedSeats[selectedMovie.name] &&
                      bookedSeats[selectedMovie.name].includes(id)) ||
                    selectedSeat.includes(id)
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } ${
                    bookedSeats[selectedMovie.name] &&
                    bookedSeats[selectedMovie.name].includes(id)
                      ? "bg-blue-700"
                      : selectedSeat.includes(id)
                      ? "bg-green-700"
                      : "bg-gray-300"
                  }`}
                  onClick={() => {
                    if (
                      seat &&
                      !bookedSeats[selectedMovie.name]?.includes(id)
                    ) {
                      handleSeatSelect(id);
                    }
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <p>
              You have selected {selectedSeat.length} seats for a price of{" "}
              {handlePrice()}
            </p>
            <button
              className="border-2 rounded mt-8 w-full py-2 text-lg font-semibold text-white text-center
              bg-black hover:bg-gray-500 hover:text-black "
              onClick={() => handleSubmit(selectedMovie.id)}
            >
              Book
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChoosingSeats;
