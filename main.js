import * as PIXI from 'pixi.js'

const app = new PIXI.Application();
await app.init({ width: 768, height: 512 });

// app.viewはcanvas要素
document.body.appendChild(app.canvas);

//const txWidth = 256;
//const txHeight = 256;

/**
 * 練習１
 * 既存のビットマップの色を修正
 */
await PIXI.Assets.load('kyocotan256x256.png');
const sprite = PIXI.Sprite.from('kyocotan256x256.png');
app.stage.addChild(sprite);

// ピクセルデータのコピーを取得
const pixelsOutput = app.renderer.extract.pixels(sprite);
const { pixels, width, height } = pixelsOutput;
// pixelsは8ビット符号なし整数値の配列
console.log(pixels);

// ピクセルデータを編集
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let index = y * width + x;
        let r = pixels[index * 4];
        let g = pixels[index * 4 + 1];
        let b = pixels[index * 4 + 2];
        let a = pixels[index * 4 + 3];
        // r, g, b, aの値を変更(0-255)
        r = 255;

        pixels[index * 4] = r;
        pixels[index * 4 + 1] = g;
        pixels[index * 4 + 2] = b;
        pixels[index * 4 + 3] = a;
    }
}

// 編集後のピクセルデータからテクスチャ作成
const newTexture = PIXI.Texture.from({
    resource: pixels,
    width,
    height,
});
const newSprite = PIXI.Sprite.from(newTexture);
newSprite.x = width;
app.stage.addChild(newSprite);

/**
 * 練習２
 * 白紙のビットマップから長方形の絵を描画
 */
// 白紙のピクセルデータを作成
const rectPixels = new Uint8Array(4 * width * height);
// 描画する矩形
const rectX = 64;
const rectY = 96;
const rectWidth = 128;
const rectHeight = 64;
// ピクセルデータを編集
for (let x = rectX; x < rectX + rectWidth; x++) {
    for (let y = rectY; y < rectY + rectHeight; y++) {
        // r, g, b, aの値をセット(0-255)
        let r = 255;
        let g = 255;
        let b = 0;
        let a = 255;
        // let a = 128;
        let index = y * width + x;
        rectPixels[index * 4] = r;
        rectPixels[index * 4 + 1] = g;
        rectPixels[index * 4 + 2] = b;
        rectPixels[index * 4 + 3] = a;
    }
}
// 編集後のピクセルデータからテクスチャ作成
const rectTexture = PIXI.Texture.from({
    resource: rectPixels,
    width,
    height
});
const rectSprite = PIXI.Sprite.from(rectTexture);
rectSprite.y = height;
app.stage.addChild(rectSprite);


/**
 * 基本課題
 * 既存のビットマップの色をグレースケールへ修正
 */
// 元絵からピクセルデータをコピー
const pixelsOutput2 = app.renderer.extract.pixels(sprite);
const { pixels: pixels2 } = pixelsOutput2;
// ピクセルデータを編集




// 編集後のピクセルデータからテクスチャ作成
const grayTexture = PIXI.Texture.from({
    resource: pixels2,
    width,
    height
});
const graySprite = PIXI.Sprite.from(grayTexture);
graySprite.x = width * 2;
app.stage.addChild(graySprite);


/**
 * 発展課題8a
 * 白紙のビットマップから市松模様を作成
 */
// 白紙のピクセルデータを作成
const ichimaPixelsOutput = new Uint8Array(4 * width * height);
const { pixels: ichimaPixels } = ichimaPixelsOutput;
// 描画する矩形の範囲は練習２と同じ




// 編集後のピクセルデータからテクスチャ作成
const ichimaTexture = PIXI.Texture.from({
    resource: ichimaPixels,
    width,
    height
});
const ichimaSprite = PIXI.Sprite.from(ichimaTexture);
ichimaSprite.x = width;
ichimaSprite.y = height;
app.stage.addChild(ichimaSprite);

/**
 * 発展課題8b
 * 鏡像を追加
 */

