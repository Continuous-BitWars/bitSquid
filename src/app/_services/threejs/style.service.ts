import {EventEmitter, Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ColorMode} from '../../_models/threejs/style/colorMode';
import {ColorScheme, DarkColorScheme, LightColorScheme, PeachFuzz} from '../../_models/threejs/style/color-scheme';

@Injectable({
  providedIn: 'root'
})
export class ThreeJsStyleService {

  // current mode
  private style: ColorMode = ColorMode.DarkMode;

  // colors
  public colorScheme: ColorScheme = DarkColorScheme;

  // render resolution
  public renderScale: number = 8;

  // event emitter to update the renderer scale
  public renderScaleUpdate: EventEmitter<void> = new EventEmitter<void>()

  // constructor with the required services:
  // styleService access the browsers cookies
  constructor(private cookieService: CookieService) {
    // load the saved style
    this.loadStyleFromCookies();

    // apply the color scheme
    this.loadColorScheme();
  }

  // set a new style
  public setStyle(style: ColorMode): void {
    // check if the style was already set
    if (style === this.style) return;

    // set the new style
    this.style = style;

    // apply the new color scheme
    this.loadColorScheme();

    // store the new style to the cookies
    this.storeStyleToCookies();
  }

  // set the render scale
  public setRenderScale(scale: number): void {
    // update the value
    this.renderScale = scale;
    // notify the renderers about the change in resolution
    this.renderScaleUpdate.emit();
    // store the new style
    this.storeStyleToCookies();
  }

  // get the current style
  public getStyle(): ColorMode {
    // return the current style
    return this.style;
  }

  // load the color scheme
  private loadColorScheme(): void {
    // set the color scheme based on the style
    switch (this.style) {
      case ColorMode.DarkMode:
        this.colorScheme = DarkColorScheme;
        break;
      case ColorMode.LightMode:
        this.colorScheme = LightColorScheme;
        break;
      case ColorMode.PeachFuzz:
        this.colorScheme = PeachFuzz;
        break;
      default:
        break;
    }
  }

  // load the style from the cookies
  private loadStyleFromCookies(): void {
    // load scale from cookies
    this.renderScale = parseInt(this.cookieService.get('scale')) || 720;
    // load style from cookies
    let styleStr: string = this.cookieService.get('style');
    // try to load the style from cookies
    if (Object.values(ColorMode).includes(styleStr as ColorMode)) {
      // set the new style
      this.style = styleStr as ColorMode;
      // return
      return;
    }
    // else reset the style
    this.resetStyle();
  }

  // store the current style to cookies
  private storeStyleToCookies(): void {
    this.cookieService.set('style', this.style as string);
    this.cookieService.set('scale', this.renderScale.toString());
  }

  // reset the current style
  private resetStyle(): void {
    // the default is per definition dark mode
    this.style = ColorMode.DarkMode;
    // load new color scheme
    this.loadColorScheme();
    // save the new style
    this.storeStyleToCookies();
  }
}
