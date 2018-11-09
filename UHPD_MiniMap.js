/*=============================================================================
 * UHPD Games
 * By Ung Hoang Phi Dang - uhpdgames
 * Mini Map .js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
/*:
 * @plugindesc Hien thi mini Map len bang do bang phim #M
 * @author By Ung Hoang Phi Dang - UHPD Games
 * @version: 1.0
 * @help
 * ============================================================================
 * UHPD Games's Plugins
 * ============================================================================
 *
 * Check out my website:
 * www.uhpdgames
 * Contact: kenji.vn14 gmail.com || uhpdgames gmail.com
 *
 *=============================================================================*/
"use strict";
(() => {
  const dotPlayer = 10;
  const miniMapOff = 16;
  const listIgnore = ["map001", "map002", "map008", "map009", "map010", "map012", "map013", "map014"];
  //let cacheNPC = [];
  Game_Interpreter.prototype.miniMap = function () {
    if (SceneManager._scene.constructor.name === "Scene_Map") {
      const showMiniMap = $gameSwitches.value(miniMapOff) || false;
      const showPlayerDot = $gameSwitches.value(dotPlayer) || false;
      if (showPlayerDot) {
        let Xplayer = $gamePlayer.x || 1;
        let Yplayer = $gamePlayer.y || 1;
        Xplayer *= 6;
        Xplayer += 6;
        Yplayer *= 6;
        Yplayer += 6;
        $gameScreen.showPicture(4, 'PlayerDot', 1, Xplayer, Yplayer, 100, 100, 255, 4);
      }
      if (Input.isTriggered("#m")) {
        try {
          if (!showMiniMap) {
            const mapId = this._mapId;
            let filename = 'map%1'.format(mapId.padZero(3));
            if (listIgnore.indexOf(filename) < 0) {
              $gameSwitches.setValue(dotPlayer, true);
              $gameSwitches.setValue(miniMapOff, true);
              //Player Dot
              $gameScreen.showPicture(2, filename, 0, 0, 0, 12.5, 12.5, 200, 0);
            }
          } else {
            $gameScreen.erasePicture(2);
            $gameScreen.erasePicture(4);
            $gameSwitches.setValue(miniMapOff, false);
            $gameSwitches.setValue(dotPlayer, false);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  /**

   for (const ce of cacheNPC) {
            $gameScreen.erasePicture(ce);
          }
   const EV = ($dataMap.events).filter(e => e !== null);
   for (const ev of EV) {
          if ((ev.meta).hasOwnProperty('mnNPC')) {
            let xE = ev.x || 1;
            let yE = ev.y || 1;
            xE *= 6;
            xE += 6;
            yE *= 6;
            yE += 6;
            cacheNPC.push(ev.id);
            $gameScreen.showPicture(ev.id, 'NPC', 1, xE, yE, 100, 100, 255, 0);
          }
        }
   */
})();
