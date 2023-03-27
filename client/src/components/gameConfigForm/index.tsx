import { FormEventHandler, useEffect, useState } from "react";
import IGameConfig from "./interfaces/IGameConfig";
import axios from "axios";

const gameConfig: IGameConfig = {
  categories: 3,
  maxTries: 5,
  maxScorePerCategory: 8,
  wordsPerRound: 4,
  maxTimePerGame: 300000,
  maxSecondsPerQuestion: 20000,
};
//En esta ruta /games/forms
const GameConfigForm = () => {
  const [gameConfigData, setGameConfigData] = useState<IGameConfig>(gameConfig);

  const handleInputChange = () => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setGameConfigData({
        ...gameConfigData,
        [event.target.name]: Number.parseInt(event.target.value),
      });
    };
  };

  useEffect(() => {
    console.log(gameConfigData);
  }, [gameConfigData]);

  const validateForm = (): FormEventHandler => {
    
    return async (event: any) => {
      
      event.preventDefault();
      console.log("aaaaaa");
      if (
        gameConfigData.categories > 3 ||
        gameConfigData.maxTries > 5 ||
        gameConfigData.maxScorePerCategory > 8 ||
        gameConfigData.wordsPerRound > 4 ||
        gameConfigData.maxTimePerGame > 300000 ||
        gameConfigData.maxSecondsPerQuestion > 20000
      ) {
        try {
          const response = await axios.post(
            "http://localhost:8080/game/data/config",
            {
              gameConfigData,
            }
          );
          if (!response?.data?.message) return false;
          console.log(response.data.message);
        } catch (error: any) {
          if (error?.response?.data?.message) {
            return console.log(
              "A config games error has been appeared: " +
                error?.response?.data?.message
            );
          }
        }
      

      return false;
    };
  }
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={validateForm()}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Categories
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="categories"
            type="number"
            placeholder="Categories"
            name="categories"
            onChange={handleInputChange()}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Tries
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Max Tries"
            name="maxTries"
            onChange={handleInputChange()}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Score Per Category
          </label>
          <input
            className=""
            id="maxScorePerCategory"
            type="number"
            placeholder="Max Score Per Category"
            name="maxScorePerCategory"
            onChange={handleInputChange()}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Words per Round
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="wordsPerRound"
            type="number"
            placeholder="Words per Round"
            name="wordsPerRound"
            onChange={handleInputChange()}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max time per Game
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="maxTimePerGame"
            type="number"
            placeholder="Max time per Game"
            name="maxTimePerGame"
            onChange={handleInputChange()}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Max Seconds Per Question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="maxSecondsPerQuestion"
            type="number"
            placeholder="Max Seconds Per Question"
            name="maxSecondsPerQuestion"
            onChange={handleInputChange()}
          />
        </div>

        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"Guardar configuracion"}
          />

          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"Aplicar"}
            name ="aplicar"
          />

          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"Importar Mi Configuración"}

          />
        </div>
      </form>
    </>
  );
};

export default GameConfigForm;
