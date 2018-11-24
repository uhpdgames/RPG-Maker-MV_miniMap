/*=============================================================================
 * UHPD Games
 * By Ung Hoang Phi Dang
 * Mini Map .js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/
/*:
 * @plugindesc Displays the miniMap in the game
 * @author Ung Hoang Phi Dang | https://uhpdgames.itch.io/
 * @version: 1.01
 *
 * @param KeyOnMiniMap
 * @desc The key show mini map
 * @default pageup
 * @type text
 *
 * @param PicdotPlayer
 * @desc The picture display as player,
 * @default PlayerDot
 * @type text
 *
 * @param SwitchdotPlayer
 * @desc The switch turns on the dot by player
 * @default 10
 * @type switch
 *
 * @param SwitchMiniOff
 * @desc The switch turns on/off mini map
 * @default 16
 * @type switch
 *
 * @param listIgnore
 * @desc the list Ignore Map with no minimap
 * @type text[]
 *
 * @help
 *
 * All Map is set by name data map and pull it on folder picture
 * vd: map001.png and saved in folder: img / pictures
 *
 * In game is automatically called, if you manually use the function
 * this.miniMap();
 * ============================================================================
 * UHPD Games's Plugins
 * ============================================================================
 *
 * Check out my website:
 * https://www.facebook.com/Tactical-RPG-OutSchool-288240705135985/
 * Demo: https://uhpdgames.itch.io/out-school
 * Contact: kenji.vn14 gmail.com || uhpdgames gmail.com
 *
 *=============================================================================*/
"use strict";
(function () {
  const parameters = PluginManager.parameters("UHPD_MiniMap");
  const dotPlayer = Number(parameters['SwitchdotPlayer'] || 10);
  const imgPlayer = String(parameters['PicdotPlayer'] || 'PlayerDot');
  const miniMapOff = Number(parameters['SwitchMiniOff'] || 16);
  const keyBoard = String(parameters['KeyOnMiniMap'] || 'pageup');
  const listIgnore = eval(parameters['listIgnore'] || []);
  const miniMap = function() {
    if (SceneManager._scene.constructor.name === "Scene_Map") {
      if (!$gameMessage.isBusy()) {
        const showMiniMap = $gameSwitches.value(miniMapOff) || false;
        const showPlayerDot = $gameSwitches.value(dotPlayer) || false;
        if (showPlayerDot) {
          let Xplayer = $gamePlayer.x || 1;
          let Yplayer = $gamePlayer.y || 1;
          Xplayer *= 6;
          Xplayer += 6;
          Yplayer *= 6;
          Yplayer += 6;
          $gameScreen.showPicture(4, imgPlayer, 1, Xplayer, Yplayer, 100, 100, 255, 4);
        }
        if (Input.isTriggered(keyBoard)) {
          if (!showMiniMap) {
            const mapId = Number($gameMap.mapId());
            let filename = 'map%1'.format(mapId.padZero(3));
            if (listIgnore.indexOf(filename) < 0) {
              $gameSwitches.setValue(dotPlayer, true);
              $gameSwitches.setValue(miniMapOff, true);
              $gameScreen.showPicture(2, filename, 0, 0, 0, 12.5, 12.5, 200, 0);
            }
          } else {
            $gameScreen.erasePicture(2);
            $gameScreen.erasePicture(4);
            $gameSwitches.setValue(miniMapOff, false);
            $gameSwitches.setValue(dotPlayer, false);
          }
        }
      }
    }
  };
  Game_Interpreter.prototype.miniMap = function () {
    return miniMap();
  };
  const Alias_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Alias_pluginCommand.call(this, command, args);
    if (command === 'miniMap') {
      this.miniMap();
    }
  };
  //automatic run on game
  const Alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function () {
    Alias_Spriteset_Map_update.call(this);
    miniMap();
  };
})();