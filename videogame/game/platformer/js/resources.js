var resources = [

    /* Graphics.
     * @example
     * { name: "example", type:"image", src: "data/img/example.png" },
     */
    { name: "tileset",         type:"image",   src: "data/img/tileset.png" },
    { name: "four-seasons-tileset",         type:"image",   src: "data/img/four-seasons-tileset.png" },
    { name: "temple-tileset",         type:"image",   src: "data/img/temple-tileset.png" },
    { name: "background",      type:"image",   src: "data/img/background.png" },
    { name: "clouds",          type:"image",   src: "data/img/clouds.png" },
    { name: "press_Enter",     type:"image",   src: "data/img/Press enter to start.png" },
    { name: "press_Enter_2",     type:"image",   src: "data/img/return to menu.png" },


    /* Maps.
     * @example
     * { name: "example01", type: "tmx", src: "data/map/example01.tmx" },
     * { name: "example01", type: "tmx", src: "data/map/example01.json" },
     */
    { name: "map1",            type: "tmx",    src: "data/map/gameMap.tmx" },


    /* Tilesets.
     * @example
     * { name: "example01", type: "tsx", src: "data/map/example01.tsx" },
     * { name: "example01", type: "tsx", src: "data/map/example01.json" },
     */
    { name: "four-seasons-tileset",         type: "tsx",    src: "data/map/four-seasons-tileset.tsx" },
    { name: "temple-tileset",         type: "tsx",    src: "data/map/temple-tileset.tsx" },
    { name: "tileset",         type: "tsx",    src: "data/map/tileset.tsx" },


    /* Background music.
     * @example
     * { name: "example_bgm", type: "audio", src: "data/bgm/" },
     */
    { name: "dst-gameforest",  type: "audio", src: "data/bgm/" },

    /* Sound effects.
     * @example
     * { name: "example_sfx", type: "audio", src: "data/sfx/" }
     */
    { name: "cling",           type: "audio",  src: "data/sfx/" },
    { name: "die",             type: "audio",  src: "data/sfx/" },
    { name: "enemykill",       type: "audio",  src: "data/sfx/" },
    { name: "jump",            type: "audio",  src: "data/sfx/" },


    /* Atlases
     * @example
     * { name: "example_tps", type: "json", src: "data/img/example_tps.json" },
     */
    // texturePacker
    { name: "texture",         type: "json",   src: "data/img/texture.json" },
    { name: "texture",         type: "image",  src: "data/img/texture.png" },

    /* Bitmap Font
    * @example
    * { name: "example_fnt", type: "image", src: "data/img/example_fnt.png" },
    * { name: "example_fnt", type: "binary", src: "data/img/example_fnt.fnt" },
    */
    { name: "PressStart2P", type:"image", src: "data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "data/fnt/PressStart2P.fnt"}
];

export default resources;
