export const presets = {
  fast: {
    "A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ],
    "B": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_Soft_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ],
    "C": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Upscale_Denoise_CNN_x2_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ],
    "A+A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl",
      "Anime4K_Restore_CNN_S.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ],
    "B+B": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_Soft_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Restore_CNN_Soft_S.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ],
    "C+A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Upscale_Denoise_CNN_x2_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Restore_CNN_S.glsl",
      "Anime4K_Upscale_CNN_x2_S.glsl"
    ]
  },
  hq: {
    "A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_VL.glsl",
      "Anime4K_Upscale_CNN_x2_VL.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ],
    "B": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_Soft_VL.glsl",
      "Anime4K_Upscale_CNN_x2_VL.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ],
    "C": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Upscale_Denoise_CNN_x2_VL.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ],
    "A+A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_VL.glsl",
      "Anime4K_Upscale_CNN_x2_VL.glsl",
      "Anime4K_Restore_CNN_M.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ],
    "B+B": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Restore_CNN_Soft_VL.glsl",
      "Anime4K_Upscale_CNN_x2_VL.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Restore_CNN_Soft_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ],
    "C+A": [
      "Anime4K_Clamp_Highlights.glsl",
      "Anime4K_Upscale_Denoise_CNN_x2_VL.glsl",
      "Anime4K_AutoDownscalePre_x2.glsl",
      "Anime4K_AutoDownscalePre_x4.glsl",
      "Anime4K_Restore_CNN_M.glsl",
      "Anime4K_Upscale_CNN_x2_M.glsl"
    ]
  }
};

export const modes = [
  { id: "A", name: "Mode A", desc: "Optimized for 1080p Anime" },
  { id: "B", name: "Mode B", desc: "Optimized for 720p Anime" },
  { id: "C", name: "Mode C", desc: "Optimized for 480p Anime" },
  { id: "A+A", name: "Mode A+A", desc: "Ultra Quality (1080p)" },
  { id: "B+B", name: "Mode B+B", desc: "Ultra Quality (720p)" },
  { id: "C+A", name: "Mode C+A", desc: "Ultra Quality (480p)" }
];
