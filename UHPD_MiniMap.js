/*=============================================================================
 * UHPD Games
 * By Ung Hoang Phi Dang - uhpdgames
 * Mini Map .js
 * Version: 1.0
 * Free for commercial and non commercial use.
 *=============================================================================*/

/*:
 * @plugindesc Displays the miniMap in the game
 * @author Ung Hoang Phi Dang - UHPD Games
 * @version: 1.01
 *
 * @param KeyOnMiniMap
 * @desc The key show mini map
 * @default z
 * @type text
 *
 * @param SwitchdotPlayer
 * @desc công tắc
 * @default 10
 * @type switch
 *
 * @param SwitchMiniOff
 * @desc công tắc
 * @default 16
 * @type switch
 *
 * @param listIgnore
 * @desc List Ignore Map
 * @type text[]
 *
 * @help
 *
 * Tất cả Map được đặt theo tên đúng tên map của data
 * vd: map001.png và dược lưu ở folder: img/pictures
 *
 * Vao game tu dong duoc goi, neu ban muoc goi thu cong hay su dung ham
 * this.miniMap();
 * ============================================================================
 * UHPD Games's Plugins
 * ============================================================================
 *
 * Check out my website:
 * https://www.facebook.com/Game2D-OutSchool-288240705135985
 * Contact: kenji.vn14@gmail.com || uhpdgames@gmail.com
 *
 *=============================================================================*/
"use strict";
(() => {
    const parameters = PluginManager.parameters("UHPD_MiniMap");
    const dotPlayer = parameters['SwitchdotPlayer'] || 10;
    const miniMapOff = parameters['SwitchMiniOff'] || 16;
    const keyBoard = parameters['KeyOnMiniMap'] || 'z';
    //const listIgnore = ["map001", "map002", "map008", "map009", "map010", "map012", "map013", "map014"];
    const listIgnore = parameters['listIgnore'] || [];
    const miniMap = () => {
        if (SceneManager._scene.constructor.name === "Scene_Map") {
            const GM = $gameMessage;
            const noBusy = !GM.isBusy() || !GM.isChoice() || !GM.isItemChoice() || !GM.isNumberInput();
            if (noBusy) {
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
                if (Input.isTriggered(keyBoard)) {
                    if (!showMiniMap) {
                        const mapId = this._mapId;
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
    }
    Game_Interpreter.prototype.miniMap = function () {
       return miniMap();
    };
    const Alias_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function () {
        Alias_Spriteset_Map_update.call(this);
        miniMap();
    };
})();