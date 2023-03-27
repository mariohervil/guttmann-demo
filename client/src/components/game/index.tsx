import { useEffect } from "react";
import { Game } from "./game-files/game";

export default function GameComponent() {
  useEffect(() => {
    console.log("I fire once");
    import("phaser").then((Phaser) => {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: "b9eaff",
        scene: [Game],
      };
      const game = new Phaser.Game(config);
      console.log("Loaded");
      return () => {
        game.destroy(true, false);
      };
    });
  }, []);

  return <div></div>;
}
