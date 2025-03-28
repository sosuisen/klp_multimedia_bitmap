import * as PIXI from 'pixi.js'

const app = new PIXI.Application();
await app.init({ width: 768, height: 512 });

// app.viewはcanvas要素
document.body.appendChild(app.canvas);

const txWidth = 256;
const txHeight = 256;

/**
 * 練習１
 * 既存のビットマップの色を修正
 */
await PIXI.Assets.load('kyocotan256x256.png');
const sprite = PIXI.Sprite.from('kyocotan256x256.png');
app.stage.addChild(sprite);

// ピクセルデータを取得
// 得られるデータの型はUint8Array（8 ビット符号なし整数値の配列）
const pixels = app.renderer.extract.pixels(sprite);
console.log(pixels);

// ピクセルデータを編集
for (let x = 0; x < txWidth; x++) {
    for (let y = 0; y < txHeight; y++) {
        let index = y * txWidth + x;
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
const newTexture = PIXI.Texture.fromBuffer(pixels, txWidth, txHeight);
const newSprite = PIXI.Sprite.from(newTexture);
newSprite.x = txWidth;
app.stage.addChild(newSprite);

/**
 * 練習２
 * 白紙のビットマップから長方形の絵を描画
 */
// 白紙のピクセルデータを作成
const rectPixels = new Uint8Array(4 * txWidth * txHeight);
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
        let index = y * txWidth + x;
        rectPixels[index * 4] = r;
        rectPixels[index * 4 + 1] = g;
        rectPixels[index * 4 + 2] = b;
        rectPixels[index * 4 + 3] = a;
    }
}
// 編集後のピクセルデータからテクスチャ作成
const rectTexture = PIXI.Texture.fromBuffer(rectPixels, txWidth, txHeight);
const rectSprite = PIXI.Sprite.from(rectTexture);
rectSprite.y = txHeight;
app.stage.addChild(rectSprite);


/**
 * 基本課題
 * 既存のビットマップの色をグレースケールへ修正
 */
// 元絵からピクセルデータを取得
const pixels2 = await app.renderer.extract.pixels(sprite);
// ピクセルデータを編集
for (let x = 0; x < txWidth; x++) {
    for (let y = 0; y < txHeight; y++) {
        let index = y * txWidth + x;
        let r = pixels2[index * 4];
        let g = pixels2[index * 4 + 1];
        let b = pixels2[index * 4 + 2];
        // グレースケールにするための値を
        // r, g, bの値から求めて、
        // r, g, bへ代入する処理を書く。

        // r, g, b, aの値を変更(0-255)
        let gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
        r = g = b = gray;

        pixels2[index * 4] = r;
        pixels2[index * 4 + 1] = g;
        pixels2[index * 4 + 2] = b;
    }
}

// 編集後のピクセルデータからテクスチャ作成
const grayTexture = PIXI.Texture.fromBuffer(pixels2, txWidth, txHeight);
const graySprite = PIXI.Sprite.from(grayTexture);
graySprite.x = txWidth * 2;
app.stage.addChild(graySprite);

/**
 * 発展課題
 * 白紙のビットマップから市松模様を作成
 */
// 白紙のピクセルデータを作成
const ichimaPixels = new Uint8Array(4 * txWidth * txHeight);

// 描画する矩形の範囲は練習２と同じ

// ピクセルデータを編集
for (let x = rectX; x < rectX + rectWidth; x++) {
    for (let y = rectY; y < rectY + rectHeight; y++) {
        let r, g, b;
        // r, g, bの値をx,y座標を元に求めてください。

        

        let index = y * txWidth + x;
        ichimaPixels[index * 4] = r;
        ichimaPixels[index * 4 + 1] = g;
        ichimaPixels[index * 4 + 2] = b;
        ichimaPixels[index * 4 + 3] = 255;
    }
}
// 編集後のピクセルデータからテクスチャ作成
const ichimaTexture = PIXI.Texture.fromBuffer(ichimaPixels, txWidth, txHeight);
const ichimaSprite = PIXI.Sprite.from(ichimaTexture);
ichimaSprite.x = txWidth;
ichimaSprite.y = txHeight;
app.stage.addChild(ichimaSprite);

