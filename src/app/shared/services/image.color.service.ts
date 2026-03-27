import { Injectable } from '@angular/core';
import { FastAverageColor } from 'fast-average-color';
import Vibrant from '@oscarbarrett/node-vibrant';

export interface ImageGradientResult {
  dominantColor: string;   // from FastAverageColor
  accentColor: string;     // from Vibrant palette
  gradient: string;        // ready-to-use multi-layer gradient string
}

@Injectable({
  providedIn: 'root',
})
export class ImageColorService {
  private fac = new FastAverageColor();

  constructor() {}

  /**
   * Generate dominant + vibrant colors and a multi-layer gradient
   */
  async getGradientFromImage(imageUrl: string): Promise<ImageGradientResult> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;

      img.onload = async () => {
        try {
          // 1️⃣ Get dominant color from FastAverageColor
          const dominantResult = await this.fac.getColorAsync(img);
          const dominantColor = dominantResult.hex;

          // 2️⃣ Get vibrant palette from Vibrant
          const palette = await Vibrant.from(img).getPalette();
          const accentColor =
            palette.Vibrant?.getHex?.() ??
            palette.LightVibrant?.getHex?.() ??
            palette.DarkVibrant?.getHex?.() ??
            dominantColor;

          // 3️⃣ Convert hex to rgba for radial overlays
          const hexToRgba = (hex: string, alpha = 1) => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r},${g},${b},${alpha})`;
          };

          const dominantRgba = hexToRgba(dominantColor);
          const accentRgba = hexToRgba(accentColor);

          // 4️⃣ Build a multi-layer gradient
          const gradient = `linear-gradient(to bottom, ${dominantRgba}, ${accentRgba}, rgba(0,0,0,0.7) 80%),
            radial-gradient(ellipse at top left, ${dominantRgba}),
            radial-gradient(ellipse at top right, ${accentRgba}),
            radial-gradient(ellipse at center right, ${dominantRgba}),
            radial-gradient(ellipse at center left, ${accentRgba})
          `;

          resolve({ dominantColor, accentColor, gradient });
        } catch (err) {
          console.error('Error generating gradient:', err);
          resolve({
            dominantColor: '#000000',
            accentColor: '#000000',
            gradient: `
              linear-gradient(to bottom, #000, #000, #000, rgba(0,0,0,0.7))
            `,
          });
        }
      };

      img.onerror = () => {
        resolve({
          dominantColor: '#000000',
          accentColor: '#000000',
          gradient: `
            linear-gradient(to bottom, #000, #000, #000, rgba(0,0,0,0.7))
          `,
        });
      };
    });
  }
}