/**
 * Type declarations for @goongmaps/goong-js
 * Since there's no official @types package, we declare the module types here
 */

declare module '@goongmaps/goong-js' {
  interface LngLat {
    lat: number
    lng: number
  }

  interface MapOptions {
    container: HTMLElement | string
    style: string
    center: [number, number]
    zoom: number
    minZoom?: number
    maxZoom?: number
    bearing?: number
    pitch?: number
    interactive?: boolean
  }

  interface MapStyle {
    layers: Array<{
      id: string
      type: string
      [key: string]: any
    }>
  }

  interface FlyToOptions {
    center: [number, number]
    zoom?: number
    duration?: number
    bearing?: number
    pitch?: number
  }

  class Map {
    constructor(options: MapOptions)
    getCenter(): LngLat
    getZoom(): number
    setCenter(center: [number, number]): this
    setZoom(zoom: number): this
    flyTo(options: FlyToOptions): this
    panTo(lngLat: [number, number]): this
    on(event: string, callback: (...args: any[]) => void): this
    off(event: string, callback: (...args: any[]) => void): this
    remove(): void
    getStyle(): MapStyle
    setLayoutProperty(layerId: string, name: string, value: any): this
    getBounds(): {
      getNorth(): number
      getSouth(): number
      getEast(): number
      getWest(): number
    }
  }

  interface MarkerOptions {
    element?: HTMLElement
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    offset?: [number, number]
    draggable?: boolean
    color?: string
  }

  class Marker {
    constructor(options?: MarkerOptions)
    setLngLat(lngLat: [number, number]): this
    addTo(map: Map): this
    remove(): this
    getLngLat(): LngLat
    getElement(): HTMLElement
    setDraggable(draggable: boolean): this
    isDraggable(): boolean
    on(event: string, callback: (...args: any[]) => void): this
  }

  interface PopupOptions {
    closeButton?: boolean
    closeOnClick?: boolean
    offset?: number | [number, number] | { [key: string]: [number, number] }
    maxWidth?: string
    className?: string
    anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }

  class Popup {
    constructor(options?: PopupOptions)
    setLngLat(lngLat: [number, number]): this
    setHTML(html: string): this
    setDOMContent(htmlNode: Node): this
    setText(text: string): this
    addTo(map: Map): this
    remove(): this
    isOpen(): boolean
    getElement(): HTMLElement
    on(event: string, callback: () => void): this
    off(event: string, callback: () => void): this
  }

  interface GoongJS {
    accessToken: string
    Map: typeof Map
    Marker: typeof Marker
    Popup: typeof Popup
    LngLat: typeof LngLat
  }

  const goongjs: GoongJS
  export default goongjs
  export { Map, Marker, Popup, LngLat, MapOptions, MarkerOptions, PopupOptions, FlyToOptions }
}
