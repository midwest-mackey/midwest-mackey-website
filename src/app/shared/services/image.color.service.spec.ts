import { FastAverageColor } from 'fast-average-color';
import { Vibrant } from 'node-vibrant/browser';
import { ImageColorService } from './image.color.service';

describe('ImageColorService', () => {
  let image: HTMLImageElement;

  beforeEach(() => {
    image = document.createElement('img');
    jest.spyOn(window, 'Image').mockImplementation(() => image);
    jest.spyOn(FastAverageColor.prototype, 'getColorAsync').mockResolvedValue({
      hex: '#123456',
    } as Awaited<ReturnType<FastAverageColor['getColorAsync']>>);
  });

  afterEach(() => jest.restoreAllMocks());

  function mockPalette(palette: object) {
    jest.spyOn(Vibrant, 'from').mockReturnValue({
      getPalette: jest.fn().mockResolvedValue(palette),
    } as unknown as ReturnType<typeof Vibrant.from>);
  }

  async function loadGradient() {
    const promise = new ImageColorService().getGradientFromImage('https://example.com/art.png');
    image.onload!(new Event('load'));
    return promise;
  }

  it('uses the Vibrant 4 hex property for the accent color', async () => {
    mockPalette({ Vibrant: { hex: '#abcdef' } });
    const result = await loadGradient();
    expect(result.dominantColor).toBe('#123456');
    expect(result.accentColor).toBe('#abcdef');
    expect(result.gradient).toContain('rgba(18,52,86,1)');
    expect(result.gradient).toContain('rgba(171,205,239,1)');
  });

  it('falls back to another palette swatch when Vibrant is missing', async () => {
    mockPalette({ Vibrant: null, LightVibrant: { hex: '#abcdef' } });
    expect((await loadGradient()).accentColor).toBe('#abcdef');
  });

  it('uses the dominant color when the palette has no accent swatches', async () => {
    mockPalette({});
    expect((await loadGradient()).accentColor).toBe('#123456');
  });

  it('retains the black fallback when an image cannot load', async () => {
    const promise = new ImageColorService().getGradientFromImage('https://example.com/missing.png');
    image.onerror!(new Event('error'));
    const result = await promise;
    expect(result.dominantColor).toBe('#000000');
    expect(result.accentColor).toBe('#000000');
  });
});
