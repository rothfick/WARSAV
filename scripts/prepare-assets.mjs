import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const files = [
  "E9AB9E9C-647F-4D05-98AD-123EC6CA1A3F",
  "B0F43CCE-8A6C-4F7B-AAF4-D8A41C414713",
  "FA5BE783-CA69-414C-9AF5-9A2665BB53A4",
  "61A46C8D-5619-436F-A478-7FB5DD97D350",
  "3020AC47-8959-4D23-8610-12FC1C6BAA98",
  "EB843BC6-AA9F-4225-8EDA-66B89D4001DC",
];
const bounds = [
  [0.746, 0.697, 0.592],
  [0.71, 0.711, 0.595],
  [0.706, 0.709, 0.585],
  [0.72, 0.689, 0.613],
  [0.709, 0.695, 0.615],
  [0.729, 0.698, 0.613],
];
for (let i = 0; i < files.length; i++) {
  const source = `source-assets/${files[i]}.PNG`;
  const { width: w, height: h } = await sharp(source).metadata();
  const id = String(i + 1).padStart(3, "0");
  const [split, bottom, foot] = bounds[i];
  const regions = {
    ["campaign/" + id]: [0, 0.095, split - 0.003, bottom - 0.097],
    ["products/" + id + "-front"]: [
      0.015,
      bottom + 0.012,
      foot / 2 - 0.02,
      0.98 - bottom - 0.012,
    ],
    ["products/" + id + "-back"]: [
      foot / 2,
      bottom + 0.012,
      foot / 2 - 0.025,
      0.98 - bottom - 0.012,
    ],
    ["details/" + id + "-print"]: [split + 0.003, 0.27, 0.995 - split, 0.2],
    ["details/" + id + "-label"]: [
      split + 0.003,
      0.5,
      0.995 - split,
      bottom - 0.505,
    ],
    ["editorial/" + id + "-board"]: [0, 0, 1, 1],
  };
  for (const [name, [x, y, ww, hh]] of Object.entries(regions)) {
    const crop = {
      left: Math.round(x * w),
      top: Math.round(y * h),
      width: Math.floor(ww * w),
      height: Math.floor(hh * h),
    };
    const max = name.startsWith("editorial") ? 1600 : 1200;
    await sharp(source)
      .extract(crop)
      .resize({ width: max, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(`public/warsav/drop-001/${name}.webp`);
    if (name.startsWith("campaign"))
      await sharp(source)
        .extract(crop)
        .resize({ width: 600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(`public/warsav/drop-001/${name}-sm.webp`);
  }
  console.log("Prepared", id, w, h);
}
