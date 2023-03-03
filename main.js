import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ width: 768, height: 512 });

// app.viewはcanvas要素
document.body.appendChild(app.view);

const txWidth = 256;
const txHeight = 256;

/**
 * 練習１
 * 既存のビットマップの色を修正
 */
// テクスチャがロード完了するのを待って先に進む必要がある。
// ロード未完了のままでは renderer.extract.pixelsが正しく動作しないため。
const texture = await PIXI.Assets.load('kyocotan256x256.png');
const sprite = PIXI.Sprite.from(texture);
app.stage.addChild(sprite);

// ピクセルデータを取得
// 得られるデータの型はUint8Array（8 ビット符号なし整数値の配列）
const pixels = await app.renderer.extract.pixels(sprite);
console.log(pixels);

// ピクセルデータを編集
for (let x = 0; x < txWidth; x++) {
    for (let y = 0; y < txHeight; y++) {
        let r = pixels[y * txWidth * 4 + x * 4];
        let g = pixels[y * txWidth * 4 + x * 4 + 1];
        let b = pixels[y * txWidth * 4 + x * 4 + 2];
        let a = pixels[y * txWidth * 4 + x * 4 + 3];
        // r, g, b, aの値を変更(0-255)
        r = 255;

        pixels[y * txWidth * 4 + x * 4] = r;
        pixels[y * txWidth * 4 + x * 4 + 1] = g;
        pixels[y * txWidth * 4 + x * 4 + 2] = b;
        pixels[y * txWidth * 4 + x * 4 + 3] = a;
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
        rectPixels[y * txWidth * 4 + x * 4] = r;
        rectPixels[y * txWidth * 4 + x * 4 + 1] = g;
        rectPixels[y * txWidth * 4 + x * 4 + 2] = b;
        rectPixels[y * txWidth * 4 + x * 4 + 3] = a;
    }
}
// 編集後のピクセルデータからテクスチャ作成
const rectTexture = PIXI.Texture.fromBuffer(rectPixels, txWidth, txHeight);
const rectSprite = PIXI.Sprite.from(rectTexture);
rectSprite.y = txHeight;
app.stage.addChild(rectSprite);

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
        let r, g, b, a;
        if ((x % 10 < 5  && y % 10 < 5)
            || (x % 10 >= 5 && y % 10 >= 5)
        ) {
            r = 255;
            g = 255;
            b = 255;
        }
        else {
            r = 255;
            g = 0;
            b = 0;
        }
        ichimaPixels[y * txWidth * 4 + x * 4] = r;
        ichimaPixels[y * txWidth * 4 + x * 4 + 1] = g;
        ichimaPixels[y * txWidth * 4 + x * 4 + 2] = b;
        ichimaPixels[y * txWidth * 4 + x * 4 + 3] = 255;
    }
}
// 編集後のピクセルデータからテクスチャ作成
const ichimaTexture = PIXI.Texture.fromBuffer(ichimaPixels, txWidth, txHeight);
const ichimaSprite = PIXI.Sprite.from(ichimaTexture);
ichimaSprite.x = txWidth;
ichimaSprite.y = txHeight;
app.stage.addChild(ichimaSprite);

