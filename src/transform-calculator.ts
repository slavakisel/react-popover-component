import config, { Arrows } from './config';

class TransformCalculator {
  private arrowPosition: string;
  private container: HTMLDivElement;

  constructor(arrowPosition, container) {
    this.arrowPosition = arrowPosition;
    this.container = container;
  }

  // Can't use css calc() here because it does not work poperly inside translate() in IE
  translateX = () => {
    return `translateX(${this.targetTranslateX()}) translateX(${this.containerTranslateX()}px)`;
  }

  // Can't use css calc() here because it does not work poperly inside translate() in IE
  translateY = () => {
    return `translateY(${this.targetTranslateY()}) translateY(${this.containerTranslateY()}px)`;
  }

  containerTranslateX = () => {
    switch (this.arrowPosition) {
      case 'topCenter':
      case 'topRight':
      case 'topLeft':
      case 'bottomCenter':
      case 'bottomRight':
      case 'bottomLeft':
        return this.container.clientWidth / 2;
      case 'rightTop':
      case 'rightCenter':
      case 'rightBottom':
        return -8;
      default:
        return 0;
    }
  }

  containerTranslateY = () => {
    switch (this.arrowPosition) {
      case 'topCenter':
      case 'topLeft':
      case 'topRight':
        return this.container.clientHeight;
      case 'leftCenter':
      case 'rightCenter':
      case 'leftTop':
      case 'leftBottom':
      case 'rightTop':
      case 'rightBottom':
      default:
        return 0;
    }
  }

  targetTranslateX = () => {
    return config.left[this.arrowPosition];
  }

  targetTranslateY = () => {
    return config.top[this.arrowPosition];
  }
}

export default TransformCalculator;
